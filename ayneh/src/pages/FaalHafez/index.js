import React from "react"
import { GetFaal, GetEstekhare } from "../../network/poem"
// import AudioPlayer from "../../components/AudioPlayer"
import Back from "../../assets/icons/back.svg"
import "./styles.scss"
const PoemResult = (props) => {
    const [ result, setResult ] = React.useState()
    const [ pageTitle, setTitle ] = React.useState()
    React.useEffect(() => {
        props.setLoading(true)
        if ( props.pageType === "hafez"){
            setTitle("فال")
            getFaalHafez()
        } else if ( props.pageType === "tavasol"){
            setTitle("نتیجه")
            getEstekhare()
        }
    },[])
    const getFaalHafez = () => {
        GetFaal().then((res) => {
            // console.log(res.data);
            setResult(res.data)
        }).catch((e) => {
            console.log(e);
        }).finally(() => {
            props.setLoading(false)
        })
    }
    const getEstekhare = () => {
        GetEstekhare().then((res) => {
            // console.log(res.data);
            setResult(res.data)
        }).catch((e) => {
            console.log(e);
        }).finally(() => {
            props.setLoading(false)
        })
    }
    return(
        <div className="faalContainer">
            <div className="header">
                <div className="back" onClick={() => props.history.goBack()}>
                    <img src={Back} alt="back" className="backIcon" />
                </div>
                <p className="pageTitle">{pageTitle}</p>
            </div>
            <div className={`${props.pageType.toString()} main`}>
                { result && props.pageType === "hafez" &&
                    <>
                        <h6 className="faalTitle">{result.title}</h6>
                        {result.text.replace(/\n\n/g,"\n").split('\n').map((hemistich, index) => 
                            <p className={index % 2 ? "even hemistich bodyText" : "hemistich odd bodyText"} key={"hemistich"+index}>{hemistich}</p>
                        )}
                        <h6 className="faalInterpretationTitle">تعبیر غزل</h6>
                        <p className="faalInterpretation bodyText">{result.interpretation}</p>
                        {/* <AudioPlayer src={result.link} /> */}
                    </>
                }
                { result && props.pageType === "tavasol" &&
                    <>
                        <h6 className="faalTitle">{`سوره ${result.soreh} آیه ${result.ayeh} صفحه ${result.page} :`}</h6>
                        {result.text.replace(/\n\n/g,"\n").split('\n').map((hemistich, index) => 
                            <p className={"hemistich bodyText"} key={"hemistich"+index}>{hemistich}</p>
                        )}
                        <h6 className="faalInterpretationTitle">نتیجه استخاره</h6>
                        <p className="faalInterpretation bodyText">
                            {
                                `نتیجه استخاره: ${result.result} ،
                                نتیجه ازدواج: ${result.marriage_res}،
                                نتیجه معامله: ${result.business_res}`
                            }
                        </p>
                        {/* <AudioPlayer src={result.sound} /> */}
                    </>
                }
            </div>
        </div>
    )
}
export default PoemResult;