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
  const [selectedDataset, setSelectedDataset] = useState('dataset1');

  const handlePageClick = (page: string) => {
    setPage(page);
    setSelectedPage(page);
  }

  const handleDatasetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          Dataset 1
          <input
            type="radio"
            name="dataset"
            value="dataset1"
            checked={selectedDataset === 'dataset1'} // check if selectedDataset is 'dataset1'
            onChange={handleDatasetChange}
          />
        </label>
        <label>
          Dataset 2
          <input
            type="radio"
            name="dataset"
            value="dataset2"
            checked={selectedDataset === 'dataset2'}
            onChange={handleDatasetChange}
          />
        </label>
      </div>
    </div>
  );
};

export default Sidebar