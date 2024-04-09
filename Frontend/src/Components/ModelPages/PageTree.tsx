import {useState} from 'react'
import axios from 'axios'

function PageTree(props : any) {
    /*Props:
    dataset: int # which dataset user selected
    */
    // usage -> props.dataset
    const [treeRequest, setTreeRequest] = useState('and everywhere');
    const [treeResponse, setTreeResponse] = useState('');

    const sendTreeParams = async () => {
        try {
            const data = props.dataset;
            const response = await axios.put('http://localhost:5000/runTree', {code: treeRequest});

            setTreeResponse(response.data);
        } catch (error) {
            console.error('Error sending response: ', error);
        }
    }

    return(
        // TODO: split up params into individual entries (buttons, dropdowns, etc.)
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