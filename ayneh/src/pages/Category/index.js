import React from 'react'
import "./styles.scss"
// import { useDispatch, useSelector } from "react-redux"
import { GetCatItems } from "../../network/cnt"
import Back from "../../assets/icons/back.svg"
import { Link } from 'react-router-dom'
import SHAKHENABAT from "../../assets/images/shakh_nabat.jpg"
const Category = (props) => {
    const [ category, setCategory ] = React.useState()
		const appMode = props.match.params.mode;
    React.useEffect(() => {
        let res = props.location.pathname.split("/");
        if( props.pageType === "category"){
            getCatDetail(res[res.length - 1])
        } else if (props.pageType === "hafez"){
            setCategory({
                id: "hafez",
                image_file: null,
                subcategories: [{
                    id: "shakhenabat",
                    image_file: SHAKHENABAT,
                    title: "شاخ نبات",
                }],
                title: "حافظ",
            })
            if(window.AndroidWebView){
                const payload = {
                    key: '5ec3dbb5dae0700001a5a20d',
                    type: 'standard',
                }
                window.AndroidWebView.onMessage(JSON.stringify({ type: "SHOW_AD", payload }));
            }
        }
        return () => {
            if (props.pageType === "hafez"){
                if(window.AndroidWebView){
                    let payload= {
                        type: 'standard'
                    }
                    window.AndroidWebView.onMessage(JSON.stringify({ type: "HIDE_ADD", payload }));
                }
            }
        };
    },[])
    const getCatDetail = (id) => {
        props.setLoading(true)
        GetCatItems(id).then((res) => {
            // console.log(res.data);
            setCategory(res.data)
        }).catch((e) => {
            console.log(e);
        }).finally(() => {
            props.setLoading(false)
        })
    }
    const renderInnerPage = (subCat) => {
        let address;
        if( props.pageType === "category"){
            address = '/'+appMode+`/subcategory/${subCat.id}`
        } else {
            address = subCat.id
        }
        return address
    }
    return (
        <div className="categoryContainer">
            <div className="header">
                <div className="back" onClick={() => props.history.goBack()}>
                    <img src={Back} alt="back" className="backIcon" />
                </div>
                {category !== undefined && <p className="pageTitle">{category.title}</p>}
            </div>
            <div className="main">
                { category && category.subcategories.map((subCat, index) =>
                    <Link to={renderInnerPage(subCat)} key={subCat.id+index} className="item">
                        <img className="bg" src={subCat.image_file} alt={subCat.title} />
                        {props.pageType === "category" && <h4 className="title">{subCat.title}</h4>}
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Category;
