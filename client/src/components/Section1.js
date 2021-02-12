import React from "react";
import "../styles/style.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function Section1(props) {
  const tradingCard = props;

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <img src={tradingCard.image} className="img-fluid" alt={tradingCard.alt} />
          </div>
          <div className="col-md-6">
            <h3>{tradingCard.series}</h3>
            <p>{tradingCard.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section1;