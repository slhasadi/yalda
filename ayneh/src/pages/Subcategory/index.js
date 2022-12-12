import React from 'react'
import "./styles.scss"
import { GetSubCatDetails } from "../../network/cnt"
import Back from "../../assets/icons/back.svg"
import { Link } from 'react-router-dom'
const SubCategory = (props) => {
    const appMode = props.match.params.mode;
    const [ subcategory, setSubCategory ] = React.useState()
    const [ pageTitle, setPageTitle ] = React.useState()
    React.useEffect(() => {
        let res = props.location.pathname.split("/");
        if(props.pageType === "subcategory"){
            getSubCatDetail(res[res.length - 1])
        } else if (props.pageType === "shakhenabat"){
            setPageTitle("شاخ نبات")
        } else if (props.pageType === "tavasol"){
            setPageTitle("توسل")
        }
    },[])
    const getSubCatDetail = (id) => {
        props.setLoading(true)
        GetSubCatDetails(id).then((res) => {
            // console.log(res.data);
            setSubCategory(res.data)
            setPageTitle(res.data.title)
        }).catch((e) => {
            console.log(e);
        }).finally(() => {
            props.setLoading(false)
        })
    }
    const faal = () => {
        props.history.push("/"+appMode+"/hafez/faal")
    }
    const estekhare = () => {
        props.history.push("/"+appMode+"/tavasol/result")
    }
    return (
        <div className="subcategoryContainer">
            <div className="header">
                <div className="back" onClick={() => props.history.goBack()}>
                    <img src={Back} alt="back" className="backIcon" />
                </div>
                {pageTitle !== undefined && <p className="pageTitle">{pageTitle}</p>}
            </div>
            <div className={(props.pageType === "shakhenabat" || props.pageType === "tavasol") ? "main noPadding" : "main"}>
                { props.pageType === "subcategory" &&  subcategory && subcategory.posts.map((post, index) =>
                    <Link to={'/'+appMode+`/post/${post.id}`} key={post.id+"-"+index} className="item">
                        <img className="bg" src={post.image_file} alt={post.title} />
                        <h4 className="title">{post.title}</h4>
                    </Link>
                )}
                { props.pageType === "shakhenabat" &&
                    <div className="shakhenabatBg">
                        <h3>ای حافظ شیرازی</h3>
                        <h3>تو محرم هر رازی</h3>
                        <h5>{`تو را به خدا و به شاخه نباتت قسم\nمی دهم که هر چه صلاح و مصلحت میبینی \nبرایم آشکار و آرزوی مرا برآورده  سازی`}</h5>
                        <button onClick={() => faal()} className="faalBtn">نیت کرده و اشارت فرمایید</button>
                    </div>
                }
                { props.pageType === "tavasol" &&
                    <div className="tavasolBg">
                        <h4>اَللّهُمَّ إِنْ كانَ فِی قَضائِكَ وَ قَدَرِكَ، أَنْ تَمُنَّ عَلى اُمَّةِ نَبِیِّكَ، بِظُهُورِ وَلیِّكَ وَ ابْنِ بِنْتِ نَبِیِّكَ، فَعَجِّلْ ذلِكَ وَ سَهِّلْهُ وَ یَسِّرْهُ وَ كَمِّلْهُ، و اَخْرِجْ لِی آیَةً، اَسْتَدِلُّ بِها عَلى أَمر فَأَئْتَمِرَ، أوْ نَهْـى فَأَنْتَهی فِی عافِیَـة</h4>
                        <h6>{"سه مرتبه صلوات بر محمد و آل محمد بفرستید و سپس نیت کرده و به آنچه که مایل اید استخاره کنید، نیز پسندیده تر آنست که رو به قبله، با لباس و بدن پاک و وضو باشید."}</h6>
                        <button onClick={() => estekhare()} className="faalBtn">نیت کرده و اشارت فرمایید</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default SubCategory;
