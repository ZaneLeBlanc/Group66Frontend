import './CSS/Result.css'

function Result(props: any) {
    
    
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
}

export default Result