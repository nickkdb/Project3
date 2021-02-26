import React, { useState } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import UserContext from "../utils/UserContext";
import "./style.css";

function YourTrades(props) {


    return (

        <div class="card">

            <ul>

                <li>
                    Proposed by: {props.proposedBy}
                    {props.status === "accepted" ? <span className="span" style={{ background: "green", color: "white" }}>Accepted</span> : ""}
                    {props.status === "declined" ? <span className="span" style={{ background: "red", color: "white" }}> Declined </span> : ""}
                </li>
                <li>
                    Proposed to: {props.proposedTo}
                </li>
                <li>
                    {props.proposedBy}'s products: {props.proposedByProducts}
                </li>
                <li>
                    {props.proposedTo}'s products: {props.proposedToProducts}
                </li>
                {props.status === "pending" ?
                    <>

                        {props.currentUser === props.proposedTo ?
                            <div>
                                <button
                                    className="btn btn-primary ml-1"
                                    onClick={() => {
                                        props.acceptTrade(props.id)

                                    }}>
                                    Accept Trade</button>
                                <button
                                    className="btn btn-primary ml-1"
                                    onClick={() => {
                                        props.declineTrade(props.id)
                                    }}>
                                    Decline Trade
                                </button>
                            </div> : <div style={{ color: "blue" }}> Sent</div>
                        }

                    </>
                    : <button
                        className="btn btn-danger deletetrade"
                        onClick={() => { props.deleteTrade(props.id) }}>
                        Delete
                </button>

                }


            </ul>
            <
                >

            </>
        </div>
    )
}

export default YourTrades;