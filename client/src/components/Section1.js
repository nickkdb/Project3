import React from "react";
import "../styles/style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

function Section1(props) {
  const tradingCard = props;

  return (
    <div>
      <div className="container">
        <div className="row tradingCard-margin">
          <div className="col-md-2">
            <img src={tradingCard.image} className="img-fluid tradingCard shadow" alt={tradingCard.alt} />
          </div>
          <div className="col-md-10">
            <h2>{tradingCard.series}</h2>
            <p>{tradingCard.description}</p>
            <p><Link to={tradingCard.link}>Read more on Wikipedia</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section1;