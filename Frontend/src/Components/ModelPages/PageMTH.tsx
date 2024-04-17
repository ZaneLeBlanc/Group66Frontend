import {useState} from 'react'
import axios from 'axios'
import Result from '../Result.tsx'
import '../CSS/Model.css'

function PageMTH(props : any) {
    /*Props:
    dataset: int # which dataset user selected
    */
    // usage -> props.dataset
    const [mthRequest, setMthRequest] = useState('and here');
    const [mthResponse, setMthResponse] = useState('');
    const [cluster, setCluster] = useState('');
    const [batchSize, setBatchSize] = useState('');
    const [trainingAllocation, setTrainingAllocation] = useState('');
    const [features, setFeatures] = useState('');
    const [evals, setEvals] = useState('');
    const [resultData, setResultData] = useState<{
        execution_time: string;
        accuracy: string;
        precision: string;
        recall: string;
        f1_score: string;
        heatmap: string;
    }>(); 

    const sendMTHParams = async () => {
        try {
            const data = props.dataset;
            const response = await axios.put('http://localhost:5000/runMth', {code: mthRequest});

            setMthResponse(response.data);
            setResultData(response.data.model_results);
        } catch (error) {
            console.error('Error sending response: ', error);
        }
    }

    return(
        // TODO: split up params into individual entries (buttons, dropdowns, etc.)
        <div>
            <h1>RUN MTH</h1>
            <div className="testSection">
                <label>
                <span data-title="The number of nodes or machines used in a distributed training setup where the model is trained across multiple systems to speed up the process.">
                        Clusters:
                    </span>
                <input type="text" className='paraminput' value={cluster} onChange={(e) => setCluster(e.target.value)} />
                </label>
                <label>
                    <span data-title="The number of data samples processed in one iteration during the model training process. A larger batch size can speed up training but might require more memory.">
                        Batch Size:
                    </span>
                    <input type="text" className='paraminput' value={batchSize} onChange={(e) => setBatchSize(e.target.value)} />
                </label>
                <label>
                    <span data-title="The percentage or fraction of your dataset that is assigned to each cluster or node for distributed training.">
                        Training Allocation:
                    </span>
                    <input type="text" className='paraminput' value={trainingAllocation} onChange={(e) => setTrainingAllocation(e.target.value)} />
                </label>
                <label>
                    <span data-title="The specific input variables  from your dataset that are used to train the  model. Feature selection and engineering processes help determine the most relevant features.">
                        Features:
                    </span>
                    <input type="text" className='paraminput' value={features} onChange={(e) => setFeatures(e.target.value)} />
                </label>
                <label>
                    <span data-title="Sets the maximum number of hyperparameter combinations that will be tested during the hyperparameter optimization process.">
                        HPO Max Evals:
                    </span>
                    <input type="text" className='paraminput' value={evals} onChange={(e) => setEvals(e.target.value)} />
                </label>
                <button className="runbt" type="submit" onClick={sendMTHParams}>Run MTH</button>
            </div>
            <div className="testSection">Result:</div>
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

export default PageMTH