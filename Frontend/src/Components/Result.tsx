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

    const stringToHtml = {__html:props.heatmap};
    const HeatMapComponent = () => {
        return <div dangerouslySetInnerHTML={stringToHtml} />
    }

    return (
        <>
        <header>
            Result
        </header>
        <div className="resultItems">
            {props.id && <p className="textItem">ID: {props.id}</p>} 
            <p className="textItem">Execution Time: {props.execution_time}</p>
            <p className="textItem">Accuracy: {props.accuracy}</p>
            <p className="textItem">Precision: {props.precision}</p>
            <p className="textItem">Recall: {props.recall}</p>
            <p className="textItem">F1-Score: {props.f1_score}</p>
            {/* Is this how to return component? */}
            <HeatMapComponent /> 
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