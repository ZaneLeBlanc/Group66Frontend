import {useState} from 'react'
import axios from 'axios'

function PageLCCDE() {
    const[lccdeRequest, setLccdeRequest] = useState('');
    const[lccdeResponse, setLccdeResponse] = useState('');

    const sendLCCDEParams = async () => {
        try {
            const response = await axios.post('http://localhost:5000/runlccde', {
                "model_req": {
                  "dataset_name": "",
                  "XGB": {
                    "n_estimators": "",
                    "max_depth": "",
                    "learning_rate": ""
                  },
                  "LightGBM": {
                    "num_iterations": "",
                    "max_depth": "",
                    "learning_rate": "",
                    "num_leaves": "",
                    "boosting_type": ""
                  },
                  "CatBoost": {
                    "n_estimators": "",
                    "max_depth": "",
                    "learning_rate": ""
                  }
                }
              });

            setLccdeResponse(response.data);
            console.log("setLCCDE");
            console.log(response);
        } catch (error) {
            console.error('Error sending response: ', error);
        }
    }

    return(
        // TODO: split up params into individual entries (buttons, dropdowns, etc.)
        <div>
            <h1>RUN LCCDE</h1>
            <div className="testSection">
                <textarea value={lccdeRequest} onChange={(e) =>
                setLccdeRequest(e.target.value)}/>
                <button className="runbt" onClick={sendLCCDEParams}>Run LCCDE</button>
                </div>
            <div>Result: {lccdeResponse}</div>
        </div>
    )
}

export default PageLCCDE