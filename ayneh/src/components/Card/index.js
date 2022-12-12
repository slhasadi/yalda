import React from "react"
import "./styles.scss"
import moment from 'jalali-moment'
import ReactSafeHtml  from "react-safe-html"
import { toFarsiNumber } from "../../constants/number"
export const CardViewVertical = (props) => {
    const data = props.data;
    return(
        <div className="cardViewVertical">
            <div className="banner">
                <img src={data.image_file} alt={data.title} />
            </div>
            <div className="titleContainer">
                <h5>{data.title}</h5>
                <span className="smallText gray">{toFarsiNumber( moment(data.created_at, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD') ) }</span>
            </div>
            <div className="bodyText paddingHorizontal-05 overflowYScroll">
                <ReactSafeHtml html={data.body} />
            </div>
        </div>
    )
}