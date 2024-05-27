import React, { useState } from 'react';
import { Form, Image } from 'react-bootstrap';
import { CameraFillIcon, XCicleFillIcon } from '../../../static/styles/javascript/icons';
import styles from '../../../static/styles/css/imgInputForm.module.css';

const ImgInputForm = ({ onImageChange }) => {
  const [itemImgs, setItemImgs] = useState([]);

  const createImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new window.Image(); // 'window.'을 추가하여 내장 객체를 명시적으로 참조합니다.
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(err);
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const getPaddedImage = (img) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const size = Math.max(img.width, img.height);

    canvas.width = size;
    canvas.height = size;

    // 흰색 배경으로 초기화
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);

    const x = (size - img.width) / 2;
    const y = (size - img.height) / 2;

    ctx.drawImage(img, x, y, img.width, img.height);

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        // 파일명에 고유 ID를 추가하여 중복을 방지합니다.
        const uniqueId = new Date().getTime(); // 현재 시간을 이용하여 고유 ID를 생성
        const originalFileName = img.src.split('/').pop();
        const newFileName = `${uniqueId}-${originalFileName}`;

        const paddedImg = new File([blob], newFileName, {
          type: 'image/jpeg',
          lastModified: Date.now(),
        });
        resolve(paddedImg);
      }, 'image/jpeg');
    });
  };

  const onImgChange = async (e) => {
    e.preventDefault();
    const files = e.target.files;

    if (files && files.length) {
      const total = itemImgs.length + files.length;
      if (total > 10) {
        alert('최대 10개의 이미지만 업로드할 수 있습니다.');
        e.target.value = '';
        return;
      }

      const newImgs = [];
      for (const file of files) {
        const img = await createImage(file);
        const paddedImg = await getPaddedImage(img);
        const imgSrc = window.URL.createObjectURL(paddedImg);
        newImgs.push({
          id: itemImgs.length + newImgs.length + 1,
          img: imgSrc,
          file: paddedImg,
        });
      }

      setItemImgs((prev) => {
        const updatedImgs = [...prev, ...newImgs];
        onImageChange(updatedImgs.map((item) => item.file)); // 상위 컴포넌트에 파일 객체 전달
        return updatedImgs;
      });

      e.target.value = '';
    }
  };

  const onImgDelete = (deleteImg) => {
    const imgToRevoke = itemImgs.find((item) => item.id === deleteImg).img;
    window.URL.revokeObjectURL(imgToRevoke);

    setItemImgs((prev) => {
      const updatedImgs = prev.filter((item) => item.id !== deleteImg);
      onImageChange(updatedImgs.map((item) => item.file));
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
        type="file"
        multiple
        accept="image/png, image/jpeg, image/jpg"
        className={styles['hidden']}
        onChange={onImgChange}
      />
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
