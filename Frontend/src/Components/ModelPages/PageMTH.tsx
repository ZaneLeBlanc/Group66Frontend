import {useState} from 'react'
import axios from 'axios'

function PageMTH(props : any) {
    /*Props:
    dataset: int # which dataset user selected
    */
    // usage -> props.dataset
    const [mthRequest, setMthRequest] = useState('and here');
    const [mthResponse, setMthResponse] = useState('');
    const[nEstimators, setEstimators] = useState('');
    const[maxDepth, setMaxDepth] = useState('');
    const[learningRate, setLearningRate] = useState('');
    const[numIterations, setNumIterations] = useState('');
    const[numLeaves, setNumLeaves] = useState('');
    const[boostingType, setBoostingType] = useState('');

    const sendMTHParams = async () => {
        try {
            const data = props.dataset;
            const response = await axios.put('http://localhost:5000/runMth', {code: mthRequest});

            setMthResponse(response.data);
        } catch (error) {
            console.error('Error sending response: ', error);
        }
    }

    return(
        // TODO: split up params into individual entries (buttons, dropdowns, etc.)
        <div>
            <h1>RUN MTH</h1>
            <form onSubmit={sendMTHParams}>
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
                    <button className="runbt" type="submit">Run MTH</button>
                </div>
            </form>
            <div>Result: {mthResponse}</div>
        </div>
    )
}

export default PageMTH