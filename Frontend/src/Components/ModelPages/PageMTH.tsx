import {useState, useEffect} from 'react'
import axios from 'axios'
import Result from '../Result.tsx'
import '../CSS/Model.css'
import {ring2} from 'ldrs'


function PageMTH(props : any) {
    /*Props:
    dataset: int # which dataset user selected
    */
    // usage -> props.dataset
    //const [cluster, setCluster] = useState(props.cluster || '');
    //const [batchSize, setBatchSize] = useState(props.batchSize || '');
    const [trainingAllocation, setTrainingAllocation] = useState(props.trainingAllocation || '');
    const [maxFeatures, setMaxFeatures] = useState(props.maxFeatures || '');
    const [hpoMaxEvals, setHpoMaxEvals] = useState(props.hpoMaxEvals || '');

    //permanent parameter placeholder (used on previous runs)
    //const[clusterPrev] = useState(props.clusterPrev || '');
    //const[batchSizePrev] = useState(props.batchSizePrev || '');
    const[trainingAllocationPrev] = useState(props.trainingAllocationPrev || '');
    const[maxFeaturesPrev] = useState(props.maxFeaturesPrev || '');
    const[hpoMaxEvalsPrev] = useState(props.hpoMaxEvalsPrev || '');
    


    const [resultData, setResultData] = useState<{
        execution_time: string;
        accuracy: string;
        precision: string;
        recall: string;
        f1: string;
        heatmap: string;
    }>(props.result); 

    const [isLoading, setIsLoading] = useState(false);
    ring2.register()

    const exportParams = (/*cluster:any, batchSize:any, */trainingAllocation:any, maxFeatures:any, hpoMaxEvals:any) => {
        if (props.sendDataToParent)
            {
                props.sendDataToParent(/*cluster, batchSize,*/ trainingAllocation, maxFeatures, hpoMaxEvals)
            }
    }
    useEffect(() => {
        exportParams(/*cluster, batchSize,*/ trainingAllocation, maxFeatures, hpoMaxEvals);
    }, 
    [/*cluster, batchSize,*/ trainingAllocation, maxFeatures, hpoMaxEvals])
    

    const sendMTHParams = async () => {
        try {
            setIsLoading(true)
            const mthRequest = generateJSON();
            const response = await axios.put('http://localhost:5000/runMth', {code: mthRequest});
            
            const objResponse = JSON.parse(response.data)
            setResultData(objResponse.model_results);
            setIsLoading(false)
        } catch (error) {
            console.error('Error sending response: ', error);
            setIsLoading(false)
        }
    }

    // creates request for MTH model
    const generateJSON = () => {
        return JSON.stringify({
            model_req: {
                dataset_path: props.dataset,
                training_allocation: trainingAllocation,
                max_features: maxFeatures,
                hpo_max_evals: hpoMaxEvals
            }
        })
    }

    return(
        // TODO: split up params into individual entries (buttons, dropdowns, etc.)
        <div className="modelPage">
            <h1>RUN MTH</h1>
            <div className="parameters">
                {/*
                <label>
                <span title="The number of nodes or machines used in a distributed training setup where the model is trained across multiple systems to speed up the process.">
                        Clusters: {clusterPrev}
                    </span>
                <input type="text" className='paraminput' value={cluster} onChange={(e) => setCluster(e.target.value)} />
                </label>
                <label>
                    <span title="The number of data samples processed in one iteration during the model training process. A larger batch size can speed up training but might require more memory.">
                        Batch Size: {batchSizePrev}
                    </span>
                    <input type="text" className='paraminput' value={batchSize} onChange={(e) => setBatchSize(e.target.value)} />
                </label>
                */}
                <label>
                    <span title="The percentage or fraction of your dataset that is assigned to each cluster or node for distributed training.">
                        Training Allocation: {trainingAllocationPrev}
                    </span>
                    <input type="text" className='paraminput' value={trainingAllocation} onChange={(e) => setTrainingAllocation(e.target.value)} />
                </label>
                <label>
                    <span title="The specific input variables  from your dataset that are used to train the  model. Feature selection and engineering processes help determine the most relevant features.">
                        Features: {maxFeaturesPrev}
                    </span>
                    <input type="text" className='paraminput' value={maxFeatures} onChange={(e) => setMaxFeatures(e.target.value)} />
                </label>
                <label>
                    <span title="Sets the maximum number of hyperparameter combinations that will be tested during the hyperparameter optimization process.">
                        HPO Max Evals: {hpoMaxEvalsPrev}
                    </span>
                    <input type="text" className='paraminput' value={hpoMaxEvals} onChange={(e) => setHpoMaxEvals(e.target.value)} />
                </label>

                
            </div>
            {props.runnable ? (<button className="runbt" type="button" onClick={sendMTHParams}>Run MTH</button>)
                : (<></>)}

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
                        showValidator = {false}
                    />
                )}
            </div>
        </div>
    )
}

export default PageMTH