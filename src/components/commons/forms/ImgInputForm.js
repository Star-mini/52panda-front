import React, { useState } from 'react';
import { Form, Image, Button } from 'react-bootstrap';
import styles from '../../../static/styles/css/imgInputForm.module.css';

const ImgInputForm = () => {
  const [itemImgs, setItemImgs] = useState([]);

  const onImgChange = (e) => {
    e.preventDefault();
    const files = e.target.files;

    if (files && files.length) {
      const newImgs = Array.from(files).map((file, idx) => {
        const img = window.URL.createObjectURL(file);
        return {
          id: itemImgs.length + idx + 1,
          img
        };
      });

      setItemImgs((prev) => [...prev, ...newImgs]);
      e.target.value = null;
    }
  };

  const onImgDelete = (deleteImg) => {
    const imgToRevoke = itemImgs.find(item => item.id === deleteImg).img;
    window.URL.revokeObjectURL(imgToRevoke);

    setItemImgs((prev) => prev.filter((item) => item.id !== deleteImg));
  };

  return (
    <>
      <Form.Group controlId="img-upload-form" className="mb-3">
        <Form.Control
          type="file" accept="image/*" multiple
          className='mb-3'
          onChange={onImgChange} />
        <div>{itemImgs.length} / 10</div>
        {itemImgs.map((item) => (
          <div key={item.id} className={styles['uploaded-img-container']}>
            <Image src={item.img} className={styles['uploaded-img']} thumbnail />
            <Button className={styles['delete-img-btn']} onClick={() => onImgDelete(item.id)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
              </svg>
            </Button>
          </div>
        ))}
      </Form.Group>
    </>
  );
};

export default ImgInputForm;
