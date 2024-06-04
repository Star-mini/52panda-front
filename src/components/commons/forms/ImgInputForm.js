import React, { useState } from 'react';
import { Form, Image } from 'react-bootstrap';
import { CameraFillIcon, XCicleFillIcon } from '../../../static/styles/javascript/icons';
import styles from '../../../static/styles/css/imgInputForm.module.css';

const ImgInputForm = ({ controlId, onImageChange }) => {
  const [itemImgs, setItemImgs] = useState([]);

  const onImgChange = (e) => {
    e.preventDefault();
    const files = e.target.files;

    if (files && files.length) {
      const total = itemImgs.length + files.length;
      if (total > 10) {
        alert('최대 10개의 이미지만 업로드할 수 있습니다.');
        e.target.value = '';
        return;
      }

      const newImgs = Array.from(files).map((file, idx) => {
        const img = window.URL.createObjectURL(file);
        return {
          id: itemImgs.length + idx + 1,
          img,
          file
        };
      });

      setItemImgs((prev) => {
        const updatedImgs = [...prev, ...newImgs];
        onImageChange(updatedImgs.map(item => item.file));  //상위 컴포넌트에 파일 객체 전달
        return updatedImgs;
      });

      e.target.value = '';
    }
  };

  const onImgDelete = (deleteImg) => {
    const imgToRevoke = itemImgs.find(item => item.id === deleteImg).img;
    window.URL.revokeObjectURL(imgToRevoke);

    setItemImgs((prev) => {
      const updatedImgs = prev.filter((item) => item.id !== deleteImg);
      onImageChange(updatedImgs.map(item => item.file));
      return updatedImgs;
    });
  };

  return (
    <Form.Group controlId="img-upload-form" className={`mb-3 ${styles['img-upload-form']}`}>
      <Form.Label id={styles['img-upload-btnbox']}>
        <CameraFillIcon width="25" height="25" fill="#666" />
        <span>{itemImgs.length} / 10</span>
      </Form.Label>
      <Form.Control
        type="file" multiple
        accept="image/png, image/jpeg, image/jpg"
        className={styles['hidden']}
        onChange={onImgChange} />
      {itemImgs.map((item) => (
        <div key={item.id} className={styles['upload-img-box']}>
          <Image src={item.img} className={styles['upload-img']} rounded />
          <div className={styles['delete-btn']} onClick={() => onImgDelete(item.id)}>
            <XCicleFillIcon width="20" height="20" />
          </div>
        </div>
      ))}
    </Form.Group>
  );
};

export default ImgInputForm;
