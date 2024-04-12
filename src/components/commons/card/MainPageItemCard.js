import React from "react";

function MainPageItemCard(props) {
  return (
    <div className="card ms-5">
      <a href="">
        <img src={props.img} className="card-img-top" alt="..." />
      </a>

      <div className="card-body">
        <h5 className="card-title">{props.category}</h5>
        <p className="card-text">{props.name}</p>
      </div>
    </div>
  );
}

export default MainPageItemCard;
