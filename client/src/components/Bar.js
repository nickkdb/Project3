import React, { useContext, useState, useEffect } from 'react';
import {HorizontalBar} from 'react-chartjs-2';
// import '../../css/defaults.css';
import UserContext from "../utils/UserContext";

function Bar (props) {
    const user = useContext(UserContext)
    const [selectedTrade, setSelectedTrade] = useState(props.trades[0])
    const [byPrices, setByPrices] = useState(0)
    const [toPrices, setToPrices] = useState(0)
    const [chartState, setChartState] = useState({})
    if (selectedTrade){console.log(selectedTrade)}

    const cardNames = user.mongo.products.map(item => item.name)
    const cardPrices = user.mongo.products.map(item => item.price)

    const reducer = (accumulator, currentValue) => accumulator + currentValue;    

    useEffect(() => {
        if (selectedTrade) {
            let tempBy = selectedTrade && selectedTrade.proposedByProducts.map(item => item.price).reduce(reducer)
            let tempTo = selectedTrade && selectedTrade.proposedToProducts.map(item => item.price).reduce(reducer)
            console.log(tempBy)
            setByPrices(tempBy)
            setToPrices(tempTo)
            setTheChart()
        }
    }, [selectedTrade])

    const setTheChart = () => {
        let tempChart = {
            labels: [selectedTrade.proposedBy, selectedTrade.proposedTo],
            datasets: [
        
                // have to map over all the cards a user has
                {
                    label: "Your cards value",
                    backgroundColor: 'rgba(94, 118, 253, 0.2)',
                    borderColor: 'rgba(25, 59, 247, 0.2)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(0, 26, 172, 0.2)',
                    hoverBorderColor: 'rgb(54, 40, 255)',
                    data: [byPrices, toPrices]
                },
            ]
        }
        setChartState(tempChart)
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
        <HorizontalBar options={options} data={chartState} />
        </>
    )

}

export default Bar
