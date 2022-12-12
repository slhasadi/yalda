import React from "react"
import "./styles.scss"
import Back from "../../assets/icons/back.svg"
import { GetContestDetail, GetContestResult } from "../../network/cns"
const ContestInnerPgae = (props) => {
    const constestId = props.match.params.id
    const [ detail, setDetail ] = React.useState()
    const [ modalVisibility , setVisible ] = React.useState(false)
    const [ contestRes, setContestRes ] = React.useState();
    React.useEffect(() => {
        getContestDetail()
    },[])
    const getContestDetail = () => {
        props.setLoading(true)
        GetContestDetail(constestId).then((res) => {
            // console.log(JSON.parse(res.data.questions));
            setDetail(res.data)
        }).catch((e) => {
            console.error(e);
        }).finally(() => {
            props.setLoading(false);
        })
    }
    const onSubmitHandler = (e) => {
        let answers = {}
        e.preventDefault()
        var formData = new FormData(document.getElementById("form"))
        for ( var pair of formData.entries()){
            answers[parseInt(pair[0])] = parseInt(pair[1])
        }
        for (let i = 0; i < JSON.parse(detail.questions).length; i++) {
            const element = i+1;
            // console.log(element);
            if(!(element in answers)){
                answers[element] = 0
            }
        }
        let finalAnswers = []
        for (const key in answers) {
            finalAnswers.push(answers[key])
        }
        const body = {
            id: constestId,
            answers: finalAnswers
        }
        props.setLoading(true)
        GetContestResult(body).then((res) => {
            console.log(res.data);
            setContestRes(res.data)
            setVisible(true)
        }).catch((e) => {
            console.error(e);
        }).finally(() => {
            props.setLoading(false)
        })
    }
    const getRes = () => {
        let result;
        for (let i = 0; i < detail.contest_result.length; i++) {
            const res = detail.contest_result[i];
            if ( contestRes.score >= res.min && contestRes.score < res.max ){
                result = res
            }
        }
        return result;
    }
    return(
        <div className="constestInnerContainer">
            <div className="header">
                <div className="back" onClick={() => props.history.goBack()}>
                    <img src={Back} alt="back" className="backIcon" />
                </div>
                {detail && <p className="pageTitle">{detail.title}</p>}
            </div>
            <div className="main noPadding">
                <form id={"form"} onSubmit={(e) => onSubmitHandler(e)}>
                    {detail && JSON.parse(detail.questions).map((que, i) => 
                        <div className="questionBox" key={que.title+i}>
                            <h6>{`سوال ${i + 1}`}</h6>
                            <p className="questionTitle">{que.title}</p>
                            { que.options.map((option,j) => 
                                <div key={option.score + "-" + j}>
                                    <input type="radio" id={option.score + "-" + j + "-" + i} name={(i+1)} defaultValue={option.score} />
                                    <label className="optionLabel" htmlFor={option.score + "-" + j + "-" + i} >{option.title}</label>
                                </div>
                            )}
                        </div>
                    )}
                    <button className="submitBtn" type={"submit"}>مشاهده نتایج</button>
                </form>
            </div>
            { modalVisibility && 
                <div className="resultContainer">
                    <div className="header">
                        <div className="back" onClick={() => setVisible(false)}>
                            <img src={Back} alt="back" className="backIcon" />
                        </div>
                    </div>
                    <div className="main">
                        <div className="scoreBtn">
                            <span>{"امتیاز شما: "}</span>
                            <span>{contestRes.score}</span>
                        </div>
                        <div className="descContainer">
                            <h5 className="title">{getRes().title}</h5>
                            <p className="desc">{getRes().description}</p>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
export default ContestInnerPgae;