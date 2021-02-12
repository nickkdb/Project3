import React from "react";
import "../styles/style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

function Section2(props) {
  const tradingCard = props;

  return (
    <div>
      <div className="container">
        <div className="row tradingCard-margin">
          <div className="col-md-6">
            <h3>{tradingCard.series}</h3>
            <p>{tradingCard.description}</p>
            <p><Link to={tradingCard.link}>Read more on Wikipedia</Link></p>
          </div>
          <div className="col-md-3">
            <img src={tradingCard.image} className="img-fluid" alt={tradingCard.alt} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section2;