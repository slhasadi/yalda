import {FC} from "react";
type Props = {
    className?: string
}
const H1: FC<Props> = ({children, className}) => {
    return <h1 className={`text-[28px] sm:text-[32px] md:text-[34px] lg:text-[36px] font-bold ${className}`}>
        {children}
    </h1>
}

export default H1;
