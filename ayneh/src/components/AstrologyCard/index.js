import React from "react"
import "./styles.scss"
import Down from "../../assets/icons/triangle.png"
const AstrologyCard = (props) => {
    return(
        <div className="astrologyCardContainer">
            <div className="astrologyCardTop" style={{backgroundImage: `url(${props.bg})`}}>
                <p className="title">{props.title}</p>
                <img className="icon" src={Down} alt={"toggleOpen"} />
            </div>
            <div className="options"></div>
        </div>
    )
}
export default AstrologyCard;