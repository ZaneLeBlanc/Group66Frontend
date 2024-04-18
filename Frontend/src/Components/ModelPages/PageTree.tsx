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
    const[numLeaves, setNumLeaves] = useState('');
    const[minSamplesSplit, setMinSamplesSplit] = useState('');
    const[splitter, setSplitter] = useState('');

    const sendTreeParams = async () => {
        try {
            const treeRequest = generateJSON();
            const response = await axios.put('http://localhost:5000/runTree', {code: treeRequest});

            setTreeResponse(response.data);
        } catch (error) {
            console.error('Error sending response: ', error);
        }
    }

    // creates request for Tree model
    const generateJSON = () => {
        return JSON.stringify({
            model_req: {
                dataset_path: props.dataset,
                XGB: {
                    n_estimators: nEstimators,
                    max_depth: maxDepth,
                    learning_rate: learningRate
                },
                DTree: {
                    max_depth: maxDepth,
                    min_samples_split: learningRate,
                    splitter: numLeaves,
                },
                RTree: {
                    n_estimators: nEstimators,
                    max_depth: maxDepth,
                    min_samples_split: learningRate
                },
                VTree: {
                    n_estimators: nEstimators,
                    max_depth: maxDepth,
                    min_samples_split: learningRate
                }
            }
        })
    }

    return(
        // TODO: split up params into individual entries (buttons, dropdowns, etc.)
        <div className="modelPage">
            <h1>RUN TREE-BASED</h1>
            <div className="parameters">
                <label>
                    # Estimators:
                <input type="text" className='paraminput' value={nEstimators} onChange={(e) => setEstimators(e.target.value)} />
                </label>
                <label>
                    Max Depth:
                    <input type="text" className='paraminput' value={maxDepth} onChange={(e) => setMaxDepth(e.target.value)} />
                </label>
                <label>
                    Learning Rate:
                    <input type="text" className='paraminput' value={learningRate} onChange={(e) => setLearningRate(e.target.value)} />
                </label>
                <label>
                    Min. Samples Split:
                    <input type="text" className='paraminput' value={minSamplesSplit} onChange={(e) => setMinSamplesSplit(e.target.value)} />
                </label>
                <label>
                    Splitter:
                    <input type="text" className='paraminput' value={splitter} onChange={(e) => setSplitter(e.target.value)} />
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