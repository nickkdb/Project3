import React, { Component } from 'react';
import {HorizontalBar} from 'react-chartjs-2';
// import '../../css/defaults.css';

const state = {
    labels: ["Card 1", "Card 2", "Card 3"],
    datasets: [

        // have to map over all the cards a user has
        {
            label: "Your cards value",
            backgroundColor: 'rgba(94, 118, 253, 0.2)',
            borderColor: 'rgba(25, 59, 247, 0.2)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(0, 26, 172, 0.2)',
            hoverBorderColor: 'rgb(54, 40, 255)',
            data: [3,7, 5]
        },
        // {
        //     label: "Avg value of category",
        //     backgroundColor: 'rgba(248, 64, 58, 0.2)',
        //     borderColor: 'rgba(226, 12, 5, 0.2)',
        //     borderWidth: 1,
        //     hoverBackgroundColor: 'rgba(172, 0, 0, 0.2)',
        //     hoverBorderColor: 'rgb(255, 40, 40)',
        //     data: [4,3, 6]
        // },
    ]
}
const options = { 
    scales: { 
        xAxes: [{
             ticks: {
                beginAtZero: true, 
                max: 10
                } 
            }] 
        }     
    };

export default class Bar extends Component {
    render() {
        return (
            <>
            <h2 style={{textAlign: "center"}}>Card Comparison</h2>
            <HorizontalBar options={options} data={state} />
            </>
        )
    }
}