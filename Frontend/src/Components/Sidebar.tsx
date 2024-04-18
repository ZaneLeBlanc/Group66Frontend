import { useState, useEffect } from 'react'
import './CSS/Test.css'

// sidebar menu for selecting a model and data set
const Sidebar = ({
  setPage,
  setDataset,
}: {
  setPage: (page: string) => void;
  setDataset: (dataset: string) => void;
}) => {

  const [selectedPage, setSelectedPage] = useState('page1');
  const [selectedDataset, setSelectedDataset] = useState('CICIDS2017_sample.csv');

  const handlePageClick = (page: string) => {
    setPage(page);
    setSelectedPage(page);
  }

  const handleDatasetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataset(e.target.value);
    setSelectedDataset(e.target.value);
  };

  // got bored
  // sick function to change between the three pages using arrow keys
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          setSelectedPage((prevPage) => {
            const pages = ['page1', 'page2', 'page3'];
            const currentIndex = pages.indexOf(prevPage);
            const nextIndex = (currentIndex - 1 + pages.length) % pages.length;
            setPage(pages[nextIndex]);
            return pages[nextIndex];
          });
          break;
        case 'ArrowDown':
          event.preventDefault();
          setSelectedPage((prevPage) => {
            const pages = ['page1', 'page2', 'page3'];
            const currentIndex = pages.indexOf(prevPage);
            const nextIndex = (currentIndex + 1) % pages.length;
            setPage(pages[nextIndex]);
            return pages[nextIndex];
          });
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setPage]);

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
          CICIDS2017_sample
          <input
            type="radio"
            name="dataset"
            value="CICIDS2017_sample.csv"
            checked={selectedDataset === 'CICIDS2017_sample.csv'} // check if selectedDataset is 'CICIDS2017_sample.csv'
            onChange={handleDatasetChange}
          />
        </label>
        <label>
          CICIDS2017_sample_km
          <input
            type="radio"
            name="dataset"
            value="CICIDS2017_sample_km.csv"
            checked={selectedDataset === 'CICIDS2017_sample_km.csv'} // check if selectedDataset is 'CICIDS2017_sample_km.csv'
            onChange={handleDatasetChange}
          />
        </label>
      </div>
    </div>
  );
};

export default Sidebar