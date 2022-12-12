import React from "react"
import "./styles.scss"
import Back from "../../assets/icons/back.svg"
import { GetDreamDetails } from "../../network/cnt"
import ReactSafeHtml  from "react-safe-html"
const DreamDetailsPage = (props) => {
    const dreamId = props.match.params.id
    const [ dream, setDream ] = React.useState()
    React.useEffect(() => {
        props.setLoading(true)
        GetDreamDetails(dreamId).then((res) => {
            console.log(res.data);
            setDream(res.data)
        }).catch((e) => {
            console.error(e);
        }).finally(() => {
            props.setLoading(false)
        })
    },[])
    return(
        <div className="dreamDetailPageContainer">
            <div className="header">
                <div className="back" onClick={() => props.history.goBack()}>
                    <img src={Back} alt="back" className="backIcon" />
                </div>
                <p className="pageTitle">{"تعبیر خواب"}</p>
            </div>
            <div className="main noPadding">
                { dream &&
                    <> 
                        <h4 className="title">{dream.subject}</h4>
                        <div className="desc">
                            {
                                dream.description.replace(/<p>/g,"\n").split('\n').map((line,i) =>
                                // <p key={"line-"+i}>{line}</p>
                                <ReactSafeHtml key={"line-"+i} html={line} />
                                )}
                        </div>
                    </>
                }
            </div>
        </div>
    )
}
export default DreamDetailsPage;