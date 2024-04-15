import React, { useState } from "react";
import { Container, Row, Col, Form, Button, ToggleButton } from 'react-bootstrap/';
import styles from "../../static/styles/css/itemPostForm.module.css";
import Navbar from "../commons/navbar/Navbar";
import ImgInputForm from "../commons/forms/ImgInputForm";

function ItemPostForm() {
    const categories = [
        { key: 1, value: "1번 옵션" },
        { key: 2, value: "2번 옵션" },
        { key: 3, value: "3번 옵션" },
        { key: 4, value: "4번 옵션" },
        { key: 5, value: "5번 옵션" },
    ];

    const [direct, setDirectChecked] = useState(false);
    const [parcel, setParcelChecked] = useState(false);

    return (
        <div>
            <Navbar />

            <Container fluid="md" id={styles.inputPagesBody}>
                <Form>
                    <Row>
                        <ImgInputForm />
                    </Row>
                    <Form.Group as={Row} className="mb-3 px-2" controlid="item-name" required>
                        <Form.Control type="text" placeholder="상품명을 입력하세요" name="item-name" />
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlid="item-category" required>
                        <Form.Label column sm={2}>카테고리:</Form.Label>
                        <Col xs={8} sm={3}>
                            <Form.Select>
                                {categories.map((item, index) => (
                                    <option key={item.key} value={item.key}>{item.value}</option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlid="first-price" required>
                        <Form.Label column xs={3} sm={2}>입찰 시작가:</Form.Label>
                        <Col xs={5} sm={3}>
                            <Form.Control type="text" name="first-price" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlid="buynow-price">
                        <Form.Label column xs={3} sm={2}>즉시 입찰가:</Form.Label>
                        <Col xs={5} sm={3}>
                            <Form.Control type="text" name="buynow-price" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={2}>거래 방법:</Form.Label>
                        <Col sm={5} className={styles.btnInlineGroup}>
                            <ToggleButton
                                type="checkbox" variant="outline-success" id="direct-check"
                                value="1"
                                checked={direct}
                                onChange={(e) => setDirectChecked(e.currentTarget.checked)}
                            >
                                직거래
                            </ToggleButton>
                            <div className="vr" />
                            <ToggleButton
                                type="checkbox" variant="outline-success" id="parcel-check"
                                value="2"
                                checked={parcel}
                                onChange={(e) => setParcelChecked(e.currentTarget.checked)}
                            >
                                택배
                            </ToggleButton>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlid="item_detail">
                        <Form.Label column sm={2}>상세설명:</Form.Label>
                        <Col>
                            <Form.Control as="textarea" type="text" rows="8" name="item_detail" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Col className={`${styles.btnInlineGroup} ${styles.justifyContentEnd} me-3`}>
                            <Button variant="outline-success">취소하기</Button>{' '}
                            <Button variant="success">등록하기</Button>{' '}
                        </Col>
                    </Form.Group>
                </Form>
            </Container>
        </div >
    );
}

export default ItemPostForm;