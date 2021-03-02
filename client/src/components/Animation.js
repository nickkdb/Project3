import React from "react";
import "../styles/style.css";
import "../styles/animations.css";
import 'bootstrap/dist/css/bootstrap.min.css';



//==================Images====================

import pika from "../images/pv-2.png";
import yugi from "../images/yugi-main.png";

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


function Animation() {
    gsap.to(".pika", { rotation: 27, duration: 2, x: "200%" });
    gsap.to(".yugi", { duration: 4, x: 10 });
    gsap.to(".mtg", { rotation: 27, duration: 2, x: 300 });

    return (
        <div className="hero">
            <div className="row animation-box">
            <div class="yugi"><img class="yugi-img img-fluid" src={yugi} alt="" /></div>
                <div class="pika"><img class="pika-img img-fluid" src={pika} alt="" /></div>
                {/* <div class="mtg"><img src={mtg} alt=""/></div> */}
            </div>
        </div>
    );
}


export default Animation;