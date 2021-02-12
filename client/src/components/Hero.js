import React from "react";
import "../styles/style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import SignIn from "../pages/SignIn";

//==================Images====================
import logo from "../images/logo74KB.png"
//============================================

function Hero() {
  return (
    <div>
      <div className="hero">
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <img src={logo} alt="ner herred logo" className="logo"/>
              <h1>Trading Community</h1>
              <br /><br /><br /><br />
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste atque ea quis molestias. Fugiat pariatur maxime quis culpa corporis vitae repudiandae aliquam voluptatem veniam, est atque cumque eum delectus sint!</p>
            </div>
            <div className="col-md-3">
              <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                  <SignIn />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;