import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import "./styles.scss"
import { GetMenuItems } from "../../network/cnt"
import { UpdateMenuItem } from "../../actions"
import Logo from "../../assets/images/logo.png"
import SINJIM from "../../assets/images/sinjim.jpg"
import SAFARDAROON from "../../assets/images/ravanshenasi.jpg"
import TAVASOL from "../../assets/images/tavasol.jpg"
import KHABNAMA from "../../assets/images/khabnama.jpg"
import DOREHAMI from "../../assets/images/dorehami.jpg"
import HAFEZ from "../../assets/images/hafez.jpg"
import RANGI from "../../assets/images/rangirangi.jpg"
const Main = (props) => {
    // console.log(props);
    const history = useHistory()
    const appMode = props.match.params.mode;
    const dispatch = useDispatch()
    const [ menuItems, setMenuItems ] = React.useState(useSelector(state => state.contentReducer))
    React.useEffect(() => {
        setTimeout(() => {
            if ( !window.AndroidWebView){
                return
            }
            window.AndroidWebView.onMessage(
                JSON.stringify({
                    type: "ACTION_REMOVE_SPLASH"
                })
            )
        }, 100);
        getMenuItems()

        history.listen((location) => {
            // console.log(location);
            localStorage.setItem("page_view", localStorage.getItem("page_view") ? parseInt(localStorage.getItem("page_view")) + 1 : 0)
            if ( parseInt(localStorage.getItem("page_view")) % 15 === 0){
                console.log("now");
                var key;
                var type;
                if ( (parseInt(localStorage.getItem("page_view")) / 15) % 2 === 0){
                    console.log("even");
                    type = "banner"
                    key = "5fd9ad73e5e1b2000151e821"
                } else {
                    key = "5fd9ad1b0cbcaa0001ff61b3"
                    type = "video"
                }
                const payload = {
                    key: key,
                    type: type,
                }
                if(window.AndroidWebView){
                    window.AndroidWebView.onMessage(JSON.stringify({ type: "SHOW_AD", payload }));
                }
            }
        })
    },[])
    const getMenuItems = () => {
        if( menuItems.length === 0){
            props.setLoading(true)
        }
        GetMenuItems().then((res) => {
            // console.log(res.data);
            let _menuItems = res.data.results;
            // var _menuItems = []
            _menuItems.push(
                {
                    // title: "حافظ",
                    item_type: "hafez",
                    column_type: "one_column",
                    id: 34578,
                    image_file: HAFEZ,
                },
                // {
                //     // title: "رنگی رنگی",
                //     item_type: "rangirangi",
                //     column_type: "one_column",
                //     id: 69562,
                //     image_file: RANGI,
                // },
                {
                    // title: "دورهمی",
                    item_type: "dorehami",
                    column_type: "one_column",
                    id: 545,
                    image_file: DOREHAMI,
                },
                {
                    // title: "سین جیم",
                    item_type: "sinjim",
                    column_type: "one_column",
                    id: 225,
                    image_file: SINJIM,
                },
                // {
                //     title: "خوش خوشک",
                //     item_type: "khoshkhoshak",
                //     column_type: "one_column",
                //     id: 1359,
                //     image_file: "http://api.ayneh.tika-team.ir/static/media/img/menu/1601117490.jpg",
                // },
                {
                    // title: "سفر به درون",
                    // subtitle: "تست روانشناسی",
                    item_type: "safarbedaroon",
                    column_type: "one_column",
                    id: 1476,
                    image_file: SAFARDAROON,
                },
                {
                    // title: "توسل",
                    // subtitle: "استخاره با قرآن کریم",
                    item_type: "tavasol",
                    column_type: "two_column",
                    id: 9525,
                    image_file: TAVASOL,
                },
                {
                    // title: "خواب نما",
                    // subtitle: "تعبیر خواب",
                    item_type: "dream",
                    column_type: "two_column",
                    id: 349,
                    image_file: KHABNAMA,
                }
                // ,
                // {
                //     title: "ماه و پروین",
                //     subtitle: "طالع بینی",
                //     item_type: "mahoparvin",
                //     column_type: "two_column",
                //     id: 682,
                //     image_file: "http://api.ayneh.tika-team.ir/static/media/img/menu/1601117490.jpg",
                // }
            )
            setMenuItems(_menuItems)
            dispatch(UpdateMenuItem(_menuItems))
        }).catch((e) => {
            console.log(e);
        }).finally(() => {
            props.setLoading(false)
        })
    }
    const renderInnerPage = (item) => {
        let address;
        switch (item.item_type) {
            case "hafez":
                address = "/"+appMode+"/hafez"
                break;
            case "rangirangi":
                address = "/"+appMode+"/rangirangi"
                break;
            case "dorehami":
                address = "/"+appMode+"/dorehami"
                break;
            case "sinjim":
                address = "/"+appMode+"/sinjim"
                break;
            case "khoshkhoshak":
                address = "/"+appMode+"/khoshkhoshak"
                break;
            case "tavasol":
                address = "/"+appMode+"/tavasol"
                break;
            case "safarbedaroon":
                address = "/"+appMode+"/contest"
                break;
            case "dream":
                address = "/"+appMode+"/dream"
                break;
	        default:
	        	    if (item.item_type === 'post') {
	        	    	let rs = item.post[0].split('/');
	        	    	let id = rs[rs.length - 1] === '' ? rs[rs.length - 2] : rs[rs.length - 1];
		              address = "/"+appMode+"/post/"+id
		            } else if (item.item_type === 'category') {
			            let rs = item.category[0].split('/');
			            let id = rs[rs.length - 1] === '' ? rs[rs.length - 2] : rs[rs.length - 1];
		              address = "/"+appMode+"/category/"+id
		            } else if (item.item_type === 'subcategory') {
			            let rs = item.subcategory[0].split('/');
			            let id = rs[rs.length - 1] === '' ? rs[rs.length - 2] : rs[rs.length - 1];
		              address = "/"+appMode+"/subcategory/"+id
		            }
                break;
            // case "mahoparvin":
            //     address = "/mahoparvin"
            //     break;
        }
        return address
    }
    return (
        <div className="mainContainer">
            <div className="header">
                <img className="headerLogo" src={Logo} alt="logo" />
            </div>
            <div className="main">
                { menuItems.length !== 0 && menuItems.map((item,index) =>
                    <Link to={renderInnerPage(item)} key={item.id+"_"+index} className={item.column_type === "one_column" ? "item one" : "item two"}>
                        <img className="bg" src={item.image_file} alt="bg" />
                        <h2 className="title">{item.title}</h2>
                        {item.subtitle && <h5 className="subtitle">{item.subtitle}</h5>}
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Main;
