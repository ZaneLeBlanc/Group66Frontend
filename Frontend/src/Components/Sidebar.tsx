import './CSS/Test.css'

// sidebar menu for selecting a model and data set
const Sidebar = ({
  setPage,
  setDataset,
}: {
  setPage: (page: string) => void;
  setDataset: (dataset: string) => void;
}) => {
  return (
    <div className="sidebar">
      <button onClick={() => setPage('page1')} >LCCDE</button>
      <button onClick={() => setPage('page2')} >MTH</button>
      <button onClick={() => setPage('page3')} >Tree-Based</button>
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