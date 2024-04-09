import {useState} from 'react'
import axios from 'axios'

function PageMTH(props : any) {
    /*Props:
    dataset: int # which dataset user selected
    */
    // usage -> props.dataset
    const [mthRequest, setMthRequest] = useState('and here');
    const [mthResponse, setMthResponse] = useState('');

    const sendMTHParams = async () => {
        try {
            const data = props.dataset;
            const response = await axios.put('http://localhost:5000/runMth', {code: mthRequest});

            setMthResponse(response.data);
        } catch (error) {
            console.error('Error sending response: ', error);
        }
    }

    return(
        // TODO: split up params into individual entries (buttons, dropdowns, etc.)
        <div>
            <h1>RUN MTH</h1>
            <div className="testSection">
                <textarea value={mthRequest} onChange={(e) =>
                setMthRequest(e.target.value)}/>
                <button className="runbt" onClick={sendMTHParams}>Run MTH</button>
            </div>
            <div>Result: {mthResponse}</div>
        </div>
    )
}

export default PageMTH