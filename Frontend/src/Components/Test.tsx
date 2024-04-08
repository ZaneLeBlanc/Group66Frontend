import { useState } from "react"
// not sure if I want to put my styling in App.css or index.css @ZaneLeBlanc what do
import './CSS/App.css'
import axios from 'axios'

function Test() {

    const [lccdeRequest, setLccdeRequest] = useState('put some params here');
    const [lccdeResponse, setLccdeResponse] = useState('');
    const [mthRequest, setMthRequest] = useState('and here');
    const [mthResponse, setMthResponse] = useState('');
    const [treeRequest, setTreeRequest] = useState('and everywhere');
    const [treeResponse, setTreeResponse] = useState('');


    const sendLCCDEParams = async () => {
        try {
            
            const response = await axios.post('http://localhost:5000/runlccde', {
                "model_req": {
                  "dataset_name": "",
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
              });

            setLccdeResponse(response.data);
            console.log("setLCCDE");
            console.log(response);
        } catch (error) {
            console.error('Error sending response: ', error);
        }
    }

    const sendMTHParams = async () => {
        try {
            const response = await axios.post('http://localhost:5000/runMth', {code: mthRequest});

            setMthResponse(response.data.result);
        } catch (error) {
            console.error('Error sending response: ', error);
        }
    }

    const sendTreeParams = async () => {
        try {
            const response = await axios.post('http://localhost:5000/runTree', {code: treeRequest});

            setTreeResponse(response.data.result);
        } catch (error) {
            console.error('Error sending response: ', error);
        }
    }

    return (
        // TODO: 1 split up params into individual entries (buttons, dropdowns, etc.)
        // TODO: 2 split these up into pages
        // for now, the user will enter comma delimited parameters and hit send per model
        <>
            <h1>TEST PAGE</h1>
            <div className="testSection">
                <textarea value={lccdeRequest} onChange={(e) =>
                setLccdeRequest(e.target.value)}/>
                <button className="runbt" onClick={sendLCCDEParams}>Run LCCDE</button>
            </div>
            <div>Result: {lccdeResponse}</div>

            <div className="testSection">
                <textarea value={mthRequest} onChange={(e) =>
                setMthRequest(e.target.value)}/>
                <button className="runbt" onClick={sendMTHParams}>Run MTH</button>
            </div>
            <div>Result: {mthResponse}</div>
            
            <div className="testSection">
                <textarea value={treeRequest} onChange={(e) =>
                setTreeRequest(e.target.value)}/>
                <button className="runbt" onClick={sendTreeParams}>Run Tree-Based</button>
            </div>
            <div>Result: {treeResponse}</div>
        </>
    )
}

export default Test