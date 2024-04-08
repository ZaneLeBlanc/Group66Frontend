// Author: zleblanc

import { useState, useEffect } from 'react';
//import Result from './Result'
import PreviousRunCard from './PreviousRunCard'
import './CSS/PreviousRuns.css'
import axios from 'axios';
import moment from 'moment';


function PreviousRuns() {

    const [flowStarted, setFlowStarted] = useState(false);
    const [selectedId, setSelectedId] = useState("-1");
    const [runsData, setRunsData] = useState<any[]>([]);

    const [filterDate, setFilterDate] = useState<any>();
    const [filterF1, setFilterF1] = useState<any>();
    const [filterID, setFilterID] = useState<any>();
    const [filterModel, setFilterModel] = useState<any>();

    
    const [previousRunCards, setPreviousRunCards] = useState<any[]>([
        //placeholder data if the fetch request fails
        { 
            isSelected: false, 
            model: "LCCDE", 
            f1: "0.99", 
            run_ID: "2891", 
            date: "3/18/2024 @12:04pm" 
        }
        
    
    ]);
    const [filteredPreviousRunCards, setFilteredPreviousRunCards] = useState<any[]>([]);

    const handleSelection = (newSelectedId: any) => {
        //make the initial text go away
        setFlowStarted(true); 
    
        // Create updated Sidebar cards array
        var newNewArray = [];
        const newArray = filteredPreviousRunCards[0].map((item: { run_ID: string; isSelected: boolean; }) => {
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
        newNewArray.push(newArray);
        
        // Update the state with the new array
        setSelectedId(newSelectedId); 
        setFilteredPreviousRunCards(newNewArray);
    };

    // Retrieve all previous runs data
    //use effect makes this only run once
    useEffect(() => {
    const fetchData = async () => {
        // collect the data and store as an array in React state variable
        try {
          const response = await axios.post('http://localhost:5000/retrievelccde');
        let data = JSON.parse(response.data); 
        setRunsData(data.rows);

        //this maps each item in the data array, to be a summary card for the sidebar array. lots of ugly typescript in the top
        const formattedData = data.rows.map((row: { f1: number; id: { toString: () => any; }; run_date: string | number | Date; }) => ({
            isSelected: false,
            model: "LCCDE", //need to be able to detect MTH and Tree in future
            f1: row.f1.toFixed(5),
            run_ID: row.id.toString(),
            date: new Date(row.run_date).toLocaleString()
            }));
    
            //array is created, put it in the sidebar varaible array
            setPreviousRunCards(formattedData);
            var tempArray = [];
            tempArray.push(formattedData);
            setFilteredPreviousRunCards(tempArray);
            
        } catch (error) {
          console.error('Error fetching card data:', error);
        }
      };

      fetchData();

    }, []);

    // given an id's run, this function returns the JSON object from the initial data retrieval.
    // in the future we would want to just parse the data here to pass it to a component as props
    // I'm pretty sure this is not how to properly make a function, I think I need to use the const thing
    function retrieveDataWithId(run_id: any) {
        //find the object in the array with the correct ID
        for(var i = 0; i < runsData.length; i++)
            {
                if(runsData[i].id.toString() === run_id)
                {
                    var theString = JSON.stringify(runsData[i]);
                    //console.log("retrieve: " + theString);
                    return theString;
                }
            }
    }

    //Runs handle filter whenever a change is made to any of the filter variables
    useEffect(() => {
        handleFilter();
    }, [filterDate, filterID, filterModel, filterF1])

    //sets all the filter values to their defaults
    const clearFilters = () => {
        setFilterDate(undefined);
        setFilterF1(0);
        setFilterID("");
        setFilterModel("any");
    }


    const handleFilter = () => {
        let newSubArray = [] //array to hold items that pass the filter
        let newArray = []; //Temporary fix for array issues: we place the newSubArray within this array at the end

        //handle ID
        if(filterID == undefined || filterID == ""){
            for (var i = 0; i < previousRunCards.length; i++)
                {
                    newSubArray.push(previousRunCards[i])
                }
        }
        else{
            for (var i = 0; i < previousRunCards.length; i++)
                {
                    if(previousRunCards[i].run_ID == filterID)
                    {
                        newSubArray.push(previousRunCards[i])
                    }
                }
        }

        //handle model
        
        if (filterModel == undefined || filterModel == "any")
        {
        }
        else if (filterModel == "LCCDE") {
            for (var i = 0; i < newSubArray.length; i++)
                {
                    const elementModel: any = newSubArray[i].model;
                    if (elementModel != "LCCDE")
                    newSubArray = [newSubArray.slice(0, i), ...newSubArray.slice(i + 1)]
                }
        }
        else if (filterModel == "MTH") {
            for (var i = 0; i < newSubArray.length; i++)
                {
                    const elementModel = newSubArray[i].model;
                    if (elementModel != "MTH")
                    newSubArray = [newSubArray.slice(0, i), ...newSubArray.slice(i + 1)]
                }
        }
        else if (filterModel == "Tree-Based") {
            for (var i = 0; i < newSubArray.length; i++)
                {
                    const elementModel = newSubArray[i].model;
                    if (elementModel != "Tree-Based")
                    newSubArray = [newSubArray.slice(0, i), ...newSubArray.slice(i + 1)]
                }
        }

        //handle F1
        if (filterF1 != undefined)
        {
            //check each item, remove it it isn't equal to or above
            for (var i = 0; i < newSubArray.length; i++)
            {

                if (newSubArray[i].f1 < filterF1)
                    newSubArray = [newSubArray.slice(0, i), ...newSubArray.slice(i + 1)]
            }
        }

        //handle Date
        if (!(filterDate == undefined || filterDate == ""))
        {
            //check each item, remove it it isn't target date
            for (var i = 0; i < newSubArray.length; i++)
            {
                const parsedDate = moment(newSubArray[i].date, "M-DD-YYYY", false);
                if (parsedDate.format("YYYY-MM-DD") != filterDate)
                    {
                        newSubArray = [newSubArray.slice(0, i), ...newSubArray.slice(i + 1)]
                    }
            }
        }
        
        newArray.push(newSubArray)

        //check for valid array: in order to fix weird single empty item issue
        if (newArray[0][0].model == "LCCDE" || newArray[0][0].model == "MTH" || newArray[0][0].model == "Tree-Based") {
            setFilteredPreviousRunCards(newArray);
        }
        else {
            setFilteredPreviousRunCards([]);
        }
    }

    return (
        <div className="container">
            <div className="sidebar">
                <div className="filterContainer">
                    <h2>Filter</h2>
                    <label htmlFor="date">Date:</label>
                    <input type="date" id="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />

                    <label htmlFor="score">F1 (greater than): {filterF1}</label>
                    <input type="range" id="score" min="0" max="1" step="0.001" value={filterF1} onChange={(e) => setFilterF1(e.target.value)} />

                    <label htmlFor="id">ID:</label>
                    <input type="text" id="id" value={filterID} onChange={(e) => setFilterID(e.target.value)} placeholder="Search by ID" />

                    <label htmlFor="model-type">Model Type:</label>
                    <select id="model-type" value={filterModel} onChange={(e) => setFilterModel(e.target.value)}>
                        <option value="">any</option>
                        <option value="LCCDE">LCCDE</option>
                        <option value="MTH">MTH</option>
                        <option value="Tree-Based">Tree-Based</option>
                    </select>
                    <button onClick={clearFilters}>Clear Filters</button>
                </div>

                {/* Map over the array of PreviousRunCard data and render each card */}
                {filteredPreviousRunCards.length > 0 ? 
                (<ul>
                    {filteredPreviousRunCards[0].map((card: { isSelected: any; model: any; f1: any; run_ID: any; date: any; }, index: any) => (
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

                </ul>) 
                : (<h3>no records</h3>)}
            </div>
            <div className="page">

            {flowStarted ? (
                // placeholder, here we will render a specific run's parameters and result as well as a re-run button
                //<LCCDEParams props={} />
                //<Result id={selectedId}/> 
                <p style={{padding: "100px"}}>{retrieveDataWithId(selectedId)}</p>
            ) : (
                <h3>Select a record to view details</h3>
            )}
            </div>
        </div>
    )
}

export default PreviousRuns