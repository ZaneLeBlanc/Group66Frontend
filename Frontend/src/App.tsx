{/* Zane - instructions to start: (also have Python installed on your machine or this won't work)
1. open 2 terminals, one in /Frontend and one in /Backend
2. in the /Frontend terminal, run 'npm i'
3. in the /Backend terminal, run 'pip install flask' and 'pip install flask-cors'
4. in the /Backend terminal, run 'python test.py' (or whatever the file is named)
5. in the /Frontend terminal, run 'npm run dev'
6. it should run in a new browser tab and you can click the echo button to make sure it works */}


import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';
import LCCDEResult from './Components/LCCDEResult.tsx'
import PreviousRunCard from './Components/PreviousRunCard.tsx';

function App() {
  {/* React variables */}
  const [pythonCode, setPythonCode] = useState('test');
  const [result, setResult] = useState('');

  {/* This function runs whenever the echo button is clicked,
    it sends the user given string to the python server and stores
    the modified string received within 'result' and displays that */}
  const executePythonCode = async () => {
    try {
      const response = await axios.post('http://localhost:5000/lccde', { code: pythonCode });

      setResult(response.data.result);
    } catch (error) {
      console.error('Error executing Python code:', error);
    }
  };

  {/* App itself */}
  return (
    <>
      <header className="header">
        <h1>ML Intrusion Detection Tool</h1>
        <div className="items">
          <h3>Test</h3>
          <h3>Previous Runs</h3>
        </div>
      </header>
        
      <div className="testSection">
        <textarea value={pythonCode} onChange={(e) => setPythonCode(e.target.value)} />
        <button onClick={executePythonCode}>echo to Python code</button>
        <div>Result: {result}</div>
      </div>

    </>
  )
}

export default App
