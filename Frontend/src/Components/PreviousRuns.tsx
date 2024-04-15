// Author: zleblanc

import { useState, useEffect } from 'react';
//import Result from './Result'
import PreviousRunCard from './PreviousRunCard'
import './CSS/PreviousRuns.css'
import axios from 'axios';
import moment from 'moment';
import PageLCCDE from './ModelPages/PageLCCDE';
import { ring2 } from 'ldrs'



function PreviousRuns() {
    ring2.register() //loading ring

    const[lccdeRequest, setLccdeRequest] = useState(`{
        "model_req": {
          "dataset_path": "",
          "XGB": {
            "n_estimators": "",
            "max_depth": "",
            "learning_rate": ""
          },
          "LightGBM": {
            "num_iterations": "",
            "max_depth": "",
            "learning_rate": "",
            "num_leaves": "",
            "boosting_type": ""
          },
          "CatBoost": {
            "n_estimators": "",
            "max_depth": "",
            "learning_rate": ""
          }
        }
      }`);

    const [flowStarted, setFlowStarted] = useState(false);
    const [comparisonMode, setComparisonMode] = useState(false);

    const [leftId, setLeftId] = useState("-1");
    const [leftLCCDEdata, setLeftLCCDEdata] = useState<any>();
    const [rightId, setRightId] = useState("-1");
    const [rightLCCDEdata, setRightLCCDEdata] = useState<any>();

    const [runsData, setRunsData] = useState<any[]>([]);

    const [filterDate, setFilterDate] = useState<any>();
    const [filterF1, setFilterF1] = useState<any>();
    const [filterID, setFilterID] = useState<any>();
    const [filterModel, setFilterModel] = useState<any>();

    const [previousRunCards, setPreviousRunCards] = useState<any[]>([]);
    const [filteredPreviousRunCards, setFilteredPreviousRunCards] = useState<any[]>([]);

    const handleSelection = (newSelectedId: any) => {
        //make the initial text go away
        setFlowStarted(true); 

        //if comparing, go back to just viewing one record
        setComparisonMode(false);
    
        // Create updated Sidebar cards array
        var newNewArray = [];
        const newArray = filteredPreviousRunCards[0].map((item: { run_ID: string; isSelected: boolean; }) => {
            //color new
            if (item.run_ID === newSelectedId) {
                item.isSelected = true;
                return item;
            }
            //uncolor last if not initial color:
            if (item.run_ID === leftId) {
                item.isSelected = false;
                return item;
            }
            return item;
        })
        newNewArray.push(newArray);
        
        // Update the state with the new array
        setLeftId(newSelectedId);
        retrieveDataWithId(newSelectedId, true);//this sets the component on the screen 
        setFilteredPreviousRunCards(newNewArray);
    };

    // Retrieve all previous runs data
    useEffect(() => {
      fetchData();
    }, []);
    
    useEffect(() => {
        retrieveDataWithId(rightId, false);
    }, [rightId])

    useEffect(() => {
        retrieveDataWithId(leftId, true);
    }, [leftId])

    //Runs handle filter whenever a change is made to any of the filter variables
    useEffect(() => {
        handleFilter();
    }, [filterDate, filterID, filterModel, filterF1, previousRunCards])

    const fetchData = async () => {
        // collect the data and store as an array in React state variable
        try {
          const response = await axios.get('http://localhost:5000/retrieveLccde');
        let data = JSON.parse(response.data); 
        setRunsData(data.rows);
        console.log("data=" + JSON.stringify(data.rows));

        /*
        const response2 = await axios.get('http://localhost:5000/retrieveTree')
        let data2 = JSON.parse(response.data);
        console.log("data2=" + JSON.stringify(data2.rows));
        */

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
        }}

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
            const filteredArr = newSubArray.filter(obj => obj.f1 > filterF1)
            if (filteredArr.length == 0)
                newSubArray = []
            else
                newSubArray = filteredArr
        }

        //handle Date
        if (!(filterDate == undefined || filterDate == ""))
        {
            //check each item, remove it it isn't target date
            for (var i = 0; i < newSubArray.length; i++)
            {
                const parsedDate = moment(newSubArray[i].date, "M-DD-YYYY", false);

                //console.log("comparing:["+parsedDate.format("YYYY-MM-DD") + "] AND [" + filterDate + ']')
                if (parsedDate.format("YYYY-MM-DD") != filterDate)
                    {
                        newSubArray = [newSubArray.slice(0, i), ...newSubArray.slice(i + 1)]
                    }
            }
        }
        
        newArray.push(newSubArray)

        //check for valid array: in order to fix weird single empty item issue and empty newSubArray issue
        if (newSubArray.length == 0) //check this first so newArray[0][0].model doesn't give undefined error
        {
            setFilteredPreviousRunCards([])
        }
        else if (newArray[0][0].model == "LCCDE" || newArray[0][0].model == "MTH" || newArray[0][0].model == "Tree-Based") {
            setFilteredPreviousRunCards(newArray);
        }
        else {
            setFilteredPreviousRunCards([]);
        }
    }

    //sets all the filter values to their defaults
    const clearFilters = () => {
        setFilterDate(undefined);
        setFilterF1(0);
        setFilterID("");
        setFilterModel("any");
    }

    const retrieveDataWithId = (run_id: any, leftSide:boolean) => {
        //find the object in the array with the correct ID
        if (run_id == "null")
        {
            run_id = runsData[runsData.length-1].id.toString()
        }
        for(var i = 0; i < runsData.length; i++)
        {
            if(runsData[i].id.toString() === run_id)
            {
                if (leftSide)
                {

                    setLeftLCCDEdata(
                        <PageLCCDE
                        key={leftId}
                        sendDataToParent={handleChildData}
                        className="pageElement"
                        
                        runnable={false}
                        nEstimators={runsData[i].XGB.n_estimators}
                        maxDepth={runsData[i].XGB.max_depth}
                        learningRate={runsData[i].XGB.learning_rate}
                        numIterations={runsData[i].LightGBM.num_iterations}
                        numLeaves={runsData[i].LightGBM.num_leaves}
                        boostingType={runsData[i].LightGBM.boosting_type}
                        //This needs to be replaced with Imad's result component
                        result={
                            parseFloat(runsData[i].f1).toFixed(5) + " " +
                            parseFloat(runsData[i].accuracy).toFixed(5) + " " + 
                            parseFloat(runsData[i].precision).toFixed(5) + " " + 
                            parseFloat(runsData[i].recall).toFixed(5) + " " +
                            parseFloat(runsData[i].execution_time).toFixed(5) + " " +
                            runsData[i].heatmap
                        }
                        />
                    )
                }
                else
                {
                    setRightLCCDEdata(
                        <PageLCCDE
                        key={rightId}
                        sendDataToParent={handleChildData}
                        className="pageElement"
    
                        runnable={false}
                        nEstimators={runsData[i].XGB.n_estimators}
                        maxDepth={runsData[i].XGB.max_depth}
                        learningRate={runsData[i].XGB.learning_rate}
                        numIterations={runsData[i].LightGBM.num_iterations}
                        numLeaves={runsData[i].LightGBM.num_leaves}
                        boostingType={runsData[i].LightGBM.boosting_type}
                        //This needs to be replaced with Imad's result component
                        result={
                            parseFloat(runsData[i].f1).toFixed(5) + " " +
                            parseFloat(runsData[i].accuracy).toFixed(5) + " " + 
                            parseFloat(runsData[i].precision).toFixed(5) + " " + 
                            parseFloat(runsData[i].recall).toFixed(5) + " " +
                            parseFloat(runsData[i].execution_time).toFixed(5) + " " +
                            runsData[i].heatmap
                            }
                        />
                    )
                }
                
            }
        }
        return
    }

    const runModifiedAndCompare = (leftSide: boolean) => {
        //Set page state variable to be comparing
        setComparisonMode(true);

        //process leftOrRight (1 = left called run again, 2= right called run again) 
        if (leftSide == true)
            setRightId("-1")  //sets that side of the page to show "runnning"
        else 
            setLeftId("-1")

        const sendLCCDEParams = async () => {
            try {
                //not saving response, instead just reretreiveing lccde records in order to get the params and id
                /*const response = */await axios.put('http://localhost:5000/runLccde', {code: lccdeRequest});
                await fetchData();
                var largestId= -1

                for (var i = 0; i< previousRunCards.length; i++)
                {
                    if (parseInt(previousRunCards[i].run_ID) > largestId)
                        largestId = parseInt(previousRunCards[i].run_ID)
                }

                if (leftSide == true) 
                    setRightId((largestId+1).toString()) //left called, so change right side

                else 
                    setLeftId((largestId+1).toString()) //right called, so change left side

                } catch (error) {
                    console.error('Error sending response: ', error);
                }
                }
        sendLCCDEParams();
    }

    //lets PreviousRuns.tsx see inside PageLCCDE.tsx variables
    const handleChildData = (nEstimators:any, maxDepth:any, learningRate:any, numIterations:any, numLeaves:any, boostingType:any) => {
        setLccdeRequest(
            JSON.stringify({
                "model_req": {
                  "dataset_path": "CICIDS2017_sample.csv",
                  "XGB": {
                    "n_estimators": nEstimators,
                    "max_depth": maxDepth,
                    "learning_rate": learningRate
                  },
                  "LightGBM": {
                    "num_iterations": numIterations,
                    "max_depth": maxDepth,
                    "learning_rate": learningRate,
                    "num_leaves": numLeaves,
                    "boosting_type": boostingType
                  },
                  "CatBoost": {
                    "n_estimators": nEstimators,
                    "max_depth": maxDepth,
                    "learning_rate": learningRate
                  }
                }
              })
        )
    }

    return (
        <div className="container">
            <div className="historySidebar">
                <div className="filterContainer">
                    <h2>Filter</h2>
                    <label htmlFor="date">Date:</label>
                    <input type="date" id="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />

                    <label htmlFor="score">F1 (minimum): {filterF1}</label>
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
                //<Result id={leftId}/> 
                <div className="record" id="left">
                    {parseInt(leftId) > -1 ?
                    (<>
                        {leftLCCDEdata}
                        <button onClick={() => runModifiedAndCompare(true)}>Run</button>
                    </>) :
                    (
                        <>
                                <div className="runningText">Running</div>
                                <l-ring-2
                                    size="50"
                                    stroke="5"
                                    stroke-length="0.25"
                                    bg-opacity="0.1"
                                    speed="0.9" 
                                    color="black" 
                                    ></l-ring-2>
                            </>
                    )}
                </div>
                
            ) : (
                <h3 style={{ paddingLeft:"500px" }}>Select a record to view details</h3>
            )}

            {comparisonMode ? //Render new one to the right
            (
                <div className="record">
                            
                    {parseInt(rightId) > -1 ?
                    (<>
                        {rightLCCDEdata}
                        <button onClick={() => runModifiedAndCompare(false)}>Run</button>
                    </>) : 
                        (
                            <>
                                <div className="runningText">Running</div>
                                <l-ring-2
                                    size="50"
                                    stroke="5"
                                    stroke-length="0.25"
                                    bg-opacity="0.1"
                                    speed="0.9" 
                                    color="black" 
                                    ></l-ring-2>
                            </>
                        )} 
                </div>
            ) : 
            (
                <></>
            )}
            </div>
        </div>
    )
}

export default PreviousRuns