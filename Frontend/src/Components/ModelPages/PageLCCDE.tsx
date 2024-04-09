import React, {useState} from 'react'
import axios from 'axios'

function PageLCCDE(props : any) {
    /*Props:
    dataset: int # which dataset user selected
    */
    // usage -> props.dataset
    const[lccdeRequest, setLccdeRequest] = useState('');
    const[lccdeResponse, setLccdeResponse] = useState('');

    const sendLCCDEParams = async () => {
        try {
            const data = props.dataset;
            const response = await axios.put('http://localhost:5000/runLccde', {code: lccdeRequest});

            setLccdeResponse(response.data);
            console.log("setLCCDE");
            console.log(response);
        } catch (error) {
            console.error('Error sending response: ', error);
        }
    }

    return(
        // TODO: split up params into individual entries (buttons, dropdowns, etc.)
        <div>
            <h1>RUN LCCDE</h1>
            <div className="testSection">
                <textarea value={lccdeRequest} onChange={(e) =>
                setLccdeRequest(e.target.value)}/>
                <button className="runbt" onClick={sendLCCDEParams}>Run LCCDE</button>
                </div>
            <div>Result: {lccdeResponse}</div>
        </div>
    )
}

export default PageLCCDE