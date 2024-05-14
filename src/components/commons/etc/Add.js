import React, { useState } from "react";
import axios from "axios";
import styles from "../../../static/styles/css/Add.module.css";

function Add({ onSubmit, onCancel, isAnswering, questionId, itemId, userId }) {
  // userId 매개변수 추가
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleCompleteClick = () => {
    if (!input.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    let apiUrl;
    let data;
    if (isAnswering) {
      // 답변 등록의 경우에는 아래와 같이 itemId와 questionId를 포함한 URL을 사용.
      apiUrl = `${process.env.REACT_APP_API_URL}/v1/auth/auction/${itemId}/qna/${questionId}/`;
      data = { comment: input, questionId: questionId }; // 'answerContents' 대신 'comment'를 사용
    } else {
      // 질문 등록의 경우에는 기존의 URL을 사용.
      apiUrl = `${process.env.REACT_APP_API_URL}/v1/auth/auction/${itemId}/qna/`;
      data = { questionContents: input, questionUserId: userId };
    }

    axios
      .post(apiUrl, data)
      .then((response) => {
        console.log("데이터 전송 성공:", response.data);
        onSubmit(input);
        setInput("");
      })
      .catch((error) => {
        console.error("데이터 전송 실패:", error);
      });
  };

  const handleCancelClick = () => {
    onCancel();
    setInput("");
  };

  return (
    <div className={styles.inputGroup}>
      <h4 className={styles.title}>{isAnswering ? "A" : "Q"}</h4>
      <input
        type="text"
        className={styles.input}
        value={input}
        onChange={handleInputChange}
      />
      <div className={styles.buttonsContainer}>
        <button className={styles.completeButton} onClick={handleCompleteClick}>
          완료
        </button>
        <button className={styles.cancelButton} onClick={handleCancelClick}>
          취소
        </button>
      </div>
    </div>
  );
}

export default Add;
