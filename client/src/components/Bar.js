import React, { useContext, useState, useEffect } from 'react';
import {HorizontalBar} from 'react-chartjs-2';
// import '../../css/defaults.css';
import UserContext from "../utils/UserContext";

function Bar (props) {
    const trades = props.trades
    const user = useContext(UserContext)
    const [selectedTrade, setSelectedTrade] = useState({})
    const [myPrices, setMyPrices] = useState(0)
    const [yourPrices, setYourPrices] = useState(0)
    if (selectedTrade){console.log(selectedTrade)}

    const cardNames = user.mongo.products.map(item => item.name)
    const cardPrices = user.mongo.products.map(item => item.price)

    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    if (yourPrices){console.log(yourPrices.reduce(reducer))}
    if (myPrices){console.log(myPrices.reduce(reducer))}
    
    useEffect(() => {
        setSelectedTrade(props.trades[0])
      }, []);

    // useEffect(() => {
    //     let tempM = selectedTrade && selectedTrade.proposedByProducts.map(item => item.price)
    //     setMyPrices(tempM)
    //     // setYourPrices(selectedTrade && selectedTrade.proposedToProducts.map(item => item.price))
    // }, [selectedTrade])

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
