import React, { useState } from 'react';
import Result from './Result'
import PreviousRunCard from './PreviousRunCard'
import './CSS/PreviousRuns.css'
import axios from 'axios';


function PreviousRuns() {

    {/* Goal here is to collect an array of card info from python,
        and then with that array we will create another array of 
        <PreviousRunCard /> components that pass in the info as props*/}

    const [flowStarted, setFlowStarted] = useState(false);
    const [selectedId, setSelectedId] = useState("-1");
    const [previousData1, setPreviousData1] = useState({});
    const [previousData2, setPreviousData2] = useState({});

    const handleSelection = (newSelectedId: any) => {
        console.log("inside handleSelection function")
        //AXIOS CALL HERE FOR RESULT + PARAMETERS

        setFlowStarted(true); {/*makes the initial text go away */}
    
        // Create updated Sidebar cards array
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
          const response = await fetch('http://localhost:5000/fetchCardsData');
          const data = await response.json();
          // data should be an array of cards:
          /*
          
           [{ 
                isSelected: false, 
                model: "LCCDE", 
                f1: "0.99", 
                run_ID: "2891", 
                date: "3/18/2024 @12:04pm" 
            }]

          */
          setPreviousRunCards(data);
        } catch (error) {
          console.error('Error fetching card data:', error);
        }
      };

      const fetchRun = async (id: string) => {
        try {
            console.log("inside fetchRun");
            // TODO: figure out from @mlandauro what endpoint to use, and what format to pass request in
            {console.log("card is sending a response")}
            const response = await axios.post('http://localhost:5000/fetchRun', {QueryResultWithParams: {id}});
            //I need all the parameter values and result of run
            setPreviousData1(response.data);
        } catch (error) {
            console.error('Error fetching run: ', error);
        }
        return;
        }

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
                // placeholder, here we will render a specific run's parameters and result as well as a re-run button
                //<LCCDEParams props={} />
                <Result id={selectedId}/> 
            ) : (
                <h3>Select a record to view details</h3>
            )}
                
            </div>
        </div>
    )
}

export default PreviousRuns