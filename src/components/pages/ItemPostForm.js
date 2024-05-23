import axios from 'axios';
import React, { useState } from 'react';
import { Container, Row, Col, Form, InputGroup, Button, ToggleButton, Alert } from 'react-bootstrap/';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../../static/styles/css/itemPostForm.module.css';
import ImgInputForm from '../commons/forms/ImgInputForm';
import FinishDateInputForm from '../commons/forms/FinishDateInputForm';
import { client } from '../util/client';
import { useNavigate} from 'react-router-dom';

function ItemPostForm() {
  const itemFormApi = `${process.env.REACT_APP_API_URL}/v1/auth/auction/form/`;

  const categories = [
    '전자기기', '여성의류', '가구인테리어', '티켓_교환권',
    '남성의류', '액세서리', '생활가전', '생활주방',
    '가공식품', '식물', '반려동물용품', '뷰티_미용',
    '도서_음반', '유아용품', '스포츠_레저', '게임_취미',
    '기타'
  ];

  const [itemImgs, setItemImgs] = useState([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('전자기기');
  const [startPrice, setStartPrice] = useState('');
  const [buyNowPrice, setBuyNowPrice] = useState('');
  const [contents, setContents] = useState('');
  const [finishDate, setFinishDate] = useState('');
  const [finishHour, setFinishHour] = useState('');
  const [direct, setDirectChecked] = useState(false);
  const [parcel, setParcelChecked] = useState(false);
  const [error, setError] = useState('');


  const navigate = useNavigate();
  
  const handleImageChange = (imageFiles) => {
    setItemImgs(imageFiles);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let trading_method = "-1";
    if (direct && parcel) {
      trading_method = "3";
    } else if (direct) {
      trading_method = "1";
    } else if (parcel) {
      trading_method = "2";
    }

    const error = validateInputs(trading_method);
    if (error) {
      setError(error);
      return;
    }

    try {
      const formData = buildFormData(trading_method);
      toast.info("저장하는 중이에요.😊");
      const response = await client.post(itemFormApi, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("저장이 완료됐습니다.😊", {
        autoClose: 2000, 
        onClose: () => {
          console.log(response.data);
          navigate('/auction');
        }
      });
    } catch (error) {
      toast.error("물품 등록에 실패했습니다.");
      console.error("물품 등록에 실패했습니다.", error);
    }
  };

  const validateInputs = (trading_method) => {
    if (!title) return "상품명을 입력하세요.";
    if (itemImgs.length === 0) return "하나 이상의 이미지를 업로드해야 합니다.";
    if (!contents) return "상품 설명을 작성해야 합니다.";
    if (!finishDate || !finishHour) return "경매 마감 시간을 정확히 입력해야 합니다.";
    if (trading_method === "-1") return "거래 방법을 하나 이상 선택해야 합니다.";
    if (!startPrice) return "입찰 시작가를 입력해야 합니다.";
    if (buyNowPrice > 0 && buyNowPrice <= startPrice) {
      return "즉시 입찰가는 시작 입찰가보다 높아야 합니다.";
    }
    if (!buyNowPrice) return "즉시 입찰가를 입력해야 합니다.";
    return "";
  };

  const buildFormData = (trading_method) => {
    const formData = new FormData();
    itemImgs.forEach((image, index) => formData.append('images', image));
    formData.append('title', title);
    formData.append('category', category);
    formData.append('trading_method', trading_method);
    formData.append('start_price', startPrice);
    if (buyNowPrice > 0) {
      formData.append('buy_now_price', buyNowPrice);
    }
    formData.append('contents', contents);
    formData.append('finish_time', `${finishDate}T${finishHour.padStart(2, '0')}:00`);
    return formData;
  };

  return (
    <Container fluid="md px-4" id={styles['input-page-body']}>
      <ToastContainer />
      <h2 className={`mt-3 mb-5 ${styles['form-title']}`}>상품 등록</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <ImgInputForm onImageChange={handleImageChange} />
        </Row>
        <br />
        <Form.Group as={Row} className="mb-4 px-2" controlId="item-title">
          <Form.Control
            type="text"
            placeholder="상품명을 입력하세요"
            name="item-title"
            maxLength="40"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className={styles['text-count']}>{title.length}/40</div>
        </Form.Group>
        <hr />
        <Form.Group as={Row} className="mb-4" controlId="item-category">
          <Form.Label column xs={5} sm={2}>카테고리</Form.Label>
          <Col xs={8} sm={4}>
            <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((item, index) => (
                <option key={index} value={item}>{item}</option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>
        <hr />
        <Form.Group as={Row} className="mb-4" controlId="first-price">
          <Form.Label column xs={3} sm={2}>입찰 시작가</Form.Label>
          <Col xs={5} sm={4}>
            <InputGroup className="mb-3">
              <InputGroup.Text>₩</InputGroup.Text>
              <Form.Control
                type="number"
                name="first-price"
                value={startPrice}
                min="0"
                onChange={(e) => setStartPrice(parseInt(e.target.value))}
              />
            </InputGroup>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-4" controlId="buynow-price">
          <Form.Label column xs={3} sm={2}>즉시 입찰가</Form.Label>
          <Col xs={5} sm={4}>
            <InputGroup className="mb-3">
              <InputGroup.Text>₩</InputGroup.Text>
              <Form.Control
                type="number"
                name="buynow-price"
                value={buyNowPrice}
                min="0"
                onChange={(e) => setBuyNowPrice(parseInt(e.target.value))}
              />
            </InputGroup>
          </Col>
        </Form.Group>
        <hr />
        <FinishDateInputForm
          finishDate={finishDate}
          setFinishDate={setFinishDate}
          finishHour={finishHour}
          setFinishHour={setFinishHour}
        />
        <br />
        <Form.Group as={Row} className="mb-4">
          <Form.Label column sm={2}>거래 방법</Form.Label>
          <Col sm={5} className={styles['btn-inline-group']}>
            <ToggleButton
              type="checkbox"
              id="direct-check"
              className={direct ? styles['btn-method-active'] : styles['btn-method-inactive']}
              value="1"
              checked={direct}
              onChange={(e) => setDirectChecked(e.currentTarget.checked)}
            >
              직거래
            </ToggleButton>
            <div className="vr" />
            <ToggleButton
              type="checkbox"
              id="parcel-check"
              className={parcel ? styles['btn-method-active'] : styles['btn-method-inactive']}
              value="2"
              checked={parcel}
              onChange={(e) => setParcelChecked(e.currentTarget.checked)}
            >
              택배
            </ToggleButton>
          </Col>
        </Form.Group>
        <hr />
        <Form.Group as={Row} className="mb-4" controlId="item_detail">
          <Form.Label column sm={2}>상세설명</Form.Label>
          <Col>
            <Form.Control
              as="textarea"
              rows="8"
              className={styles['textarea-no-resize']}
              name="item_detail"
              value={contents}
              onChange={(e) => setContents(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-4">
          <Col className={`me-3 ${styles['btn-inline-group']} ${styles['justif-content-end']}`}>
            <Button
              variant="success"
              className={styles['cancel-button']}
              onClick={() => window.history.back()}
            >
              취소하기
            </Button>
            <Button
              variant="success"
              className={styles['submit-button']}
              type="submit"
            >
              등록하기
            </Button>
          </Col>
        </Form.Group>
      </Form>
      {error && <Alert variant="danger">{error}</Alert>}
    </Container>
  );
}

export default ItemPostForm;
