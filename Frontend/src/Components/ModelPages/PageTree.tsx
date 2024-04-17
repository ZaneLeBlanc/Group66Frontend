import {useState} from 'react'
import axios from 'axios'
import {ring2} from 'ldrs'
import Result from '../Result'

function PageTree(props : any) {
    /*Props:
    dataset: int # which dataset user selected
    */
    // usage -> props.dataset
    // const [treeRequest, setTreeRequest] = useState();
    const[nEstimators, setEstimators] = useState('');
    const[maxDepth, setMaxDepth] = useState('');
    const[learningRate, setLearningRate] = useState('');
    const[minSamples, setMinSamples] = useState('')
    const[splitter, setSplitter] = useState('')

    const [resultData, setResultData] = useState<{
        execution_time: string;
        accuracy: string;
        precision: string;
        recall: string;
        f1: string;
        heatmap: string;
    }>(props.result); 

    const[isLoading, setIsLoading] = useState(false);
    // const[numIterations, setNumIterations] = useState('');
    // const[numLeaves, setNumLeaves] = useState('');
    // const[boostingType, setBoostingType] = useState('');

    ring2.register() 

    const sendTreeParams = async () => {
        try {
            setIsLoading(true)
            const treeRequest = generateJSON();
            const response = await axios.put('http://localhost:5000/runTree', { code: treeRequest });

            const objResponse = JSON.parse(response.data)
            setResultData(objResponse.model_results);
            console.log(response);

            setIsLoading(false)
        } catch (error) {
            console.error('Error sending response: ', error);
            setIsLoading(false)
        }
    }
    //nEstimators, maxDepth, learningRate, minSamples, splitter
    const generateJSON = () => {
        return JSON.stringify({
            model_req: {
                dataset_path: "CICIDS2017_sample.csv",
                XGB: {
                    n_estimators: nEstimators,
                    max_depth: maxDepth,
                    learning_rate: learningRate
                },
                DTree: {
                    max_depth: maxDepth,
                    min_samples_split: minSamples,
                    splitter: splitter
                },
                RTree: {
                    n_estimators: nEstimators, 
                    max_depth: maxDepth,
                    min_samples_split: minSamples
                },
                ETree: { 
                    n_estimators: nEstimators,
                    max_depth: maxDepth,
                    min_samples_split: minSamples
            }
            }
        })
    }

    //nEstimators, maxDepth, learningRate, minSamples, splitter
    return(
        // TODO: split up params into individual entries (buttons, dropdowns, etc.)
        <div className="modelPage">
            <h1>RUN TREE-BASED</h1>
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
                    Min Samples:
                    <input type="text" className='paraminput' value={minSamples} onChange={(e) => setMinSamples(e.target.value)} />
                </label>
                <label>
                    Splitter:
                    <input type="text" className='paraminput' value={splitter} onChange={(e) => setSplitter(e.target.value)} />
                </label>
                <button className="runbt" type="submit" onClick={sendTreeParams}>Run Tree</button>
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
                        f1_score={resultData.f1}
                        heatmap={resultData.heatmap} //needs to be converted here to an img
                    />
                )}
                </div>
                
            </div>
    )
}

export default PageTree