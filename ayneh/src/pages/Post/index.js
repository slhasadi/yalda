import React from 'react'
import "./styles.scss"
import { GetPostDetails } from "../../network/cnt"
import { CardViewVertical } from "../../components/Card"
import Back from "../../assets/icons/back.svg"
const Post = (props) => {
    const [ post, setPost ] = React.useState()
    React.useEffect(() => {
        let res = props.location.pathname.split("/");
        getPostDetail(res[res.length - 1])
    },[])
    const getPostDetail = (id) => {
        props.setLoading(true)
        GetPostDetails(id).then((res) => {
            console.log(res.data);
            setPost(res.data)
        }).catch((e) => {
            console.log(e);
        }).finally(() => {
            props.setLoading(false)
        })
    }
    return (
        <div className="postContainer">
            <div className="header">
                <div className="back" onClick={() => props.history.goBack()}>
                    <img src={Back} alt="back" className="backIcon" />
                </div>
                {post && <p className="pageTitle">{post.title}</p>}
            </div>
            <div className="main">
                {post && <CardViewVertical data={post} />}
            </div>
        </div>
    )
}

export default Post;