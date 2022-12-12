import React from "react";
import {SVG_PropsIFace} from "./interface";

interface SVG_BUTTON_PropsIFace extends SVG_PropsIFace {
    text: string
}

export const SVG_BUTTON: React.FC<SVG_BUTTON_PropsIFace> = ({text, ...props}) => {
    return (
        <svg id="btnSvgComponent" xmlns="http://www.w3.org/2000/svg" width="211" height="49"
             viewBox="0 0 211 49" {...props}>
            <rect id="btnSvgComponent_Rectangle_34" width="100" height="49" rx="24.5" fill="#0c0c0c"/>
            <rect id="btnSvgComponent_Rectangle_35" width="166" height="49" rx="24.5" transform="translate(45)"
                  fill="#db0031"/>
            <text id="btnSvgComponent_text" transform="translate(230 29)" fill="#fff" fontSize="24"
                  fontFamily="Yekan Bakh FaNum" fontWeight="500">
                <tspan x="-45.024" y="0">{text}</tspan>
            </text>
            <path id="btnSvgComponent_Icon_awesome-arrow-left"
                  d="M10.343,19.442l-.892.915a.943.943,0,0,1-1.362,0L.28,12.348a1,1,0,0,1,0-1.4L8.09,2.938a.943.943,0,0,1,1.362,0l.892.915a1.008,1.008,0,0,1-.016,1.414L5.486,10H17.032a.975.975,0,0,1,.964.989v1.319a.975.975,0,0,1-.964.989H5.486l4.841,4.732A1,1,0,0,1,10.343,19.442Z"
                  transform="translate(14.34 13.353)" fill="#fff"/>
        </svg>
    )
}