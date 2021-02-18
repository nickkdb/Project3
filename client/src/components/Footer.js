import React from "react";

//==================Images====================
import logo from "../images/logo74KBblack.png"
//============================================



function Footer() {
    return (
        <footer class="bg-light text-center text-lg-start">

            <div class="container p-4">

                <div class="row">

                    <div class="col-lg-6 col-md-12 mb-4 mb-md-0">
                        <img src={logo} className="logo-small" />
                        <p>
                            Your place to meet and trade with other nerds.
                            Currently supporting trades for Pokémon Trading Card Game, Magic: The Gathering, and Yu-Gi-Oh! Trading Card Game. More card series coming soon!
                        </p>
                    </div>



                    <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                        <h5 class="text-uppercase">Trading Cards</h5>

                        <ul class="list-unstyled mb-0">
                            <li>
                                <a href="#!" class="text-dark">Pokémon</a>
                            </li>
                            <li>
                                <a href="#!" class="text-dark">Magic the Gathering</a>
                            </li>
                            <li>
                                <a href="#!" class="text-dark">Yu-Gi-Oh!</a>
                            </li>
                        </ul>
                    </div>



                    <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                        <h5 class="text-uppercase mb-0">Links</h5>

                        <ul class="list-unstyled">
                            <li>
                                <a href="#!" class="text-dark">Link 1</a>
                            </li>
                            <li>
                                <a href="#!" class="text-dark">Link 2</a>
                            </li>
                            <li>
                                <a href="#!" class="text-dark">Link 3</a>
                            </li>
                            <li>
                                <a href="#!" class="text-dark">Link 4</a>
                            </li>
                        </ul>
                    </div>

                </div>

            </div>


            <div class="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
                © 2021 Copyright:
    <a class="text-dark" href="">Group 5</a>
            </div>

        </footer>
    )
}

export default Footer;