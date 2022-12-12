import React from "react"
import "./styles.scss"
import Logo from "../../assets/images/logo.png"
import { Link } from "react-router-dom"
import { LoginUser } from "../../network/user"
import LocalStorageService from "../../network/localstorageService"
import { toEnglishNumber } from "../../constants/number"
const Onboarding = (props) => {
    const appMode = props.match.params.mode;
    const [ step, setStep ] = React.useState(1)
    const [ phoneNumber, setPhoneNumber ] = React.useState("")
    React.useEffect(() => {
        if ( LocalStorageService.getToken() != null ){
            props.history.replace("/"+appMode+"/main")
        }
    },[])
    const login = () => {
        props.setLoading(true)
        const body = {
            phone: toEnglishNumber(phoneNumber),
        }
        LoginUser(body).then((res) => {
            console.log(res.data)
            LocalStorageService.setIsNew(res.data.is_new);
            props.history.push("/"+appMode+"verification",{phone: toEnglishNumber(phoneNumber)})
        }).catch((e) => {
            console.log(e.response ? e.response.data : e);
        }).finally(() => {
            props.setLoading(false)
        })
    }
    return(
        <div className={step === 1 ? "onboardingContainer dark" : "onboardingContainer light"}>
            {step === 1 &&
                <> 
                    <img className="logo" src={Logo} alt="logo" />
                    <p className="descBig">آئینه؛ آئین و سبک زندگی خانواده</p>
                    <p className="descSmall">با آئینه بخندیم و گپ بزنیم و شادی خانوادمون رو از آئینه بگیریم.</p>
                    <button className="nextBtn" onClick={() => setStep(2)}>بعدی</button>
                    <div className="paginationContainer">
                        <span className="dot light"></span>
                        <span className="dot dark"></span>
                    </div>
                </>
            }
            { step === 2 &&
                <>
                    <img className="logo" src={Logo} alt="logo" />
                    <input
                        type={"phone"}
                        className="input"
                        value={phoneNumber}
                        placeholder={"شماره تلفن"}
                        onChange={(event) => {setPhoneNumber(event.target.value)}} />
                    <button className="loginBtn" onClick={() => login()}>ورود</button>
                    <Link className="signupLater" to="main">بعدا ثبت نام می کنم</Link>
                    <div className="paginationContainer">
                        <span className="dot light"></span>
                        <span className="dot dark"></span>
                    </div>
                </>
            }
        </div>
    )
}
export default Onboarding;