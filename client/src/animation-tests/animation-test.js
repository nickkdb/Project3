import React from "react";
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

gsap.to(".class", { duration: 2, x: 300 });


function Animation() {
    return (
        <div className="hero">
            <div className="container">
                <div className="row">
                    <div class="class">{pika}</div>
                </div>
            </div>
        </div>
    );
}


export default Animation;


// class Animate extends Component {
//     constructor(props){
//       super(props);
//       // reference to the DOM node
//       this.myElement = null;
//       // reference to the animation
//       this.myTween = null;
//     }

//     componentDidMount(){
//       // use the node ref to create the animation
//       this.myTween
//       .to(this.myElement, 0.5, {x: 100})
//       .to(this.myElement, 0.5, {y: 100, rotation: 180})
//       .play();
//     }

//     render(){
//       return <div ref={div => this.myElement = div} />;
//     }
//   }

// export default Animate;

