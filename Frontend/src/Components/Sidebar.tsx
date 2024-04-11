import { useState } from 'react'
import './CSS/Test.css'

// sidebar menu for selecting a model and data set
const Sidebar = ({
  setPage,
  setDataset,
}: {
  setPage: (page: string) => void;
  setDataset: (dataset: string) => void;
}) => {
  
  const[selectedPage, setSelectedPage] = useState('');

  const handlePageClick = (page: string) => {
    setPage(page);
    setSelectedPage(page);
  }

  return (
    <div className="sidebar">
      <button className={selectedPage === 'page1' ? 'selected' : ''}
        onClick={() => handlePageClick('page1')}>LCCDE</button>
      <button className={selectedPage === 'page2' ? 'selected' : ''}
        onClick={() => handlePageClick('page2')}>MTH</button>
      <button className={selectedPage === 'page3' ? 'selected' : ''}
        onClick={() => handlePageClick('page3')}>Tree-Based</button>
      <div className="datasetSelection">
        <strong> Dataset Selection </strong>
        <div className="longLine"></div> {/* Line */}
        <label>
          Dataset 1
          <input
            type="radio"
            name="dataset"
            value="dataset1"
            onChange={(e) => setDataset(e.target.value)}
          />
        </label>
        <label>
          Dataset 2
          <input
            type="radio"
            name="dataset"
            value="dataset2"
            onChange={(e) => setDataset(e.target.value)}
          />
        </label>
      </div>
    </div>
  );
};

export default Sidebar