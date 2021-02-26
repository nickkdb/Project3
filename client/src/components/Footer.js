import React from "react";

//==================Images====================
import logo from "../images/logo74KBblack.png"
//============================================



function Footer() {
    return (
        <footer className="bg-light text-center text-lg-start">

            <div className="container p-4">

                <div className="row">

                    <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                        <img src={logo} alt="" className="logo-small" />
                        <p>
                            Your place to meet and trade with other nerds.
                            Currently supporting trades for Pokémon Trading Card Game, Magic: The Gathering, and Yu-Gi-Oh! Trading Card Game. More card series coming soon!
                        </p>
                    </div>



                    <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                        <h5 className="text-uppercase">Trading Cards</h5>

                        <ul className="list-unstyled mb-0">
                            <li>
                                <a href="#!" className="text-dark">Pokémon</a>
                            </li>
                            <li>
                                <a href="#!" className="text-dark">Magic the Gathering</a>
                            </li>
                            <li>
                                <a href="#!" className="text-dark">Yu-Gi-Oh!</a>
                            </li>
                        </ul>
                    </div>



                    <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                        <h5 className="text-uppercase mb-0">Links</h5>

                        <ul className="list-unstyled">
                            <li>
                                <a href="https://www.yugioh-card.com/en/" className="text-dark">YuGiOPh</a>
                            </li>
                            <li>
                                <a href="https://www.pokemon.com/" className="text-dark">Pokemon 2</a>
                            </li>
                            <li>
                                <a href="https://magic.wizards.com/" className="text-dark">Magic The Gathering</a>
                            </li>
                            
                        </ul>
                    </div>

                </div>

            </div>


            <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
                © 2021 Copyright: Group 5
            </div>

        </footer>
    )
}

export default Footer;