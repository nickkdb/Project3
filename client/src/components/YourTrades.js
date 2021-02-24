import React, { useState } from "react";
import UserContext from "../utils/UserContext";

function YourTrades(props) {


    return (

        <div class="card">
            {/* <h2>Your Trades</h2>  */}
            <ul>

                <li>
                    Proposed by: {props.proposedBy}
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
                    <div>

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
                                    onClick={() => { props.declineTrade(props.id) }}>
                                    Decline Trade
                                </button>
                            </div> : ""
                        }

                    </div>
                    : ""}
            </ul>
            <div
            >
                {props.status === "accepted" ? <div style={{ color: "green" }}>Accepted</div> : ""}

            </div>
        </div>
    )
}

export default YourTrades;