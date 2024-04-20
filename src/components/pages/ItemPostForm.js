import React, { useState } from "react";
import { Container, Row, Col, Form, InputGroup, Button, ToggleButton } from "react-bootstrap/";
import styles from "../../static/styles/css/itemPostForm.module.css";
import ImgInputForm from "../commons/forms/ImgInputForm";

function ItemPostForm() {
    const categories = [
        { key: 1, value: "1번 옵션" },
        { key: 2, value: "2번 옵션" },
        { key: 3, value: "3번 옵션" },
        { key: 4, value: "4번 옵션" },
        { key: 5, value: "5번 옵션" },
    ];

    const [direct, setDirectChecked] = useState(false);
    const [parcel, setParcelChecked] = useState(false);

    return (
        <>
            <Container fluid="md px-4" id={styles['input-page-body']}>
                <Form>
                    <Row>
                        <ImgInputForm />
                    </Row>
                    <br />
                    <br />
                    <Form.Group as={Row} className="mb-4 px-2" controlid="item-name" required>
                        <Form.Control type="text" placeholder="상품명을 입력하세요" name="item-name" />
                    </Form.Group>
                    <hr />
                    <Form.Group as={Row} className="mb-4" controlid="item-category" required>
                        <Form.Label column xs={5} sm={2}><nobr>카테고리</nobr></Form.Label>
                        <Col xs={8} sm={4}>
                            <Form.Select>
                                {categories.map((item, index) => (
                                    <option key={item.key} value={item.key}>{item.value}</option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <hr />
                    <Form.Group as={Row} className="mb-4" controlid="first-price" required>
                        <Form.Label column xs={3} sm={2}><nobr>입찰 시작가</nobr></Form.Label>
                        <Col xs={5} sm={4}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>₩</InputGroup.Text>
                                <Form.Control type="number" name="first-price" />
                            </InputGroup>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-4" controlid="buynow-price">
                        <Form.Label column xs={3} sm={2}><nobr>즉시 입찰가</nobr></Form.Label>
                        <Col xs={5} sm={4}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>₩</InputGroup.Text>
                                <Form.Control type="number" name="buynow-price" />
                            </InputGroup>
                        </Col>
                    </Form.Group>
                    <hr />
                    <Form.Group as={Row} className="mb-4" controlid="auction-finish-time" required>
                        <Form.Label column xs={5} sm={2}><nobr>경매 완료 시간</nobr></Form.Label>
                        <Col xs={8} sm={4}>
                            <Form.Select>
                                {categories.map((item, index) => (
                                    <option key={item.key} value={item.key}>{item.value}</option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-4">
                        <Form.Label column sm={2}><nobr>거래 방법</nobr></Form.Label>
                        <Col sm={5} className={styles['btn-inline-group']}>
                        <ToggleButton
    type="checkbox"
    variant="outline-success"
    id="direct-check"
    value="1"
    checked={direct}
    onChange={(e) => setDirectChecked(e.currentTarget.checked)}
    className={direct ? styles.activeToggleButton : ''}
>
    직거래
</ToggleButton>
<div className="vr" />
<ToggleButton
    type="checkbox"
    variant="outline-success"
    id="parcel-check"
    value="2"
    checked={parcel}
    onChange={(e) => setParcelChecked(e.currentTarget.checked)}
    className={parcel ? styles.activeToggleButton : ''}
>
    택배
</ToggleButton>
                        </Col>
                    </Form.Group>
                    <hr />
                    <Form.Group as={Row} className="mb-4" controlid="item_detail">
                        <Form.Label column sm={2}><nobr>상세설명</nobr></Form.Label>
                        <Col>
                        <Form.Control as="textarea" className={styles['textarea-no-resize']} rows="8" name="item_detail" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-4">
                        <Col className={`me-3 ${styles['btn-inline-group']} ${styles['justif-content-end']}`}>
                            <Button variant="outline-success">취소하기</Button>{' '}
                            <Button variant="outline-success" className={styles['submit-button']}>등록하기</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </Container>
        </ >
    );
}

export default ItemPostForm;