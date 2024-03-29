import './CSS/PreviousRunCard.css'
import React from 'react';
import axios from 'axios';
import { useState } from 'react';

function PreviousRunCard(props: any) {
    {/*Props:
    isSelected: boolean   #this makes it orange or grey background
    model: string         #e.g. "LCCDE"
    f1: string            #e.g. ".98387"  (not sure how much precision we want)
    run_ID: string        #e.g. "0001"
    date: string          #e.g. "3/18/2024 @12:04pm"
    */}

    console.log("run_ID: " + props.run_ID + "      isSelected: " + props.isSelected);

    const handleFetchRun = async (id: string) => {
    try {
        console.log("inside handleFetchRun");
        props.onClick();
        // TODO: figure out from @mlandauro what endpoint to use, and what format to pass request in
        {console.log("card is sending a response")}
        const response = await axios.post('http://localhost:5000/fetchRun', {QueryResultWithParams: {id}});
        
        {/*setTreeResponse(response.data.result);*/}
    } catch (error) {
        console.error('Error sending response: ', error);
    }
    return;
    }
    
    return (
        <button className="wrapper" style={{backgroundColor: props.isSelected ? '#FFB26B' : '#D9D9D9'}} onClick={props.onClick} >
            <div className="top-section">
                <div className="title">
                    {props.model}
                </div>
                <div className="date">
                    <p>{props.date}</p>
                </div>
            </div>

            <div className="middleItemGroup">
                <div className="item">
                    <p>F1:&nbsp;</p><p>{props.f1}</p>
                </div>
                <div className="item">
                    <p>Run ID:&nbsp;</p><p>{props.run_ID}</p>
                </div>
                
            </div>
        
        </button>
    )
}

export default PreviousRunCard