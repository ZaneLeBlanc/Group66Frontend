import { useState } from "react"
// not sure if I want to put my styling in App.css or index.css @ZaneLeBlanc what do
import './CSS/App.css'
import axios from 'axios'
import Sidebar from "./Sidebar";
import PageLCCDE from "./ModelPages/PageLCCDE";
import PageMTH from "./ModelPages/PageMTH";
import PageTree from "./ModelPages/PageTree";

function Test() {

    const[currentPage, setCurrentPage] = useState('page1');

    // controls which page to render (one per model)
    const renderPage = () => {
        switch (currentPage) {
            case 'page1':
                return <PageLCCDE />;
            case 'page2':
                return <PageMTH />;
            case 'page3':
                return <PageTree />;
            default:
                return null;
        }
    };

    return (
        <div>
            <Sidebar setPage={setCurrentPage} />
            <div>{renderPage()}</div>
        </div>
    )
}

export default Test