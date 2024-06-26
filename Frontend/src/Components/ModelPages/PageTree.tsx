import {useState, useEffect } from 'react'
import axios from 'axios'
import Result from '../Result'
import '../CSS/Model.css'
//import { relativeTimeRounding } from 'moment';
import {ring2} from 'ldrs'

function PageTree(props : any) {
    /*Props:
    dataset: int # which dataset user selected
    */
    // usage -> props.dataset

    const[xgbEstimators, setXgbEstimators] = useState(props.xgbEstimators || '');
    const[etEstimators, setEtEstimators] = useState(props.etEstimators || '');
    const[rtEstimators, setRtEstimators] = useState(props.rtEstimators || '');
    const[xgbMaxDepth, setXgbMaxDepth] = useState(props.xgbMaxDepth || '');
    const[dtMaxDepth, setDtMaxDepth] = useState(props.dtMaxDepth || '');
    const[rtMaxDepth, setRtMaxDepth] = useState(props.rtMaxDepth || '');
    const[etMaxDepth, setEtMaxDepth] = useState(props.etMaxDepth || '');
    const[dtMinSample, setDtMinSample] = useState(props.dtMinSample || '');
    const[rtMinSample, setRtMinSample] = useState(props.rtMinSample || '');
    const[etMinSample, setEtMinSample] = useState(props.etMinSample || '');
    const[learningRate, setLearningRate] = useState(props.learningRate || '');
    const [splitter, setSplitter] = useState(props.splitter || 'best');

    //permanent parameter placeholder (used on previous runs)
    const[xgbEstimatorsPrev] = useState(props.xgbEstimatorsPrev || '');
    const[etEstimatorsPrev] = useState(props.etEstimatorsPrev || '');
    const[rtEstimatorsPrev] = useState(props.rtEstimatorsPrev || '');
    const[xgbMaxDepthPrev] = useState(props.xgbMaxDepthPrev || '');
    const[dtMaxDepthPrev] = useState(props.dtMaxDepthPrev || '');
    const[rtMaxDepthPrev] = useState(props.rtMaxDepthPrev || '');
    const[etMaxDepthPrev] = useState(props.etMaxDepthPrev || '');
    const[dtMinSamplePrev] = useState(props.dtMinSamplePrev || '');
    const[rtMinSamplePrev] = useState(props.rtMinSamplePrev || '');
    const[etMinSamplePrev] = useState(props.etMinSamplePrev || '');
    const[learningRatePrev] = useState(props.learningRatePrev || '');
    const [splitterPrev] = useState(props.splitterPrev || '');


    const [resultData, setResultData] = useState<{
        execution_time: string;
        accuracy: string;
        precision: string;
        recall: string;
        f1: string;
        heatmap: string;
    }>(props.result);

    const[isLoading, setIsLoading] = useState(false);
    ring2.register()

    //useEffect, when any of the variables change send to parent, 
    //this is so parameters can be used to make a new run in comparison mode
    const exportParams = (xgbEstimators:any, etEstimators:any, rtEstimators:any, xgbMaxDepth:any, dtMaxDepth:any, rtMaxDepth:any, etMaxDepth:any, dtMinSample:any, rtMinSample:any, etMinSample:any, learningRate:any, splitter:any) => {
        if (props.sendDataToParent)
            {
                props.sendDataToParent(xgbEstimators, etEstimators, rtEstimators, xgbMaxDepth, dtMaxDepth, rtMaxDepth, etMaxDepth, dtMinSample, rtMinSample, etMinSample, learningRate, splitter)
            }
    }
    useEffect(() => {
        exportParams(xgbEstimators, etEstimators, rtEstimators, xgbMaxDepth, dtMaxDepth, rtMaxDepth, etMaxDepth, dtMinSample, rtMinSample, etMinSample, learningRate, splitter);
    }, 
    [xgbEstimators, etEstimators, rtEstimators, xgbMaxDepth, dtMaxDepth, rtMaxDepth, etMaxDepth, dtMinSample, rtMinSample, etMinSample, learningRate, splitter])
    
    

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
            <h1>TREE-BASED</h1>
            <div className="parameters">
                <div className="algorithms" id="topAlg">XGBoost</div>
                <label>
                <span title="The number of decision trees or boosting rounds used in the model. More estimators generally lead to better performance but may increase training time.">
                        # Estimators: {xgbEstimatorsPrev}
                    </span>
                <input type="text" className='paraminput' value={xgbEstimators} onChange={(e) => setXgbEstimators(e.target.value)} />
                </label>
                <label>
                    <span title="The maximum depth allowed for each decision tree in the model. Controls model complexity: deeper trees can model more complex interactions, but are prone to overfitting.">
                        Max Depth: {xgbMaxDepthPrev}
                    </span>
                    <input type="text" className='paraminput' value={xgbMaxDepth} onChange={(e) => setXgbMaxDepth(e.target.value)} />
                </label>
                <label>
                    <span title="A scaling factor applied to each new tree or boosting round. A lower learning rate slows down training, potentially requiring more estimators, but can improve accuracy and reduce overfitting.">
                        Learning Rate: {learningRatePrev}
                    </span>
                    <input type="text" className='paraminput' value={learningRate} onChange={(e) => setLearningRate(e.target.value)} />
                </label>

                <div className="algorithms">Decision Tree</div>
                <label>
                    <span title="The maximum depth allowed for each decision tree in the model. Controls model complexity: deeper trees can model more complex interactions, but are prone to overfitting.">
                        Max Depth: {dtMaxDepthPrev}
                    </span>
                <input type="text" className='paraminput' value={dtMaxDepth} onChange={(e) => setDtMaxDepth(e.target.value)} />
                </label>
                <label>
                    <span title="The minimum number of samples required to split an internal node.">
                        Min Samples: {dtMinSamplePrev}
                    </span>
                    <input type="text" className='paraminput' value={dtMinSample} onChange={(e) => setDtMinSample(e.target.value)} />
                </label>
                <label className="splitterLabel">
                    <span title="The strategy used to choose the split at each node. Supported strategies are “best” to choose the best split and “random” to choose the best random split.">
                        Splitter: {splitterPrev}
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
                        # Estimators: {rtEstimatorsPrev}
                    </span>
                <input type="text" className='paraminput' value={rtEstimators} onChange={(e) => setRtEstimators(e.target.value)} />
                </label>
                <label>
                    <span title="The maximum depth allowed for each decision tree in the model. Controls model complexity: deeper trees can model more complex interactions, but are prone to overfitting.">
                        Max Depth: {rtMaxDepthPrev}
                    </span>
                    <input type="text" className='paraminput' value={rtMaxDepth} onChange={(e) => setRtMaxDepth(e.target.value)} />
                </label>
                <label>
                    <span title="The minimum number of samples required to split an internal node">
                        Min Samples: {rtMinSamplePrev}
                    </span>
                    <input type="text" className='paraminput' value={rtMinSample} onChange={(e) => setRtMinSample(e.target.value)} />
                </label>

                <div className="algorithms">Extra Tree</div>
                <label>
                <span title="The number of decision trees or boosting rounds used in the model. More estimators generally lead to better performance but may increase training time.">
                        # Estimators: {etEstimatorsPrev}
                    </span>
                <input type="text" className='paraminput' value={etEstimators} onChange={(e) => setEtEstimators(e.target.value)} />
                </label>
                <label>
                    <span title="The maximum depth allowed for each decision tree in the model. Controls model complexity: deeper trees can model more complex interactions, but are prone to overfitting.">
                        Max Depth: {etMaxDepthPrev}
                    </span>
                    <input type="text" className='paraminput' value={etMaxDepth} onChange={(e) => setEtMaxDepth(e.target.value)} />
                </label>
                <label>
                    <span title="The minimum number of samples required to split an internal node">
                        Min Samples: {etMinSamplePrev}
                    </span>
                    <input type="text" className='paraminput' value={etMinSample} onChange={(e) => setEtMinSample(e.target.value)} />
                </label>

            </div>
            {props.runnable ? (<button className="runbt" type="button" onClick={sendTreeParams}>Run Tree</button>)
                : (<></>)}
            
            <div className="results">
            {/*show loading spinner if loading */}
            {isLoading ? (<div style={{paddingTop: "20px"}}> 
                            <l-ring-2
                            size="40"
                            stroke="5"
                            stroke-length="0.25"
                            bg-opacity="0.1"
                            speed="0.8" 
                            color="black" 
                            ></l-ring-2>
                        </div>) 
                : (<></>)}
            {!isLoading && resultData && (
                    <Result 
                        execution_time={resultData.execution_time} 
                        accuracy={resultData.accuracy}
                        precision={resultData.precision}
                        recall={resultData.recall}
                        f1_score={resultData.f1}
                        heatmap={resultData.heatmap}
                        showValidator = {false}
                    />
                )}
            </div>
            </div>
    )
}

export default PageTree