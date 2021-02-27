import React, { useState } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import UserContext from "../utils/UserContext";
import "./style.css";
import { Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";

function YourTrades(props) {


    return (

        <div className="card">
            <div>
            <Badge 
                pill variant="success"
                style={{float: "right", cursor: "pointer"}}
                className="m-2"
                onClick={() => {
                //    console.log("ALERT")
                //    console.log(props.tradeObj)
                    props.setChart(props.tradeObj);
                  }}
            >
                Analyze It!
                <span className={"ml-2"}></span>
                <FontAwesomeIcon icon={faChartBar} />
            </Badge>
            </div>

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
                                        props.makeTrade(props.tradeObj)
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