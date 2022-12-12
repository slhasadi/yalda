import {FC} from "react";
type Props = {
    className?: string
    dropShadow?: boolean,
    bgColor:any,
    textColor:any,
}
const Card: FC<Props> = ({children, className, dropShadow = true, bgColor, textColor}) => {
    return <div style={{background:bgColor, color:textColor}} className={`rounded-lg overflow-hidden ${dropShadow && 'shadow-xl drop-shadow-xl' } ${className}`} >
        {children}
    </div>
}

export default Card;
