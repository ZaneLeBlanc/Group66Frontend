import {useState} from 'react'
import axios from 'axios'
import Result from '../Result'

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
                <label>
                    Param1:
                <input type="text" className='paraminput' value={nEstimators} onChange={(e) => setEstimators(e.target.value)} />
                </label>
                <label>
                    Param2:
                    <input type="text" className='paraminput' value={learningRate} onChange={(e) => setLearningRate(e.target.value)} />
                </label>
                <label>
                    Param3:
                    <input type="text" className='paraminput' value={numIterations} onChange={(e) => setNumIterations(e.target.value)} />
                </label>
                <button className="runbt" type="submit" onClick={sendTreeParams}>Run Tree</button>
            </div>
           <div>Result: </div>
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