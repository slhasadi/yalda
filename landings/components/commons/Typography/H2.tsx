import {FC} from "react";
type Props = {
    className?: string
}
const H2: FC<Props> = ({children, className}) => {
    return <h2 className={`text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] font-bold ${className}`}>
        {children}
    </h2>
}

export default H2;
