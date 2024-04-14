import {useState} from 'react'
import axios from 'axios'

function PageTree(props : any) {
    /*Props:
    dataset: int # which dataset user selected
    */
    // usage -> props.dataset
    // const [treeRequest, setTreeRequest] = useState();
    const [treeResponse, setTreeResponse] = useState();
    const[nEstimators, setEstimators] = useState('');
    const[maxDepth, setMaxDepth] = useState('');
    const[learningRate, setLearningRate] = useState('');
    const[minSamples, setMinSamples] = useState('')
    const[splitter, setSplitter] = useState('')
    // const[numIterations, setNumIterations] = useState('');
    // const[numLeaves, setNumLeaves] = useState('');
    // const[boostingType, setBoostingType] = useState('');

    const sendTreeParams = async () => {
        try {
            const treeRequest = generateJSON();
            const response = await axios.put('http://localhost:5000/runTree', { code: treeRequest });

            setTreeResponse(response.data);
            console.log("setTree");
            console.log(response);
        } catch (error) {
            console.error('Error sending response: ', error);
        }
    }
    //nEstimators, maxDepth, learningRate, minSamples, splitter
    const generateJSON = () => {
        return JSON.stringify({
            model_req: {
                dataset_path: "CICIDS2017_sample.csv",
                XGB: {
                    n_estimators: nEstimators,
                    max_depth: maxDepth,
                    learning_rate: learningRate
                },
                DTree: {
                    max_depth: maxDepth,
                    min_samples_split: minSamples,
                    splitter: splitter
                },
                RTree: {
                    n_estimators: nEstimators, 
                    max_depth: maxDepth,
                    min_samples_split: minSamples
                },
                ETree: { 
                    n_estimators: nEstimators,
                    max_depth: minSamples,
                    min_samples_split: splitter
            }
            }
        })
    }

    //nEstimators, maxDepth, learningRate, minSamples, splitter
    return(
        // TODO: split up params into individual entries (buttons, dropdowns, etc.)
        <div>
            <h1>RUN TREE-BASED</h1>
            <div className="testSection">
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
                    Min Samples:
                    <input type="text" className='paraminput' value={minSamples} onChange={(e) => setMinSamples(e.target.value)} />
                </label>
                <label>
                    Splitter:
                    <input type="text" className='paraminput' value={splitter} onChange={(e) => setSplitter(e.target.value)} />
                </label>
                <button className="runbt" type="submit" onClick={sendTreeParams}>Run Tree</button>
            </div>
            <div>Result: {treeResponse}</div>
        </div>
    )
}

export default PageTree