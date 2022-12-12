import React from "react"
import "./styles.scss"
import Back from "../../assets/icons/back.svg"
import { GetContestList } from "../../network/cns"
import { Link } from 'react-router-dom'
const ContestListPage = (props) => {
    const appMode = props.match.params.mode;
    const [ contestList, setContest ] = React.useState([])
    React.useEffect(() => {
        props.setLoading(true)
        getContestList()
    },[])
    const getContestList = () => {
        GetContestList().then((res) => {
            // console.log(res.data);
            setContest(res.data)
        }).catch((e) => {
            console.error(e);
        }).finally(() => {
            props.setLoading(false)
        })
    }
    return(
        <div className="contestContainer">
            <div className="header">
                <div className="back" onClick={() => props.history.goBack()}>
                    <img src={Back} alt="back" className="backIcon" />
                </div>
                <p className="pageTitle">{"سفر به درون"}</p>
            </div>
            <div className="main">
                { contestList.map((con, index) =>
                    <Link to={"/"+appMode+`/contest/${con.id}`} key={con.id+"-"+index} className="item">
                        <h5 className="title">{con.title}</h5>
                    </Link>
                )}
            </div>
        </div>
    )
}
export default ContestListPage