import {useState} from 'react'
import axios from 'axios'

function PageTree(props : any) {
    /*Props:
    dataset: int # which dataset user selected
    */
    // usage -> props.dataset
    const [treeRequest, setTreeRequest] = useState('and everywhere');
    const [treeResponse, setTreeResponse] = useState('');
    const[nEstimators, setEstimators] = useState('');
    const[maxDepth, setMaxDepth] = useState('');
    const[learningRate, setLearningRate] = useState('');
    const[numIterations, setNumIterations] = useState('');
    const[numLeaves, setNumLeaves] = useState('');
    const[boostingType, setBoostingType] = useState('');

    const sendTreeParams = async () => {
        try {
            const data = props.dataset;
            const response = await axios.put('http://localhost:5000/runTree', {code: treeRequest});

            setTreeResponse(response.data);
        } catch (error) {
            console.error('Error sending response: ', error);
        }
    }

    // create json generator function
    // send following for tree 
    // {
    //     "model_req": {
    //         "dataset_path": "",
    //         "XGB": {
    //       "n_estimators": 100,
    //       "max_depth": 6,
    //       "learning_rate": 0.3
    //     },
    //     "DTree": {
    //       "max_depth": null,
    //       "min_samples_split": 2,
    //       "splitter": "best"
    //     },
    //     "RTree": {
    //       "n_estimators": 100, 
    //       "max_depth": null,
    //       "min_samples_split": 2
    //     },
    //     "ETree": { 
    //       "n_estimators": 100,
    //       "max_depth": null,
    //       "min_samples_split": 2
    //     }
    //     }
    // }

    return(
        // TODO: split up params into individual entries (buttons, dropdowns, etc.)
        <div className="modelPage">
            <h1>RUN TREE-BASED</h1>
            <div className="parameters">
                <label>
                    Param1:
                <input type="text" className='paraminput' value={nEstimators} onChange={(e) => setEstimators(e.target.value)} />
                </label>
                <label>
                    Param2:
                    <input type="text" className='paraminput' value={learningRate} onChange={(e) => setLearningRate(e.target.value)} />
                </label>
                <label>
                    Param3:
                    <input type="text" className='paraminput' value={numIterations} onChange={(e) => setNumIterations(e.target.value)} />
                </label>
            </div>
            <div className="results">
                <button className="runbt" type="submit" onClick={sendTreeParams}>Run Tree</button>
                <div>Result: {treeResponse}</div>
            </div>
        </div>
    )
}

export default PageTree