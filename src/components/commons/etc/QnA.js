import React, { useState, useEffect } from "react";
import styles from "../../../static/styles/css/QnA.module.css";
import writeIcon from "../../../static/styles/images/writhing.png";
import Add from "./Add";
import axios from "axios";

function QnA({ productData }) {
  const [addComponents, setAddComponents] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [userId, setUserId] = useState(null); // 초기값을 null로 설정

  useEffect(() => {
    if (productData && productData.questions) {
      setQuestions(productData.questions);
    }
  }, [productData]);

  useEffect(() => {
    // localStorage에서 userId를 가져와서 설정
    const id = localStorage.getItem("id");
    setUserId(id);
  }, []);

  const handleAddClick = (questionId) => {
    if (!isAdding) {
      const newId = Date.now();
      const newComponent = {
        id: newId,
        component: (
          <Add
            key={newId}
            questionId={questionId}
            itemId={productData.itemId} // productData에서 itemId를 전달
            userId={userId} // userId를 Add 컴포넌트에 전달
            onSubmit={(text) => handleQuestionSubmit(text, newId, questionId)}
            onCancel={() => handleCancel(newId)}
            isAnswering={questionId !== null}
          />
        ),
      };
      setAddComponents((prevComponents) => [...prevComponents, newComponent]);
      setIsAdding(true);
    }
  };

  const deleteQuestion = async (questionId) => {
    handleDelete(questionId); // API 요청 전에 UI를 먼저 업데이트
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/v1/auth/auction/${productData.itemId}/qna/${questionId}/`
      );
      if (response.status !== 200) {
        // 삭제 실패 시, UI에서 삭제된 항목을 복구하거나 에러 메시지를 표시
        console.error("서버에서 삭제 실패, UI 복구 필요");
        // 복구 로직 필요 (선택적)
      }
    } catch (error) {
      console.error("질문 삭제 요청 실패:", error);
      // 에러 처리 로직 필요 (선택적)
    }
  };

  const handleQuestionSubmit = (text, id, questionId) => {
    if (questionId !== null) {
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q.questionId === questionId
            ? {
                ...q,
                comments: [
                  ...q.comments,
                  {
                    commentId: q.comments.length + 1,
                    comment: text,
                    commentTime: new Date().toISOString(),
                  },
                ],
              }
            : q
        )
      );
    } else {
      const newQuestion = {
        questionId: questions.length + 1,
        questionContents: text,
        questionTime: new Date().toISOString(),
        comments: [],
      };
      setQuestions([...questions, newQuestion]);
    }
    handleCancel(id);
  };

  const handleCancel = (id) => {
    setAddComponents((prevComponents) =>
      prevComponents.filter((component) => component.id !== id)
    );
    setIsAdding(false);
  };

  const handleDelete = (questionId) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((q) => q.questionId !== questionId)
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Q&A</h1>
      {productData.sellerId !== userId && (
        <div className={styles.buttonContainer}>
          <button
            className={styles.writeButton}
            onClick={() => handleAddClick(null)}
          >
            <img src={writeIcon} alt="글쓰기" className={styles.icon} />
            문의글 작성
          </button>
        </div>
      )}
      <div className={styles.divider}></div>

      {/* 질문과 답변 섹션 */}
      {questions.map((q, index) => (
        <div key={q.questionId}>
          <div className={styles.question}>
            <h4 className={styles.questionText}>Q. {q.questionContents}</h4>
            <div className={styles.statusContainer}>
              <div
                className={
                  q.comments.length > 0 ? styles.status : styles.noStatus
                }
              >
                {q.comments.length > 0 ? "답변완료" : "답변 미완료"}
              </div>
            </div>
          </div>
          <div className={styles.dateAndDelete}>
            <p className={styles.date}>
              문의일: {new Date(q.questionTime).toLocaleString()}
            </p>
            {productData.sellerId === userId && (
              <button
                className={styles.deleteButton}
                onClick={() => deleteQuestion(q.questionId)}
              >
                삭제
              </button>
            )}
          </div>
          {q.comments.length === 0 && productData.sellerId === userId && (
            <div className={styles.answerButtonContainer}>
              <button
                className={styles.writeButton}
                onClick={() => handleAddClick(q.questionId)}
              >
                <img src={writeIcon} alt="답변 작성" className={styles.icon} />
                답변 작성
              </button>
            </div>
          )}
          {q.comments.map((comment) => (
            <div key={comment.commentId} className={styles.answer}>
              <h4 className={styles.answerText}>A. {comment.comment}</h4>
              <p className={styles.date}>
                답변일: {new Date(comment.commentTime).toLocaleString()}
              </p>
            </div>
          ))}
          {/* 질문이 답변 중이 아닐 때만 구분자를 추가합니다 */}
          <div className={styles.divider}></div>
        </div>
      ))}
      {addComponents.map((component) => component.component)}
    </div>
  );
}

export default QnA;
