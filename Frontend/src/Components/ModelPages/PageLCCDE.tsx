import React, {useState} from 'react'
import axios from 'axios'
import Result from '../Result'
import '../CSS/Model.css'

function PageLCCDE(props : any) {
    /*Props:
    dataset: int # which dataset user selected
    */
    // usage -> props.dataset
    const[lccdeResponse, setLccdeResponse] = useState();
    const[nEstimators, setEstimators] = useState('');
    const[maxDepth, setMaxDepth] = useState('');
    const[learningRate, setLearningRate] = useState('');
    const[numIterations, setNumIterations] = useState('');
    const[numLeaves, setNumLeaves] = useState('');
    const[boostingType, setBoostingType] = useState('');
    const [resultData, setResultData] = useState<{
        execution_time: string;
        accuracy: string;
        precision: string;
        recall: string;
        f1_score: string;
        heatmap: string;
    }>(); 
    

    const sendLCCDEParams = async () => {
        try {
            const lccdeRequest = generateJSON();
            const response = await axios.put('http://localhost:5000/runLccde', { code: lccdeRequest });

            setLccdeResponse(response.data);

            setResultData(response.data.model_results);
            console.log("setLCCDE");
            console.log(response);
        } catch (error) {
            console.error('Error sending response: ', error);
        }
    }

    // n_estimators, max_depth,  and learning_rate are re-used.. perhaps one input for all?
    const generateJSON = () => {
        return JSON.stringify({
            model_req: {
                dataset_path: props.dataset,
                XGB: {
                    n_estimators: nEstimators,
                    max_depth: maxDepth,
                    learning_rate: learningRate
                },
                LightGBM: {
                    num_iterations: numIterations,
                    max_depth: maxDepth,
                    learning_rate: learningRate,
                    num_leaves: numLeaves,
                    boosting_type: boostingType
                },
                CatBoost: {
                    n_estimators: nEstimators,
                    max_depth: maxDepth,
                    learning_rate: learningRate
                }
            }
        })
    }

    return(
        // TODO: change input types (buttons, dropdowns, etc.)
        <div>
            <h1>RUN LCCDE</h1>
            <div className="parameters">
                <label>
                    <span data-title="The number of decision trees or boosting rounds used in the model. More estimators generally lead to better performance but may increase training time.">
                        # Estimators:
                    </span>
                    <input type="text" className='paraminput' value={nEstimators} onChange={(e) => setEstimators(e.target.value)} />
                </label>
                <label>
                    <span data-title="The maximum depth allowed for each decision tree in the model. Controls model complexity: deeper trees can model more complex interactions, but are prone to overfitting.">
                        Max depth:
                    </span>
                    <input type="text" className='paraminput' value={maxDepth} onChange={(e) => setMaxDepth(e.target.value)} />
                </label>
                <label>
                    <span data-title="A scaling factor applied to each new tree or boosting round. A lower learning rate slows down training, potentially requiring more estimators, but can improve accuracy and reduce overfitting.">
                        Learning Rate:
                    </span>
                    <input type="text" className='paraminput' value={learningRate} onChange={(e) => setLearningRate(e.target.value)} />
                </label>
                <label>
                    <span data-title="The number of boosting rounds performed.">
                        # Iterations:
                    </span>
                    <input type="text" className='paraminput' value={numIterations} onChange={(e) => setNumIterations(e.target.value)} />
                </label>
                <label>
                     <span data-title="The maximum number of leaves in each decision tree.">
                        # Leaves:
                    </span>
                    <input type="text" className='paraminput' value={numLeaves} onChange={(e) => setNumLeaves(e.target.value)} />
                </label>
                <label>
                    <span data-title="The algorithm used for boosting.">
                        Boosting Type:
                    </span>
                    <input type="text" className='paraminput' value={boostingType} onChange={(e) => setBoostingType(e.target.value)} />
                </label>
            </div>
            <div className="results">
                <button className="runbt" type="button" onClick={sendLCCDEParams}>Run LCCDE</button>
                {resultData && (
                    <Result 
                        execution_time={resultData.execution_time} 
                        accuracy={resultData.accuracy}
                        precision={resultData.precision}
                        recall={resultData.recall}
                        f1_score={resultData.f1_score}
                        heatmap={resultData.heatmap} 
                    />
                )}
            </div>
        </div>
    )
}

export default PageLCCDE