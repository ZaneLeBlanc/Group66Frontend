import {useState} from 'react'
import axios from 'axios'

function PageMTH() {
    const [mthRequest, setMthRequest] = useState('and here');
    const [mthResponse, setMthResponse] = useState('');

    const sendMTHParams = async () => {
        try {
            const response = await axios.post('http://localhost:5000/runMth', {code: mthRequest});

            setMthResponse(response.data.result);
        } catch (error) {
            console.error('Error sending response: ', error);
        }
    }

    return(
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