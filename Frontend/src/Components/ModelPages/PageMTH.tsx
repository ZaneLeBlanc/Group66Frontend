import {useState} from 'react'
import axios from 'axios'

function PageMTH(props : any) {
    /*Props:
    dataset: int # which dataset user selected
    */
    // usage -> props.dataset
    const [mthResponse, setMthResponse] = useState('');
    const[trainingAllocation, setTrainingAllocation] = useState('');
    const[maxFeatures, setMaxFeatures] = useState('');
    const[hpoMaxEvals, setHpoMaxEvals] = useState('');

    const sendMTHParams = async () => {
        try {
            const mthRequest = generateJSON();
            const response = await axios.put('http://localhost:5000/runMth', {code: mthRequest});

            setMthResponse(response.data);
        } catch (error) {
            console.error('Error sending response: ', error);
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
                    Training Allocation:
                <input type="text" className='paraminput' value={trainingAllocation} onChange={(e) => setTrainingAllocation(e.target.value)} />
                </label>
                <label>
                    Max Features:
                    <input type="text" className='paraminput' value={maxFeatures} onChange={(e) => setMaxFeatures(e.target.value)} />
                </label>
                <label>
                    Hpo Max. Evals:
                    <input type="text" className='paraminput' value={hpoMaxEvals} onChange={(e) => setHpoMaxEvals(e.target.value)} />
                </label>
            </div>
            <div className="results">
                <button className="runbt" type="submit" onClick={sendMTHParams}>Run MTH</button>
                <div>Result: {mthResponse}</div>
            </div>
        </div>
    )
}

export default PageMTH