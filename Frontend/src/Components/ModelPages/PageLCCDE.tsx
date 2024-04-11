import React, {useState} from 'react'
import axios from 'axios'

function PageLCCDE(props : any) {
    /*Props:
    dataset: int # which dataset user selected
    */
    // usage -> props.dataset
    const[lccdeResponse, setLccdeResponse] = useState('');
    const[nEstimators, setEstimators] = useState('');
    const[maxDepth, setMaxDepth] = useState('');
    const[learningRate, setLearningRate] = useState('');
    const[numIterations, setNumIterations] = useState('');
    const[numLeaves, setNumLeaves] = useState('');
    const[boostingType, setBoostingType] = useState('');

    const sendLCCDEParams = async () => {
        try {
            const lccdeRequest = generateJSON();
            const response = await axios.put('http://localhost:5000/runLccde', {code: lccdeRequest});

            setLccdeResponse(response.data);
            console.log("setLCCDE");
            console.log(response);
        } catch (error) {
            console.error('Error sending response: ', error);
        }
    }

    // n_estimators, max_depth,  and learning_rate are re-used.. perhaps one input for all?
    const generateJSON = () => {
        return {
            model_req: {
                dataset_name: props.dataset,
                XGB: {
                    n_estimators: {nEstimators},
                    max_depth: {maxDepth},
                    learning_rate: {learningRate}
                },
                LightGBM: {
                    num_iterations: {numIterations},
                    max_depth: {maxDepth},
                    learning_rate: {learningRate},
                    num_leaves: {numLeaves},
                    boosting_type: {boostingType}
                },
                CatBoost: {
                    n_estimators: {nEstimators},
                    max_depth: {maxDepth},
                    learning_rate: {learningRate}
                }
            }
        }
    }

    return(
        // TODO: change input types (buttons, dropdowns, etc.)
        <div>
            <h1>RUN LCCDE</h1>
            <div className="testSection">
                <label>
                Parameter 1:
                <input type="text" className='paraminput' value={nEstimators} onChange={(e) => setEstimators(e.target.value)} />
                </label>
                <label>
                    Parameter 2:
                    <input type="text" className='paraminput' value={maxDepth} onChange={(e) => setMaxDepth(e.target.value)} />
                </label>
                <label>
                    Parameter 3:
                    <input type="text" className='paraminput' value={learningRate} onChange={(e) => setLearningRate(e.target.value)} />
                </label>
                <label>
                    Parameter 4:
                    <input type="text" className='paraminput' value={numIterations} onChange={(e) => setNumIterations(e.target.value)} />
                </label>
                <label>
                    Parameter 5:
                    <input type="text" className='paraminput' value={numLeaves} onChange={(e) => setNumLeaves(e.target.value)} />
                </label>
                <label>
                    Parameter 6:
                    <input type="text" className='paraminput' value={boostingType} onChange={(e) => setBoostingType(e.target.value)} />
                </label>
                <button className="runbt" onClick={sendLCCDEParams}>Run LCCDE</button>
            </div>
            <div>Result: {lccdeResponse}</div>
        </div>
    )
}

export default PageLCCDE