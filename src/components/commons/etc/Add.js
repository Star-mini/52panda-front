import React, { useState } from 'react';
import axios from 'axios'; // Axios 라이브러리를 임포트합니다.
import styles from '../../../static/styles/css/Add.module.css'; // CSS 모듈을 임포트합니다.

function Add({ onSubmit, onCancel }) {
    const [input, setInput] = useState("");

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleCompleteClick = () => {
        // 환경 변수에서 API URL을 가져옵니다.
        const apiUrl = `${process.env.REACT_APP_API_URL}/v1/auth/auction/3/qna/`;
        
        // Axios를 사용하여 POST 요청을 보냅니다.
        axios.post(apiUrl, {
            questionUserId: 1, // 여기에 실제 사용자 ID를 사용.
            questionContents: input // 여기에 사용자가 입력한 질문 내용을 사용.
        })
        .then(response => {
            console.log("데이터 전송 성공:", response.data);
            onSubmit(input);
            setInput(""); // 입력 필드 초기화
        })
        .catch(error => {
            console.error("데이터 전송 실패:", error);
        });
    };

    const handleCancelClick = () => {
        onCancel();
        setInput(""); // 입력 필드 초기화
    };

    return (
      <div className={styles.inputGroup}>
        <h4 className={styles.title}>Q</h4>
        <input type="text" className={styles.input} value={input} onChange={handleInputChange} />
        <div className={styles.buttonsContainer}>
          <button className={styles.completeButton} onClick={handleCompleteClick}>완료</button>
          <button className={styles.cancelButton} onClick={handleCancelClick}>취소</button>
        </div>
      </div>
    );
}

export default Add;
