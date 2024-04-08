import React from 'react';

// sidebar menu for selecting a model and data set
const Sidebar = ({ setPage }: { setPage: (page: string) => void }) => {
  return (
    <div>
      <button onClick={() => setPage('page1')}>LCCDE</button>
      <button onClick={() => setPage('page2')}>MTH</button>
      <button onClick={() => setPage('page3')}>Tree-Based</button>
    </div>
  );
};

export default Sidebar