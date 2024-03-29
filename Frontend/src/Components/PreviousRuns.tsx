import React, { useState } from 'react';
import Result from './Result'
import PreviousRunCard from './PreviousRunCard'
import './CSS/PreviousRuns.css'

function PreviousRuns() {

    {/* Goal here is to collect an array of card info from python,
        and then with that array we will create another array of 
        <PreviousRunCard /> components that pass in the info as props*/}

    const [flowStarted, setFlowStarted] = useState(false);

    const [selectedId, setSelectedId] = useState("-1");

    const handleSelection = (newSelectedId: any) => {
        console.log("inside handleSelection function")
        setFlowStarted(true); {/*makes the initial text go away */}
    
        // Create a copy of the previousRunCards array
        const newArray = previousRunCards.map(item => {
            //color new
            if (item.run_ID === newSelectedId) {
                item.isSelected = true;
                return item;
            }
            //uncolor last if not initial color:
            if (item.run_ID === selectedId) {
                item.isSelected = false;
                return item;
            }
            return item;
            
        })
        
        // Update the state with the new array
        setSelectedId(newSelectedId); 
        setPreviousRunCards(newArray);
    };


    const fetchCards = async () => {
        try {
          // Perform your fetch request here
          const response = await fetch('http://localhost:5000/CardsData');
          const data = await response.json();
          // Assuming your data is an array of cards
          setPreviousRunCards(data);
        } catch (error) {
          console.error('Error fetching card data:', error);
        }
      };

    const [previousRunCards, setPreviousRunCards] = useState([
    //placeholder data until we can get the request working
    { 
        isSelected: false, 
        model: "LCCDE", 
        f1: "0.99", 
        run_ID: "2891", 
        date: "3/18/2024 @12:04pm" 
    },
    { 
        isSelected: false, 
        model: "MTH", 
        f1: "0.91", 
        run_ID: "0001", 
        date: "3/17/2024 @12:02pm" 
    },
    { 
        isSelected: false, 
        model: "Tree-Based", 
        f1: "0.92", 
        run_ID: "0002", 
        date: "3/16/2024 @12:02pm" 
    }
    // Add more cards as needed
    ]);


    return (
        <div className="container">
            <div className="sidebar">
                {/* Map over the array of PreviousRunCard data and render each card */}
                {previousRunCards.map((card, index) => (
                    <PreviousRunCard 
                        key={index}
                        isSelected={card.isSelected} 
                        model={card.model}
                        f1={card.f1}
                        run_ID={card.run_ID}
                        date={card.date}
                        // Pass a callback function with the index to handleSelection
                        onClick={() => handleSelection(card.run_ID)}
                    />
                ))}
            </div>

            <div className="page">

            {flowStarted ? (
                <Result /> // placeholder, here we will render a specific run's parameters and result as well as a re-run button
            ) : (
                <h3>Select a record to view details</h3>
            )}
                
            </div>
        </div>
    )
}

export default PreviousRuns