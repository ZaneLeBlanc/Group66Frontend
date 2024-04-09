
// sidebar menu for selecting a model and data set
const Sidebar = ({
  setPage,
  setDataset,
}: {
  setPage: (page: string) => void;
  setDataset: (dataset: string) => void;
}) => {
  return (
    <div>
      <button onClick={() => setPage('page1')}>LCCDE</button>
      <button onClick={() => setPage('page2')}>MTH</button>
      <button onClick={() => setPage('page3')}>Tree-Based</button>
      <div>
        <select onChange={(e) => setDataset(e.target.value)}>
          {/* TODO: Change dataset names */}
          <option value="dataset1">Dataset 1</option>
          <option value="dataset2">Dataset 2</option>
        </select>
      </div>
    </div>
  );
};

export default Sidebar