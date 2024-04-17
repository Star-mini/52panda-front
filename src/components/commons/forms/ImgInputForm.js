import React, { useState } from 'react';
import { Image, Button } from 'react-bootstrap';
import styles from '../../../static/styles/css/imgInputForm.module.css';

const ImgInputForm = () => {
  const [itemImg, setItemImg] = useState([]);

  const onImgChange = (event) => {
    event.preventDefault();
    if (event.target.files) {
      const imgFile = event.target.files[0];
      const img = window.URL.createObjectURL(imgFile);

      setItemImg((prev) => {
        if (!prev[0]) return [{ id: 1, img }];
        const nextId = prev[prev.length - 1].id + 1;
        return [...prev, { id: nextId, img }];
      });
    }
  };

  const onImgDelete = (clickedId) => {
    setItemImg((prev) => prev.filter((item) => item.id !== clickedId));
  };

  return (
    <>
      <input type="file" accept="image/*" onChange={onImgChange} />
      {itemImg.map((item) => (
        <div key={item.id}>
          <Image src={item.img} className={styles.uploadedImg} thumbnail />
          <Button onClick={() => onImgDelete(item.id)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
            </svg>
          </Button>
        </div>
      ))}
    </>
  );
};

export default ImgInputForm;
