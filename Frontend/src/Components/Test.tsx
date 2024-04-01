import { useState } from "react"
// not sure if I want to put my styling in App.css or index.css @ZaneLeBlanc what do
import './CSS/App.css'
import axios from 'axios'

function Test() {

    // TODO: can we use one set of requests and responses? or does each model have unique req/res
    const [lccdeRequest, setLccdeRequest] = useState('put some params here');
    const [lccdeResponse, setLccdeResponse] = useState('');
    const [mthRequest, setMthRequest] = useState('and here');
    const [mthResponse, setMthResponse] = useState('');
    const [treeRequest, setTreeRequest] = useState('and everywhere');
    const [treeResponse, setTreeResponse] = useState('');

    const sendLCCDEParams = async () => {
        try {
            const response = await axios.put('http://localhost:5000/runLccde', {code: lccdeRequest});

            setLccdeResponse(response.data.result);
        } catch (error) {
            console.error('Error sending response: ', error);
        }
    }

    const sendMTHParams = async () => {
        try {
            const response = await axios.put('http://localhost:5000/runMth', {code: mthRequest});

            setMthResponse(response.data.result);
        } catch (error) {
            console.error('Error sending response: ', error);
        }
    }

    const sendTreeParams = async () => {
        try {
            const response = await axios.put('http://localhost:5000/runTree', {code: treeRequest});

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