import React from "react"
import { useSelector } from "react-redux"
const Webview = (props) => {
    const appMode = props.match.params.mode;
    const [ userInfo ] = React.useState(useSelector(state => state.UserReducer))
    const [ pageUrl, setPageUrl ] = React.useState()
    React.useEffect(() => {
        switch (props.location.pathname) {
            case "/"+appMode+"/rangirangi":
                setPageUrl("https://rangi-rangi.tika-team.ir/?phone=" + userInfo.phone)
                break;
            case "/"+appMode+"/dorehami":
                setPageUrl("https://dorehami.keylid.com/" ) //+ userInfo.phone +"&name=" + userInfo.first_name + " " + userInfo.last_name
                break;
            case "/"+appMode+"/sinjim":
                setPageUrl("https://thirdparty.baazigooshi.com/sinjim/" + appMode )
            default:
                break;
        }
      
        if(pageUrl && pageUrl!== ''){
            window.location.replace(pageUrl)
        }
       
    },[pageUrl])
    return(
        <></>
    )
}
export default Webview;