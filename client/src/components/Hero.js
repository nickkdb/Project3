import React from "react";
import "../styles/style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import SignIn from "../components/SignIn";

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

              <img src={logo} alt="nerd herred logo" className="logo"/>
              <h1>Trading Community</h1>
              <br /><br /><br /><br />
              <h3>Your place to meet and trade with other nerds.</h3>
              <h5>Currently supporting trades for Pokémon Trading Card Game, Magic: The Gathering, and Yu-Gi-Oh! Trading Card Game. More card series coming soon!</h5>
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