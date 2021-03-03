import React from "react";
import "../styles/style.css";
import "../styles/animations.css";
import 'bootstrap/dist/css/bootstrap.min.css';



//==================Images====================

import pika from "../images/pv-2.png";
import yugi from "../images/yugi-main.png";
import mtg from "../images/planeswalker.png"

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
    gsap.from(".pika", { x: -1000 });
    gsap.to(".pika", { rotation: 27, duration: 2, x: 500 });
    gsap.from(".yugi", { x: -1000 });
    gsap.to(".yugi", { duration: 4, x: -100 });
    gsap.from(".mtg", { x: -1000 });
    gsap.to(".mtg", { duration: 3, x: 400 });



    return (
        <div className="hero">
            <div className="animation-box">
                    <div class="yugi"><img class="img-fluid" src={yugi} alt="" /></div>
                    <div class="pika"><img class="img-fluid" src={pika} alt="" /></div>
                    <div class="mtg"><img class="img-fluid" src={mtg} alt="" /></div>
            </div>
        </div>
    );
}


export default Animation;