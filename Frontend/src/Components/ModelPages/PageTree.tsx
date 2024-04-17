import {useState} from 'react'
import axios from 'axios'
import Result from '../Result'
import '../CSS/Model.css'

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
    const [splitter, setSplitter] = useState('best');
    const [criterion, setCriterion] = useState('gini');

    const [resultData, setResultData] = useState<{
        execution_time: string;
        accuracy: string;
        precision: string;
        recall: string;
        f1_score: string;
        heatmap: string;
    }>(); 
    const sendTreeParams = async () => {
        try {
            const data = props.dataset;
            const response = await axios.put('http://localhost:5000/runTree', {code: treeRequest});

            setTreeResponse(response.data);
            setResultData(response.data.model_results);
        } catch (error) {
            console.error('Error sending response: ', error);
        }
    }

    return(
        // TODO: split up params into individual entries (buttons, dropdowns, etc.)
        <div>
            <h1>RUN TREE-BASED</h1>
            <div className="testSection">
                <div>XGBoost</div>
                <label>
                <span data-title="The number of decision trees or boosting rounds used in the model. More estimators generally lead to better performance but may increase training time.">
                        # Estimators:
                    </span>
                <input type="text" className='paraminput' value={nEstimators} onChange={(e) => setEstimators(e.target.value)} />
                </label>
                <label>
                    <span data-title="The maximum depth allowed for each decision tree in the model. Controls model complexity: deeper trees can model more complex interactions, but are prone to overfitting.">
                        Max Depth:
                    </span>
                    <input type="text" className='paraminput' value={learningRate} onChange={(e) => setLearningRate(e.target.value)} />
                </label>
                <label>
                    <span data-title="A scaling factor applied to each new tree or boosting round. A lower learning rate slows down training, potentially requiring more estimators, but can improve accuracy and reduce overfitting.">
                        Learning Rate:
                    </span>
                    <input type="text" className='paraminput' value={numIterations} onChange={(e) => setNumIterations(e.target.value)} />
                </label>

                <div className="algorithms">Decision Tree</div>
                <label>
                    <span data-title="The maximum depth allowed for each decision tree in the model. Controls model complexity: deeper trees can model more complex interactions, but are prone to overfitting.">
                        Max Depth:
                    </span>
                <input type="text" className='paraminput' value={nEstimators} onChange={(e) => setEstimators(e.target.value)} />
                </label>
                <label>
                    <span data-title="The minimum number of samples required to split an internal node.">
                        Min Samples:
                    </span>
                    <input type="text" className='paraminput' value={learningRate} onChange={(e) => setLearningRate(e.target.value)} />
                </label>
                <label>
                    <span data-title="The strategy used to choose the split at each node. Supported strategies are “best” to choose the best split and “random” to choose the best random split.">
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
                    <span data-title="The number of decision trees or boosting rounds used in the model. More estimators generally lead to better performance but may increase training time.">
                        # Estimators:
                    </span>
                <input type="text" className='paraminput' value={nEstimators} onChange={(e) => setEstimators(e.target.value)} />
                </label>
                <label>
                    <span data-title="The maximum depth allowed for each decision tree in the model. Controls model complexity: deeper trees can model more complex interactions, but are prone to overfitting.">
                        Max Depth:
                    </span>
                    <input type="text" className='paraminput' value={learningRate} onChange={(e) => setLearningRate(e.target.value)} />
                </label>
                <label>
                    <span data-title="The minimum number of samples required to split an internal node">
                        Min Samples:
                    </span>
                    <input type="text" className='paraminput' value={numIterations} onChange={(e) => setNumIterations(e.target.value)} />
                </label>

                <div className="algorithms">Extra Tree</div>
                <label>
                <span data-title="The number of decision trees or boosting rounds used in the model. More estimators generally lead to better performance but may increase training time.">
                        # Estimators:
                    </span>
                <input type="text" className='paraminput' value={nEstimators} onChange={(e) => setEstimators(e.target.value)} />
                </label>
                <label>
                    <span data-title="The maximum depth allowed for each decision tree in the model. Controls model complexity: deeper trees can model more complex interactions, but are prone to overfitting.">
                        Max Depth:
                    </span>
                    <input type="text" className='paraminput' value={learningRate} onChange={(e) => setLearningRate(e.target.value)} />
                </label>
                <label>
                    <span data-title="The minimum number of samples required to split an internal node">
                        Min Samples:
                    </span>
                    <input type="text" className='paraminput' value={numIterations} onChange={(e) => setNumIterations(e.target.value)} />
                </label>

                <div className="algorithms"></div>
                <label>
                    <span data-title="The function to measure the quality of a split">
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
                <button className="runbt" type="submit" onClick={sendTreeParams}>Run Tree</button>
            </div>

           <div className="testSection">Result: </div>
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
    )
}

export default PageTree