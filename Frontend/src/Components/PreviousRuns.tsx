import React, { useState } from 'react';
import Result from './Result'
import PreviousRunCard from './PreviousRunCard'
import './CSS/PreviousRuns.css'

function PreviousRuns() {

    {/* Goal here is to collect an array of card info from python,
        and then with that array we will create another array of 
        <PreviousRunCard /> components that pass in the info as props*/}
    const [cardsInfo, setCardsInfo] = useState([]);


    const fetchCards = async () => {
        try {
          // Perform your fetch request here
          const response = await fetch('history/cards');
          const data = await response.json();
          // Assuming your data is an array of cards
          setCardsInfo(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

    return (
        <div className="container">
            
            <div className="sidebar">

                <PreviousRunCard 
                    isSelected={false} 
                    model="sample"
                    f1=".98387"
                    exTime= "0m 21s"
                    date="3/18/2024 @12:04pm"
                />


            </div>

            <div className="page">
                <h3>Select a record to view details</h3>
            </div>
        </div>
    )
}

export default PreviousRuns