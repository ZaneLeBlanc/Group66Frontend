import {useState} from 'react'
import axios from 'axios'
import Result from '../Result.tsx'
import '../CSS/Model.css'
import {ring2} from 'ldrs'


function PageMTH(props : any) {
    /*Props:
    dataset: int # which dataset user selected
    */
    // usage -> props.dataset
    const [cluster, setCluster] = useState('');
    const [batchSize, setBatchSize] = useState('');
    const [trainingAllocation, setTrainingAllocation] = useState('');
    const [maxFeatures, setMaxFeatures] = useState('');
    const [hpoMaxEvals, setHpoMaxEvals] = useState('');
    const [resultData, setResultData] = useState<{
        execution_time: string;
        accuracy: string;
        precision: string;
        recall: string;
        f1: string;
        heatmap: string;
    }>(); 

    const [isLoading, setIsLoading] = useState(false);

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
                <label>
                <span title="The number of nodes or machines used in a distributed training setup where the model is trained across multiple systems to speed up the process.">
                        Clusters:
                    </span>
                <input type="text" className='paraminput' value={cluster} onChange={(e) => setCluster(e.target.value)} />
                </label>
                <label>
                    <span title="The number of data samples processed in one iteration during the model training process. A larger batch size can speed up training but might require more memory.">
                        Batch Size:
                    </span>
                    <input type="text" className='paraminput' value={batchSize} onChange={(e) => setBatchSize(e.target.value)} />
                </label>
                <label>
                    <span title="The percentage or fraction of your dataset that is assigned to each cluster or node for distributed training.">
                        Training Allocation:
                    </span>
                    <input type="text" className='paraminput' value={trainingAllocation} onChange={(e) => setTrainingAllocation(e.target.value)} />
                </label>
                <label>
                    <span title="The specific input variables  from your dataset that are used to train the  model. Feature selection and engineering processes help determine the most relevant features.">
                        Features:
                    </span>
                    <input type="text" className='paraminput' value={maxFeatures} onChange={(e) => setMaxFeatures(e.target.value)} />
                </label>
                <label>
                    <span title="Sets the maximum number of hyperparameter combinations that will be tested during the hyperparameter optimization process.">
                        HPO Max Evals:
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
                    />
                )}
            </div>
        </div>
    )
}

export default PageMTH