import React from "react"
import "./styles.scss"
import { useDispatch } from "react-redux"
import { UserData } from "../../actions/index"
import Logo from "../../assets/images/logo.png"
import { VerificationUser } from "../../network/user"
import LocalStorageService from "../../network/localstorageService"
const Onboarding = (props) => {
    // console.log(props);
    const appMode = props.match.params.mode;
    const dispatch = useDispatch()
    const phone = props.location.state.phone
    const [ code, setCode ] = React.useState()
    React.useEffect(() => {
        if ( LocalStorageService.getToken() != null ){
            props.history.replace("/"+appMode+"/main")
        }
    },[])
    const verify = () => {
        props.setLoading(true)
        const body = {
            phone: phone,
            otp: code
        }
        VerificationUser(body).then((res) => {
            console.log(res.data);
            LocalStorageService.setToken(res.data.token)
            dispatch(UserData(res.data.user))
            props.history.replace("/"+appMode+"/main")
        }).catch((e) =>{
            console.log(e.response ? e.response.data : e)
        }).finally(() => {
            props.setLoading(false)
        })
    }
    return(
        <div className={"onboardingContainer light"}>
           <img className="logo" src={Logo} alt="logo" />
            <input
                type={"phone"}
                className="input"
                value={code}
                placeholder={"کد تایید"}
                onChange={(event) => {setCode(event.target.value)}} />
            <button className="loginBtn" onClick={() => verify()}>تایید</button>
            <div className="paginationContainer">
                <span className="dot light"></span>
                <span className="dot dark"></span>
            </div>
        </div>
    )
}
export default Onboarding;