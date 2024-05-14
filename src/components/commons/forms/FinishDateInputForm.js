import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap/';

const FinishDateInputForm = ({ finishDate, setFinishDate, finishHour, setFinishHour }) => {
  const [minDate, setMinDate] = useState('');

  useEffect(() => {
    const now = new Date();
    const localDate = new Date(now.getTime() - (now.getTimezoneOffset() * 60000));
    const isoDate = localDate.toISOString().split('T')[0];
    setMinDate(isoDate);
  }, []);

  const generateHourOptions = () => {
    let hours = [];
    for (let i = 0; i < 24; i++) {
      hours.push(<option key={i} value={i}>{`${i.toString().padStart(2, '0')}:00`}</option>);
    }
    return hours;
  };

  return (
    <Form.Group as={Row} className="mb-5" controlId="auction-finish-time">
      <Form.Label column xs={12} sm={2}><nobr>경매 완료 시간</nobr></Form.Label>
      <Col xs={5} sm={4} md={3}>
        <Form.Control
          type="date"
          value={finishDate}
          onChange={(e) => setFinishDate(e.target.value)}
          min={minDate}
          required
        />
      </Col>
      <Col xs={4} sm={3} md={2}>
        <Form.Select
          value={finishHour}
          onChange={(e) => setFinishHour(e.target.value)}
          required
        >
          {generateHourOptions()}
        </Form.Select>
      </Col>
    </Form.Group>
  );
};

export default FinishDateInputForm;
