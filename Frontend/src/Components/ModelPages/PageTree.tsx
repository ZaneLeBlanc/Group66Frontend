import {useState} from 'react'
import axios from 'axios'

function PageTree() {
    const [treeRequest, setTreeRequest] = useState('and everywhere');
    const [treeResponse, setTreeResponse] = useState('');

    const sendTreeParams = async () => {
        try {
            const response = await axios.post('http://localhost:5000/runTree', {code: treeRequest});

            setTreeResponse(response.data.result);
        } catch (error) {
            console.error('Error sending response: ', error);
        }
    }

    return(
        <div>
            <h1>RUN TREE-BASED</h1>
            <div className="testSection">
                <textarea value={treeRequest} onChange={(e) =>
                setTreeRequest(e.target.value)}/>
                <button className="runbt" onClick={sendTreeParams}>Run Tree-Based</button>
            </div>
            <div>Result: {treeResponse}</div>
        </div>
    )
}

export default PageTree