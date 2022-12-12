import React from 'react'
import "./styles.scss"
import Logo from "../../assets/images/logo.png"
import LocalStorageService from '../../network/localstorageService'
const Splash = (props) => {
    const appMode = props.match.params.mode !== ":mode" ? props.match.params.mode : "cafe";
    // console.log('====================================');
    // console.log(appMode);
    // console.log('====================================');
    React.useEffect(() => {
     
        setTimeout(() => {
            const token = LocalStorageService.getToken();
            // if( token === null ){
            //     props.history.replace("/"+appMode+"/login")
            // } else {
                props.history.replace("/"+appMode+"/main")
            // }
        }, 1000)
    },[])
    return (
        <div className="splashContainer">
            <img src={Logo} alt="logo" />
        </div>
    )
}

export default Splash;