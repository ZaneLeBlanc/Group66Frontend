{/* To Start Frontend:
1) navigate a terminal to the 'Group66Frontend\frontend' directory
2) npm i
3) npm run dev
click on the localhost link and it will open up in browser*/}

import './Components/CSS/App.css'
import {Link, Route, BrowserRouter, Routes} from 'react-router-dom';
import Test from './Components/Test.tsx';
import PreviousRuns from './Components/PreviousRuns.tsx';

function App() {
  {/* App itself */}
  return (
    <>
      <BrowserRouter>
        <header className="header">
                  <h1>ML Intrusion Detection Tool</h1>
                  <div className="items">
                      <Link to="/Test" className="header-link">Test</Link>
                      <Link to="/PreviousRuns" className="header-link">Previous Runs</Link>
                  </div>
        </header>

        <Routes>
          <Route path="/Test" element={<Test />} />
          <Route path="/PreviousRuns" element={<PreviousRuns />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
