import {useState, useEffect} from 'react'
import axios from 'axios'
import Result from '../Result'
import '../CSS/Model.css'
import {ring2} from 'ldrs'

function PageLCCDE(props : any) {
    /*Props:
    dataset: int # which dataset user selected
    */
    // usage -> props.dataset

    const[nEstimators, setEstimators] = useState(props.nEstimators || "");
    const[maxDepth, setMaxDepth] = useState(props.maxDepth || "");
    const[learningRate, setLearningRate] = useState(props.learningRate || "");
    const[numIterations, setNumIterations] = useState(props.numIterations || "");
    const[numLeaves, setNumLeaves] = useState(props.numLeaves || "");
    const[boostingType, setBoostingType] = useState(props.boostingType || "");
    const[isLoading, setIsLoading] = useState(false);

    const [resultData, setResultData] = useState<{
        execution_time: string;
        accuracy: string;
        precision: string;
        recall: string;
        f1_score: string;
        heatmap: string;
    }>(props.result); 

    ring2.register() 

    //useEffect, when any of the variables change send to parent, 
    //this is so parameters can be used to make a new run in comparison mode
    const exportParams = (nEstimators:any, maxDepth:any, learningRate:any, numIterations:any, numLeaves:any, boostingType:any) => {
        if (props.sendDataToParent)
            {
                props.sendDataToParent(nEstimators, maxDepth, learningRate, numIterations, numLeaves, boostingType)
            }
    }
    useEffect(() => {
        exportParams(nEstimators, maxDepth, learningRate, numIterations, numLeaves, boostingType);
    }, 
    [nEstimators, maxDepth, learningRate, numIterations, numLeaves, boostingType])
    
    

    const sendLCCDEParams = async () => {
        try {
            //Turn loading spinner on temporarily
            setIsLoading(true)

            const lccdeRequest = generateJSON();
            const response = await axios.put('http://localhost:5000/runLccde', { code: lccdeRequest });

            const objResponse = JSON.parse(response.data)
            setResultData(objResponse.model_results);
            console.log(response);

            //turn off loading spinner
            setIsLoading(false)

        } catch (error) {
            console.error('Error sending response: ', error);
            setIsLoading(false)
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
        <div className="modelPage">
            <h1>RUN LCCDE</h1>
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
                    # Iterations:
                    <input type="text" className='paraminput' value={numIterations} onChange={(e) => setNumIterations(e.target.value)} />
                </label>
                <label>
                    # Leaves:
                    <input type="text" className='paraminput' value={numLeaves} onChange={(e) => setNumLeaves(e.target.value)} />
                </label>
                <label>
                    Boosting Type:
                    <input type="text" className='paraminput' value={boostingType} onChange={(e) => setBoostingType(e.target.value)} />
                </label>
                {props.runnable ? (<button className="runbt" type="button" onClick={sendLCCDEParams}>Run LCCDE</button>)
                : (<></>)}
                
            </div>
            <div className="testSection">
                {/*show loading spinner if loading */}
                {isLoading ? (<l-ring-2
                    size="40"
                    stroke="5"
                    stroke-length="0.25"
                    bg-opacity="0.1"
                    speed="0.8" 
                    color="black" 
                    ></l-ring-2>) 
                : (<></>)}
                {resultData && (
                <Result 
                    execution_time={resultData.execution_time} 
                    accuracy={resultData.accuracy}
                    precision={resultData.precision}
                    recall={resultData.recall}
                    f1_score={resultData.f1_score}
                    heatmap={resultData.heatmap} //needs to be converted here to an img
                />
            )}
            </div>
            
        </div>
    )
}

export default PageLCCDE