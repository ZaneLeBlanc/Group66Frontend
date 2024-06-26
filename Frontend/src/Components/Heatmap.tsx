// Heatmap.tsx
import { HeatMapGrid } from 'react-grid-heatmap';

function Heatmap (props: any) {
    /*Props:
    dataset: JSON thing # confusion matrix 
    */
    // usage -> props.datase

    const xLabels = ['0', '1', '2', '3', '4', '5', '6']
    const yLabels = ['0', '1', '2', '3', '4', '5', '6']
    return (
        <div>
        <h2>Confusion Matrix Heatmap</h2>
        <HeatMapGrid
            data={props.dataset}
            xLabels={xLabels}
            yLabels={yLabels}
            cellHeight='2rem'
            cellRender={(x, y, value) => <div title={`Pos(${x}, ${y}) = ${value}`} style={{ background: `rgba(100, 170, ${value * 255}, ${value})`, padding: '5px' }}>{value}</div>}
            xLabelsStyle={(index) => ({
                color: index % 2 ? 'transparent' : '#777',
                fontSize: '.8rem'
            })}
            yLabelsStyle={() => ({
                fontSize: '.7rem',
                textTransform: 'uppercase',
                color: '#777'
            })}
            cellStyle={(_x, _y, ratio) => ({
                background: `rgb(12, 160, 44, ${ratio})`,
                fontSize: '.8rem',
                color: `rgb(0, 0, 0, ${ratio / 2 + 0.4})`
            })}
        />
        </div>
    );
};

export default Heatmap