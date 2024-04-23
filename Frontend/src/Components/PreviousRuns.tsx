// Author: zleblanc

import { useState, useEffect } from 'react';
//import Result from './Result'
import PreviousRunCard from './PreviousRunCard'
import './CSS/PreviousRuns.css'
import axios from 'axios';
import moment from 'moment';
import PageLCCDE from './ModelPages/PageLCCDE';
import { ring2 } from 'ldrs'
import PageTree from './ModelPages/PageTree';
import PageMTH from './ModelPages/PageMTH';

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

      const[treeRequest, setTreeRequest] = useState(`{
        "model_req": {
            "dataset_path": "",
            "XGB": {
                "n_estimators": "",
                "max_depth": "",
                "learning_rate": ""
            },
            "DTree": {
                "max_depth": "",
                "min_samples_split": "",
                "splitter": "",
            },
            "RTree": {
                "n_estimators": "",
                "max_depth": "",
                "min_samples_split": ""
            },
            "ETree": {
                "n_estimators": "",
                "max_depth": "",
                "min_samples_split": ""
            }
        }
      }`);

      const[mthRequest, setMthRequest] = useState(`{
        "model_req": {
            "dataset_path": "",
            "training_allocation": "",
            "max_features": "",
            "hpo_max_evals": ""
        }
      }`);

    const [flowStarted, setFlowStarted] = useState(false);
    const [comparisonMode, setComparisonMode] = useState(false);

    const [leftId, setLeftId] = useState("-1");
    const [leftComponent, setLeftComponent] = useState<any>();

    const [rightId, setRightId] = useState("-1");
    const [rightComponent, setRightComponent] = useState<any>();

    const [runsData, setRunsData] = useState<any[]>([]);

    const [filterDate, setFilterDate] = useState<any>();
    const [filterF1, setFilterF1] = useState<any>();
    const [filterID, setFilterID] = useState<any>();
    const [filterModel, setFilterModel] = useState<any>();

    const [previousRunCards, setPreviousRunCards] = useState<any[]>([]);
    const [filteredPreviousRunCards, setFilteredPreviousRunCards] = useState<any[]>([]);

    const [ idModelMap, setIdModelMap] = useState(new Map())

    const [shiftHeld, setShiftHeld] = useState(false);


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

            //edge case for shift click
            if (leftId != "-1" && rightId == "-1" && shiftHeld && item.run_ID == leftId)
            {
                item.isSelected = true;
                return item;

            }
            //uncolor last if not initial color:
            if (item.run_ID != newSelectedId) {
                item.isSelected = false;
                return item;
            }

            
            
            return item;
        })
        newNewArray.push(newArray);
        setFilteredPreviousRunCards(newNewArray);
        
        if (leftId != "-1" && rightId == "-1" && shiftHeld)
        {
            setRightId(newSelectedId)
            retrieveDataWithId(newSelectedId, false)
        }
        else
        {
            setLeftId(newSelectedId);
            setRightId("-1")
            retrieveDataWithId(newSelectedId, true);//this sets the component on the screen 
        }
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
    

    useEffect(() => {
    }, [rightComponent, rightComponent])

    useEffect (() => {
    }, [idModelMap])


    //Runs handle filter whenever a change is made to any of the filter variables
    useEffect(() => {
        handleFilter();
    }, [filterDate, filterID, filterModel, filterF1, previousRunCards])

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
          if (event.key === 'Shift') {
            setShiftHeld(true);
          }
        };
    
        const handleKeyUp = (event: KeyboardEvent) => {
          if (event.key === 'Shift') {
            setShiftHeld(false);
          }
        };
    
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
    
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
          document.removeEventListener('keyup', handleKeyUp);
        };
      }, []);


    const fetchData = async () => {
        // collect the data and store as an array in React state variable
        try {
            const tempModelMap = new Map();

            const response = await axios.get('http://localhost:5000/retrieveLccde');
            let data = JSON.parse(response.data); 
            let arr1 = data.rows
            for (let i = 0; i< arr1.length; i++)
            {
                //add to some sort of hashmap storing id's correlated to Tree-based
                tempModelMap.set(arr1[i].id.toString(), "LCCDE")
            }

            const response2 = await axios.get('http://localhost:5000/retrieveTree')
            let data2 = JSON.parse(response2.data);
            let arr2 = data2.rows
            for (let i = 0; i< arr2.length; i++)
            {
                arr1.push(arr2[i])
                tempModelMap.set(arr2[i].id.toString(), "Tree")
            }

            const response3 = await axios.get('http://localhost:5000/retrieveMth')
            let data3 = JSON.parse(response3.data);
            let arr3 = data3.rows
            for (let i = 0; i< arr3.length; i++)
            {
                arr1.push(arr3[i])
                tempModelMap.set(arr3[i].id.toString(), "MTH")
            }

            setRunsData(arr1)
            setIdModelMap(tempModelMap)

        //this maps each item in the data array, to be a summary card for the sidebar array. lots of ugly typescript in the top
        let formattedData = data.rows.map((row: { f1: number; id: { toString: () => any; }; run_date: string | number | Date; }) => ({
            isSelected: false,
            model: tempModelMap.get(row.id.toString()), //need to be able to detect MTH and Tree in future
            f1: row.f1.toFixed(5),
            run_ID: row.id.toString(),
            date: new Date(row.run_date).toLocaleString()
        }));

            //sort the data based on the run_id
        formattedData = formattedData.sort((n1: { run_ID: string; }, n2: { run_ID: string; }) => 
                (parseInt(n1.run_ID) < parseInt(n2.run_ID)) ? 1 : (parseInt(n1.run_ID) > parseInt(n2.run_ID)) ? -1 : 0)
    
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
        else{
            const filteredArr = newSubArray.filter(obj => obj.model == filterModel)
            if (filteredArr.length == 0)
                newSubArray = []
            else
                newSubArray = filteredArr
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
            const filteredArr = newSubArray.filter(obj => moment(obj.date, "M-DD-YYYY", false).format("YYYY-MM-DD") == filterDate)
            if (filteredArr.length == 0)
                newSubArray = []
            else
                newSubArray = filteredArr
        }
        
        newArray.push(newSubArray)

        //check for valid array: in order to fix weird single empty item issue and empty newSubArray issue
        if (newSubArray.length == 0) //check this first so newArray[0][0].model doesn't give undefined error
        {
            setFilteredPreviousRunCards([])
        }
        else if (newArray[0][0].model == "LCCDE" || newArray[0][0].model == "MTH" || newArray[0][0].model == "Tree") {
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
                
                    let newComponent;
                    switch(idModelMap.get(run_id/*leftSide ? leftId : rightId*/)) {
                        case "LCCDE":
                        newComponent = <PageLCCDE
                            key={leftSide ? leftId : rightId}
                            sendDataToParent={handleChildDataLCCDE}
                            className="pageElement"
                            runnable={false}     

                            nEstPrev = {'(' + runsData[i].XGB.n_estimators.toString() + ')'}
                            mDepPrev = {'(' +runsData[i].XGB.max_depth.toString()+ ')'}
                            lRatePrev = {'(' +runsData[i].XGB.learning_rate.toString()+ ')'}
                            nIterPrev = {'(' +runsData[i].LightGBM.num_iterations.toString()+ ')'}
                            nLeavesPrev = {'(' +runsData[i].LightGBM.num_leaves.toString()+ ')'}
                            bTypePrev = {'(' +runsData[i].LightGBM.boosting_type.toString()+ ')'}



                            nEstimators={runsData[i].XGB.n_estimators}
                            maxDepth={runsData[i].XGB.max_depth}
                            learningRate={runsData[i].XGB.learning_rate}
                            numIterations={runsData[i].LightGBM.num_iterations}
                            numLeaves={runsData[i].LightGBM.num_leaves}
                            boostingType={runsData[i].LightGBM.boosting_type}

                            result={{
                                f1: parseFloat(runsData[i].f1).toFixed(5),
                                accuracy: parseFloat(runsData[i].accuracy).toFixed(5),
                                precision: parseFloat(runsData[i].precision).toFixed(5),
                                recall: parseFloat(runsData[i].recall).toFixed(5),
                                execution_time: parseFloat(runsData[i].execution_time).toFixed(5),
                                heatmap: runsData[i].heatmap,
                                showValidator: true
                            }} />
                        break;

                        case "Tree":
                            newComponent = <PageTree
                                key={leftId}
                                sendDataToParent={handleChildDataTree}
                                className="pageElement"
                                runnable={false}     

                                xgbEstimatorsPrev = {'(' + runsData[i].XGB.n_estimators.toString() + ')'}
                                etEstimatorsPrev = {'(' + runsData[i].ET_keys.n_estimators.toString() + ')'}
                                rtEstimatorsPrev = {'(' + runsData[i].RT_keys.n_estimators.toString() + ')'}
                                xgbMaxDepthPrev = {'(' + runsData[i].XGB.max_depth.toString() + ')'}
                                dtMaxDepthPrev = {'(' + (runsData[i].DT_keys.max_depth == null) ? "(6)" : runsData[i].DT_keys.max_depth.toString() + ')'}
                                rtMaxDepthPrev = {'(' + (runsData[i].RT_keys.max_depth == null) ? "(6)" : runsData[i].RT_keys.max_depth.toString() + ')'}
                                etMaxDepthPrev = {'(' + (runsData[i].ET_keys.max_depth == null) ? "(6)" : runsData[i].ET_keys.max_depth.toString() + ')'}
                                dtMinSamplePrev = {'(' + runsData[i].DT_keys.min_samples_split.toString() + ')'}
                                rtMinSamplePrev = {'(' + runsData[i].RT_keys.min_samples_split.toString() + ')'}
                                etMinSamplePrev = {'(' + runsData[i].ET_keys.min_samples_split.toString() + ')'}
                                learningRatePrev = {'(' + runsData[i].XGB.learning_rate.toString() + ')'} 
                                splitterPrev = {'(' + runsData[i].DT_keys.splitter.toString() + ')'}
                                

                                xgbEstimators = {runsData[i].XGB.n_estimators.toString()}
                                etEstimators = {runsData[i].ET_keys.n_estimators.toString()}
                                rtEstimators = {runsData[i].RT_keys.n_estimators.toString()}
                                xgbMaxDepth = {runsData[i].XGB.max_depth.toString()}
                                dtMaxDepth = {(runsData[i].DT_keys.max_depth == null) ? "6" : runsData[i].DT_keys.max_depth.toString()}
                                rtMaxDepth = {(runsData[i].RT_keys.max_depth == null) ? "6" : runsData[i].RT_keys.max_depth.toString()}
                                etMaxDepth = {(runsData[i].ET_keys.max_depth == null) ? "6" : runsData[i].ET_keys.max_depth.toString()}
                                dtMinSample = {runsData[i].DT_keys.min_samples_split.toString()}
                                rtMinSample = {runsData[i].RT_keys.min_samples_split.toString()}
                                etMinSample = {runsData[i].ET_keys.min_samples_split.toString()}
                                learningRate = {runsData[i].XGB.learning_rate.toString()}
                                splitter = {runsData[i].DT_keys.splitter.toString()}

                               
                                result={{
                                    f1: parseFloat(runsData[i].f1).toFixed(5),
                                    accuracy: parseFloat(runsData[i].accuracy).toFixed(5),
                                    precision: parseFloat(runsData[i].precision).toFixed(5),
                                    recall: parseFloat(runsData[i].recall).toFixed(5),
                                    execution_time: parseFloat(runsData[i].execution_time).toFixed(5),
                                    heatmap: runsData[i].heatmap,
                                    showValidator: false
                                }} />

                            break;
                        case "MTH":
                            newComponent = <PageMTH
                            key={leftSide ? leftId : rightId}
                            sendDataToParent={handleChildDataMTH}
                            className="pageElement"
                            runnable={false}     

                            //clusterPrev = {'(' + runsData[i].XGB.n_estimators.toString() + ')'}
                            //batchSizePrev = {'(' +runsData[i].XGB.max_depth.toString()+ ')'}
                            trainingAllocationPrev = {'(' +runsData[i].training_allocation.toString()+ ')'}
                            maxFeaturesPrev = {'(' +runsData[i].max_features.toString()+ ')'}
                            hpoMaxEvalsPrev = {'(' +runsData[i].hpo_max_evals.toString()+ ')'}



                            //cluster={runsData[i].XGB.n_estimators}
                            //batchSize={runsData[i].XGB.max_depth}
                            trainingAllocation={runsData[i].training_allocation}
                            maxFeatures={runsData[i].max_features}
                            hpoMaxEvals={runsData[i].hpo_max_evals}

                            result={{
                                f1: parseFloat(runsData[i].f1).toFixed(5),
                                accuracy: parseFloat(runsData[i].accuracy).toFixed(5),
                                precision: parseFloat(runsData[i].precision).toFixed(5),
                                recall: parseFloat(runsData[i].recall).toFixed(5),
                                execution_time: parseFloat(runsData[i].execution_time).toFixed(5),
                                heatmap: runsData[i].heatmap,
                                showValidator: false
                            }} />
                            break;
                        default:
                            console.log("error, undetected model name, defaulted switch")
                            console.log("model type was = " + idModelMap.get(run_id/*leftSide ? leftId : rightId*/))
                            break;
                    }
                    
                    if (leftSide)
                    {
                        setLeftComponent(newComponent)
                    }
                    else {
                        setComparisonMode(true)
                        setRightComponent(newComponent)
                    }
                
            }
        }
        return
    }

    const runModifiedAndCompare = (leftSide: boolean) => {
        //Set page state variable to be comparing
        setComparisonMode(true);
        console.log("runModiandcompare")
        let modelType;
        
        //process leftOrRight (1 = left called run again, 2= right called run again) 
        if (leftSide == true)
        {

            setRightId("-1")  //sets that side of the page to show "runnning"
            modelType = idModelMap.get(leftId)

        }
        else 
        {
            setLeftId("-1")
            modelType = idModelMap.get(rightId)
        }
            

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
                    //handle error on rerun
                    console.log("handle error")
                    if (leftSide == true)
                    {
                        setRightId('0')
                        setRightComponent(<p>Error Processing Run</p>)
                    }
                    else 
                    {
                        setLeftId('0')
                        setLeftComponent(<p>Error Processing Run</p>)
                    }
                }
        }
        const sendTreeParams = async () => {
            try {
                //not saving response, instead just reretreiveing lccde records in order to get the params and id
                /*const response = */await axios.put('http://localhost:5000/runTree', {code: treeRequest});
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
                    //handle error on rerun
                    console.log("handle error")
                    if (leftSide == true)
                    {
                        setRightId('0')
                        setRightComponent(<p>Error Processing Run</p>)
                    }
                    else 
                    {
                        setLeftId('0')
                        setLeftComponent(<p>Error Processing Run</p>)
                    }
                }
        }
        const sendMTHParams = async () => {
            try {
                //not saving response, instead just reretreiveing lccde records in order to get the params and id
                /*const response = */await axios.put('http://localhost:5000/runMth', {code: mthRequest});
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
                    //handle error on rerun
                    console.log("handle error")
                    if (leftSide == true)
                    {
                        setRightId('0')
                        setRightComponent(<p>Error Processing Run</p>)
                    }
                    else 
                    {
                        setLeftId('0')
                        setLeftComponent(<p>Error Processing Run</p>)
                    }
                }
        }


        if (modelType == "LCCDE")
            sendLCCDEParams();
        else if (modelType == "Tree")
            sendTreeParams();
        else
            sendMTHParams();
    }

    //lets PreviousRuns.tsx see inside PageLCCDE.tsx variables
    const handleChildDataLCCDE = (nEstimators:any, maxDepth:any, learningRate:any, numIterations:any, numLeaves:any, boostingType:any) => {
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

    const handleChildDataTree = (xgbEstimators:any, etEstimators:any, rtEstimators:any, xgbMaxDepth:any, dtMaxDepth:any, rtMaxDepth:any, etMaxDepth:any, dtMinSample:any, rtMinSample:any, etMinSample:any, learningRate:any, splitter:any, /*criterion:any*/) => {
        setTreeRequest(
            JSON.stringify({
                "model_req": {
                    "dataset_path": "CICIDS2017_sample.csv",
                    "XGB": {
                        "n_estimators": xgbEstimators,
                        "max_depth": xgbMaxDepth,
                        "learning_rate": learningRate
                    },
                    "DTree": {
                        "max_depth": dtMaxDepth,
                        "min_samples_split": dtMinSample,
                        "splitter": splitter,
                    },
                    "RTree": {
                        "n_estimators": rtEstimators,
                        "max_depth": rtMaxDepth,
                        "min_samples_split": rtMinSample
                    },
                    "ETree": {
                        "n_estimators": etEstimators,
                        "max_depth": etMaxDepth,
                        "min_samples_split": etMinSample
                    }
                }
              })
        )
    }

    const handleChildDataMTH = (/*cluster:any, batchSize:any,*/ trainingAllocation:any, maxFeatures:any, hpoMaxEvals:any) => {
        setMthRequest(
            JSON.stringify({
                "model_req": {
                    "dataset_path": "CICIDS2017_sample.csv",
                    //"batch_size": batchSize,
                    //"cluster": cluster,
                    "training_allocation": trainingAllocation,
                    "max_features": maxFeatures,
                    "hpo_max_evals": hpoMaxEvals
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
                        <option value="Tree">Tree-Based</option>
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
                        {leftComponent}
                        <button className="runButton" onClick={() => runModifiedAndCompare(true)}>Run</button>
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
                                    color="rgb(33, 53, 71)" 
                                    ></l-ring-2>
                            </>
                    )}
                </div>
                
            ) : (
                <h3>(Select a record to view details)</h3>
            )}

            {comparisonMode ? //Render new one to the right
            (
                <div className="record">
                            
                    {parseInt(rightId) > -1 ?
                    (<>
                        {rightComponent}
                        {rightId != '0' ? (<button className="runButton" onClick={() => runModifiedAndCompare(false)}>Run</button>) : <></>}
                        
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
                                    color="rgb(33, 53, 71)" 
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