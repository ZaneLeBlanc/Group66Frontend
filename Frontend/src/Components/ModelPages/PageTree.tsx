import {useState} from 'react'
import axios from 'axios'
import Result from '../Result'
import '../CSS/Model.css'
import { relativeTimeRounding } from 'moment';
import {ring2} from 'ldrs'

function PageTree(props : any) {
    /*Props:
    dataset: int # which dataset user selected
    */
    // usage -> props.dataset
    const [treeRequest, setTreeRequest] = useState('and everywhere');
    const [treeResponse, setTreeResponse] = useState('');
    const[xgbEstimators, setXgbEstimators] = useState('');
    const[etEstimators, setEtEstimators] = useState('');
    const[rtEstimators, setRtEstimators] = useState('');
    const[xgbMaxDepth, setXgbMaxDepth] = useState('');
    const[dtMaxDepth, setDtMaxDepth] = useState('');
    const[rtMaxDepth, setRtMaxDepth] = useState('');
    const[etMaxDepth, setEtMaxDepth] = useState('');
    const[dtMinSample, setDtMinSample] = useState('');
    const[rtMinSample, setRtMinSample] = useState('');
    const[etMinSample, setEtMinSample] = useState('');
    const[learningRate, setLearningRate] = useState('');
    const[numIterations, setNumIterations] = useState('');
    const [splitter, setSplitter] = useState('best');
    const [criterion, setCriterion] = useState('gini');

    const [resultData, setResultData] = useState<{
        execution_time: string;
        accuracy: string;
        precision: string;
        recall: string;
        f1: string;
        heatmap: string;
    }>();

    const[isLoading, setIsLoading] = useState(false);
    ring2.register()

    const sendTreeParams = async () => {
        try {
            setIsLoading(true)
            const treeRequest = generateJSON();
            const response = await axios.put('http://localhost:5000/runTree', { code: treeRequest });

            const objResponse = JSON.parse(response.data)
            setResultData(objResponse.model_results);

            setIsLoading(false)
        } catch (error) {
            console.error('Error sending response: ', error);
            setIsLoading(false)
        }
    }

    // creates request for Tree model
    const generateJSON = () => {
        return JSON.stringify({
            model_req: {
                dataset_path: props.dataset,
                XGB: {
                    n_estimators: xgbEstimators,
                    max_depth: xgbMaxDepth,
                    learning_rate: learningRate
                },
                DTree: {
                    max_depth: dtMaxDepth,
                    min_samples_split: learningRate,
                    splitter: splitter,
                },
                RTree: {
                    n_estimators: rtEstimators,
                    max_depth: rtMaxDepth,
                    min_samples_split: rtMinSample
                },
                ETree: {
                    n_estimators: etEstimators,
                    max_depth: etMaxDepth,
                    min_samples_split: etMinSample
                }
            }
        })
    }

    return(
        // TODO: split up params into individual entries (buttons, dropdowns, etc.)
        <div className="modelPage">
            <h1>RUN TREE-BASED</h1>
            <div className="parameters">
                <div>XGBoost</div>
                <label>
                <span title="The number of decision trees or boosting rounds used in the model. More estimators generally lead to better performance but may increase training time.">
                        # Estimators:
                    </span>
                <input type="text" className='paraminput' value={xgbEstimators} onChange={(e) => setXgbEstimators(e.target.value)} />
                </label>
                <label>
                    <span title="The maximum depth allowed for each decision tree in the model. Controls model complexity: deeper trees can model more complex interactions, but are prone to overfitting.">
                        Max Depth:
                    </span>
                    <input type="text" className='paraminput' value={xgbMaxDepth} onChange={(e) => setXgbMaxDepth(e.target.value)} />
                </label>
                <label>
                    <span title="A scaling factor applied to each new tree or boosting round. A lower learning rate slows down training, potentially requiring more estimators, but can improve accuracy and reduce overfitting.">
                        Learning Rate:
                    </span>
                    <input type="text" className='paraminput' value={learningRate} onChange={(e) => setLearningRate(e.target.value)} />
                </label>

                <div className="algorithms">Decision Tree</div>
                <label>
                    <span title="The maximum depth allowed for each decision tree in the model. Controls model complexity: deeper trees can model more complex interactions, but are prone to overfitting.">
                        Max Depth:
                    </span>
                <input type="text" className='paraminput' value={dtMaxDepth} onChange={(e) => setDtMaxDepth(e.target.value)} />
                </label>
                <label>
                    <span title="The minimum number of samples required to split an internal node.">
                        Min Samples:
                    </span>
                    <input type="text" className='paraminput' value={dtMinSample} onChange={(e) => setDtMinSample(e.target.value)} />
                </label>
                <label>
                    <span title="The strategy used to choose the split at each node. Supported strategies are “best” to choose the best split and “random” to choose the best random split.">
                        Splitter:
                    </span>
                    <div className="radio-group"> 
                        <label className="radio-container">
                            <input type="radio" name="splitter" value="best" checked={splitter === 'best'} onChange={(e) => setSplitter(e.target.value)} />
                            <span className="checkmark"></span> 
                            Best
                        </label>

                        <label className="radio-container">
                            <input type="radio" name="splitter" value="random" checked={splitter === 'random'} onChange={(e) => setSplitter(e.target.value)} />                
                            <span className="checkmark"></span> 
                            Random
                        </label>
                     </div>  
                </label>

                <div className="algorithms">Random Trees</div>
                <label>
                    <span title="The number of decision trees or boosting rounds used in the model. More estimators generally lead to better performance but may increase training time.">
                        # Estimators:
                    </span>
                <input type="text" className='paraminput' value={rtEstimators} onChange={(e) => setRtEstimators(e.target.value)} />
                </label>
                <label>
                    <span title="The maximum depth allowed for each decision tree in the model. Controls model complexity: deeper trees can model more complex interactions, but are prone to overfitting.">
                        Max Depth:
                    </span>
                    <input type="text" className='paraminput' value={rtMaxDepth} onChange={(e) => setRtMaxDepth(e.target.value)} />
                </label>
                <label>
                    <span title="The minimum number of samples required to split an internal node">
                        Min Samples:
                    </span>
                    <input type="text" className='paraminput' value={rtMinSample} onChange={(e) => setRtMinSample(e.target.value)} />
                </label>

                <div className="algorithms">Extra Tree</div>
                <label>
                <span title="The number of decision trees or boosting rounds used in the model. More estimators generally lead to better performance but may increase training time.">
                        # Estimators:
                    </span>
                <input type="text" className='paraminput' value={etEstimators} onChange={(e) => setEtEstimators(e.target.value)} />
                </label>
                <label>
                    <span title="The maximum depth allowed for each decision tree in the model. Controls model complexity: deeper trees can model more complex interactions, but are prone to overfitting.">
                        Max Depth:
                    </span>
                    <input type="text" className='paraminput' value={etMaxDepth} onChange={(e) => setEtMaxDepth(e.target.value)} />
                </label>
                <label>
                    <span title="The minimum number of samples required to split an internal node">
                        Min Samples:
                    </span>
                    <input type="text" className='paraminput' value={etMinSample} onChange={(e) => setEtMinSample(e.target.value)} />
                </label>

                <div className="algorithms"></div>
                <label>
                    <span title="The function to measure the quality of a split">
                        Tree Criterion
                    </span>
                    <div className="radio-group"> 
                        <label className="radio-container">
                            <input type="radio" name="criterion" value="gini" checked={criterion === 'gini'} onChange={(e) => setCriterion(e.target.value)} />
                            <span className="checkmark"></span> 
                            Gini
                        </label>
                        <label className="radio-container">
                            <input type="radio" name="criterion" value="entropy" checked={criterion === 'entropy'} onChange={(e) => setCriterion(e.target.value)} />                
                            <span className="checkmark"></span> 
                            Entropy
                        </label>
                        <label className="radio-container">
                            <input type="radio" name="criterion" value="logloss" checked={criterion === 'logloss'} onChange={(e) => setCriterion(e.target.value)} />                
                            <span className="checkmark"></span> 
                            LogLoss
                        </label>
                     </div>  
                    
                </label>
            </div>
            <div className="results">
                <button className="runbt" type="submit" onClick={sendTreeParams}>Run Tree</button>
            </div>
            <div className="results">
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
                        f1_score={resultData.f1}
                        heatmap={resultData.heatmap} 
                    />
                )}
            </div>
            </div>
    )
}

export default PageTree