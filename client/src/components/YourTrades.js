import React from "react";

function YourTrades(props) {
    <div>
<h2>Your Trades</h2> 
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
</ul>
    </div>
}

export default YourTrades;