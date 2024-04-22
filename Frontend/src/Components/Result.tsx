import './CSS/Result.css'

function Result(props: {
    id?: string;
    execution_time: string; 
    accuracy: string;  
    precision: string; 
    recall: string;    
    f1_score: string;
    heatmap: string; 
}) {
    return (
        <>
        <header>
            Result
        </header>
        <div className="resultItems">
            {props.id && <p className="textItem">ID: {props.id}</p>}
            <p className="textItem">Execution Time: {parseFloat(props.execution_time).toFixed(5)}, % diff: {(Math.abs(parseFloat(props.execution_time) - 0.99813)/.99813*100).toFixed(3)}</p>
            <p className="textItem">Accuracy: {parseFloat(props.accuracy).toFixed(5)}</p>
            <p className="textItem">Precision: {parseFloat(props.precision).toFixed(5)}</p>
            <p className="textItem">Recall: {parseFloat(props.recall).toFixed(5)}</p>
            <p className="textItem">F1-Score: {parseFloat(props.f1_score).toFixed(5)}</p>
            <img src={props.heatmap} alt="Heatmap" /> 
        </div>

        <header>
            Percent Difference
        </header>
        <div className="resultItems">
            <p className="textItem">Execution Time: {(Math.abs(parseFloat(props.execution_time) - 168.9)/parseFloat(props.execution_time)*100).toFixed(3)}%</p>
            <p className="textItem">Accuracy: {(Math.abs(parseFloat(props.accuracy) - 0.99813)/parseFloat(props.accuracy)*100).toFixed(3)}%</p>
            <p className="textItem">Precision: {(Math.abs(parseFloat(props.precision) - 0.99814)/parseFloat(props.precision)*100).toFixed(3)}%</p>
            <p className="textItem">Recall: {(Math.abs(parseFloat(props.recall) - 0.99913)/parseFloat(props.recall)*100).toFixed(3)}%</p>
            <p className="textItem">F1-Score: {(Math.abs(parseFloat(props.f1_score) - 0.99811)/parseFloat(props.f1_score)*100).toFixed(3)}%</p>
        </div>
        </>
    )
}

/* function Result(props: any) {
    
    
    return (
        <>
        <header>
            Result
        </header>
        <div className="resultItems">
        <p className="textItem"> ID: {props.id}</p>

        <p className="textItem">Execution Time: </p>
        <p className="textItem">Accuracy: </p>
        <p className="textItem">Precision: </p>
        <p className="textItem">Recall: </p>
        <p className="textItem">F1-Score: </p>
        <div>Heatmap go here</div>
        </div>
        
        </>
    )
} */

export default Result