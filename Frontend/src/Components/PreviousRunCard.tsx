import './CSS/PreviousRunCard.css'

function PreviousRunCard(props: any) {
    {/*Props:
    isSelected: boolean   #this makes it orange or grey background
    model: string         #e.g. "LCCDE"
    f1: string            #e.g. ".98387"  (not sure how much precision we want)
    exTime: string        #e.g. "0m 21s"
    date: string          #e.g. "3/18/2024 @12:04pm"
    */}

    const backgroundColor = props.isSelected ? '#FFB26B' : 'D9D9D9';
    
    return (
        <div className="wrapper" style={{backgroundColor}}>
            <div className="title">
                {props.model}
            </div>

            <div className="middleItemGroup">
                <div className="item">
                    <p className="bolded">F1-SCORE:&nbsp;</p><p>{props.f1}</p>
                </div>
                <div className="item">
                    <p className="bolded">Execution Time:&nbsp;</p><p>{props.exTime}</p>
                </div>
                <div className="item">
                    <p className="bolded">Date:&nbsp;</p><p>{props.date}</p>
                </div>
            </div>
        
        </div>
    )
}

export default PreviousRunCard