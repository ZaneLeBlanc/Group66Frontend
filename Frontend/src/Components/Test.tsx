import { useState } from "react"
// not sure if I want to put my styling in App.css or index.css @ZaneLeBlanc what do
import './CSS/Test.css'
import Sidebar from "./Sidebar";
import PageLCCDE from "./ModelPages/PageLCCDE";
import PageMTH from "./ModelPages/PageMTH";
import PageTree from "./ModelPages/PageTree";

function Test() {

    const[currentPage, setCurrentPage] = useState('page1');
    const[selectedDataset, setSelectedDataset] = useState('CICIDS2017_sample.csv');

    // controls which page to render (one per model)
    const renderPage = () => {
        switch (currentPage) {
            case 'page1':
                return <PageLCCDE dataset={selectedDataset} runnable={true}/>;
            case 'page2':
                return <PageMTH dataset={selectedDataset} runnable={true}/>;
            case 'page3':
                return <PageTree dataset={selectedDataset} runnable={true}/>;
            default:
                return null;
        }
    };

    return (
        <div className="container">
            <Sidebar setPage={setCurrentPage} setDataset={setSelectedDataset} />
            <div className="modelPageWrapper">{renderPage()}</div>
        </div>
    )
}

export default Test