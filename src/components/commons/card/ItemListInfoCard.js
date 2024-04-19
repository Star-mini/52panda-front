import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../../static/styles/css/item-list-info-card.css'

const ItemListInfoCard = ({ image, title, category,tradingMethod, startPrice,currentPrice,itemId }) => {

  let tradingMethodBadges;

  switch (tradingMethod) {
    case 0:
      tradingMethodBadges = <Badge bg="secondary" className='badge-space'>택배</Badge>;
      break;
    case 1:
      tradingMethodBadges = <Badge bg="secondary" className='badge-space' >직거래</Badge>;
      break;
    case 2:
      tradingMethodBadges = (
        <>
          <Badge bg="secondary" className='badge-space'>택배</Badge>
          <Badge bg="secondary" className='badge-space'>직거래</Badge>
        </>
      );
      break;
    default:
      tradingMethodBadges = <Badge bg="danger">알 수 없음</Badge>;
  }

    return (
      <Link to="/detail" className="card-link">
        <Card className="container d-flex justify-content-center p-0">
          <div className="row g-0 ">
            <div className="col-md-4">
              <Card.Img src={image} className="card-image" />
            </div>
            <div className="col-md-8">
              <Card.Body>
                <Card.Title className="card-text">{title}</Card.Title>
                <Card.Subtitle className="card-text">
                  <Badge bg="success" className='badge-space'>{category}</Badge>
                  {tradingMethodBadges}
                </Card.Subtitle>
                <Card.Body className="bg-light rounded card-body">
                  <Card.Text>
                    <small className="text-muted start-price-font">시작 금액 {startPrice}</small>
                  </Card.Text>
                  <Card.Text className="text-center">
                  <span className="current-price-font">현재 입찰가 {currentPrice}</span>
                  </Card.Text>
                </Card.Body>
              </Card.Body>
            </div>
          </div>
        </Card>
      </Link>
    );
  };

export default ItemListInfoCard;