import './CSS/Result.css'
import Heatmap from './Heatmap';
import { useState, useEffect } from 'react'

function Result(props: {
    id?: string;
    execution_time: string; 
    accuracy: string;  
    precision: string; 
    recall: string;    
    f1_score: string;
    heatmap: string;
    showValidator: boolean;
}) {

    // definitely not the best solution
    // TODO: might need to pass numerical values to Heatmap rather than strings
    const [confusionMatrix, setConfusionMatrix] = useState<{
        c00: string;
        c01: string;
        c02: string;
        c03: string;
        c04: string;
        c05: string;
        c06: string;
        c10: string;
        c11: string,
        c12: string,
        c13: string;
        c14: string,
        c15: string,
        c16: string;
        c20: string;
        c21: string;
        c22: string;
        c23: string;
        c24: string;
        c25: string;
        c26: string;
        c30: string;
        c31: string;
        c32: string;
        c33: string;
        c34: string;
        c35: string;
        c36: string;
        c40: string;
        c41: string;
        c42: string;
        c43: string;
        c44: string;
        c45: string;
        c46: string;
        c50: string;
        c51: string;
        c52: string;
        c53: string;
        c54: string;
        c55: string;
        c56: string;
        c60: string;
        c61: string;
        c62: string;
        c63: string;
        c64: string;
        c65: string;
        c66: string;
    }>();

     const parseHeatmap = () => {
        try {
            const objResponse = JSON.parse(props.heatmap)
            setConfusionMatrix(objResponse);
            console.log(confusionMatrix)
        } catch (e) {
            console.error("Error parsing heatmap data:", e);
          }
     }

     useEffect(() => {
        parseHeatmap();
      }, [props.heatmap]);

    return (
        <>
        <header>
            Result
        </header>
        <div className="resultItems">
            {props.id && <p className="textItem">ID: {props.id}</p>}
            <p className="textItem">Execution Time: {parseFloat(props.execution_time).toFixed(5)}</p>
            <p className="textItem">Accuracy: {parseFloat(props.accuracy).toFixed(5)}</p>
            <p className="textItem">Precision: {parseFloat(props.precision).toFixed(5)}</p>
            <p className="textItem">Recall: {parseFloat(props.recall).toFixed(5)}</p>
            <p className="textItem">F1-Score: {parseFloat(props.f1_score).toFixed(5)}</p>
            {confusionMatrix ? (<Heatmap dataset={confusionMatrix} />) : (null)}
        </div>

        {props.showValidator ? (

            <div className="resultItems" >
            <h3>
                Percent Difference
            </h3>
            <p className="textItem">Execution Time: {(Math.abs(parseFloat(props.execution_time) - 168.9)/parseFloat(props.execution_time)*100).toFixed(3)}%</p>
            <p className="textItem">Accuracy: {(Math.abs(parseFloat(props.accuracy) - 0.99813)/parseFloat(props.accuracy)*100).toFixed(3)}%</p>
            <p className="textItem">Precision: {(Math.abs(parseFloat(props.precision) - 0.99814)/parseFloat(props.precision)*100).toFixed(3)}%</p>
            <p className="textItem">Recall: {(Math.abs(parseFloat(props.recall) - 0.99913)/parseFloat(props.recall)*100).toFixed(3)}%</p>
            <p className="textItem">F1-Score: {(Math.abs(parseFloat(props.f1_score) - 0.99811)/parseFloat(props.f1_score)*100).toFixed(3)}%</p>
        </div>
        ) : (<> </>)}
        
        </>
    )
}

export default Result

// <Heatmap dataset={heatmapData}/>