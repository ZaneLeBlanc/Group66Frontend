import './CSS/PreviousRunCard.css'

function PreviousRunCard(props: any) {
    {/*Props:
    isSelected: boolean   #this makes it orange or grey background
    model: string         #e.g. "LCCDE"
    f1: string            #e.g. ".98387"  (not sure how much precision we want)
    run_ID: string        #e.g. "0001"
    date: string          #e.g. "3/18/2024 @12:04pm"
    */}

    return (
        <button className="wrapper" style={{backgroundColor: props.isSelected ? '#FFB26B' : '#D9D9D9'}} onClick={props.onClick} >
            <div className="top-section">
                <div className="title">
                    {props.model}
                </div>
                <div className="date">
                    <p>{props.date}</p>
                </div>
            </div>

            <div className="middleItemGroup">
                <div className="item">
                    <p>F1:&nbsp;</p><p>{props.f1}</p>
                </div>
                <div className="item">
                    <p>Run ID:&nbsp;</p><p>{props.run_ID}</p>
                </div>
                
            </div>
        
        </button>
    )
}

export default PreviousRunCard