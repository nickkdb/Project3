import React, { useContext } from 'react';
import {HorizontalBar} from 'react-chartjs-2';
// import '../../css/defaults.css';
import UserContext from "../utils/UserContext";

function Bar (props) {
    const user = useContext(UserContext)
    const cardNames = user.mongo.products.map(item => item.name)
    const cardPrices = user.mongo.products.map(item => item.price)

    const state = {
        labels: cardNames,
        datasets: [
    
            // have to map over all the cards a user has
            {
                label: "Your cards value",
                backgroundColor: 'rgba(94, 118, 253, 0.2)',
                borderColor: 'rgba(25, 59, 247, 0.2)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(0, 26, 172, 0.2)',
                hoverBorderColor: 'rgb(54, 40, 255)',
                data: cardPrices
            },
        ]
    }
    const options = { 
        scales: { 
            xAxes: [{
                 ticks: {
                    beginAtZero: true, 
                    // max: 10
                    } 
                }] 
            }     
        };

    return (
        <>
        <h2 style={{textAlign: "center"}}>Card Comparison</h2>
        <HorizontalBar options={options} data={state} />
        </>
    )

}

export default Bar
