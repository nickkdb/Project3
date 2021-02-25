import React, { useEffect } from "react";
import "../styles/style.css";
import 'bootstrap/dist/css/bootstrap.min.css';


//==================Images====================

import pika from "../images/pv-2.png";
//============================================

//==================GSAP Imports====================
import { gsap } from "gsap";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import { Draggable } from "gsap/Draggable";
import { EaselPlugin } from "gsap/EaselPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { PixiPlugin } from "gsap/PixiPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(CSSRulePlugin, Draggable, EaselPlugin, MotionPathPlugin, PixiPlugin, TextPlugin, ScrollToPlugin, ScrollTrigger);
//============================================

gsap.to({pika}, {duration: 2, x: 300});


function Animation() {
    
    useEffect(() => {
        gsap.to({pika}, {duration: 2, x: 300});
    })


  return (
    <div>
      <div className="hero">
        <div className="container">
          <div className="row">


            {/* {<div className="col-md-9">

              <img src={logo} alt="nerd herred logo" className="logo"/>
              <h1>Trading Community</h1>
              <br /><br /><br /><br />
              <h3>Your place to meet and trade with other nerds.</h3>
              <h5>Currently supporting trades for Pokémon Trading Card Game, Magic: The Gathering, and Yu-Gi-Oh! Trading Card Game. More card series coming soon!</h5>
            </div>
            <div className="col-md-3">
              <div className="card sign-inCard" style={{ width: "18rem" }}>
                <div className="card-body">
                  <SignIn />
                </div>
              </div>
            </div>} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Animation;

