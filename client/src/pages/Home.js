import React from "react";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Nav from "../components/Nav"
import Section1 from "../components/Section1";
import Section2 from "../components/Section1";

// =================Images=================
//import mtg from
//import poke from
//import yugi from
// ========================================


function Home() {
    return (
    <div>
            <Nav />
            <Hero />
            <Section1 image="{}" alt="{}" decription="{}" />
            <Section2 image="{}" alt="{}" decription="{}" />
            <Section1 image="{}" alt="{}" decription="{}" />
            <Footer />
    </div>
    );
}

export default Home;