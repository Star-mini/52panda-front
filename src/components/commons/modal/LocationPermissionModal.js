import React from 'react';
import { Modal, Button, ModalTitle } from 'react-bootstrap';
import styles from '../../../static/styles/css/locationPermissionModal.module.css';
import { ExclamationOctagon } from '../../../static/styles/javascript/icons';

const LocationPermissionModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header className={styles['location-modal-header']}>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column">
        <div className="mx-auto my-2">
          <ExclamationOctagon width="60" height="60" fill="#74885b" />
        </div>
        <div className="text-center my-3">
          이 페이지는 <strong>위치 권한이 필요</strong>합니다. <br /> 설정에서 위치 권한을 허용해주세요.
        </div>
        <div className="text-end">
          <Button
            variant="success"
            className={styles['location-modal-close-btn']}
            onClick={() => window.history.back()}>
            닫기
          </Button>
        </div>
      </Modal.Body>

    </Modal >
  );
};

export default LocationPermissionModal;
