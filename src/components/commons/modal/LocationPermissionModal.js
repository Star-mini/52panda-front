import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const LocationPermissionModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>위치 권한 필요</Modal.Title>
      </Modal.Header>
      <Modal.Body>이 페이지는 위치 권한이 필요합니다. <br /> 설정에서 위치 권한을 허용해주세요.</Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={() => window.history.back()}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LocationPermissionModal;
