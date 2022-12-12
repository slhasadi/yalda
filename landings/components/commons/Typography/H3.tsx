import {FC} from "react";
type Props = {
    className?: string
}
const H3: FC<Props> = ({children, className}) => {
    return <h3 className={`text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] font-bold ${className}`}>
        {children}
    </h3>
}

export default H3;