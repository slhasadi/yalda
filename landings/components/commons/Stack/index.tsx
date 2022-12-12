import {FC, HTMLProps} from "react";

interface Props extends HTMLProps<HTMLDivElement>{}

const Stack: FC<Props> = ({children, className= '', ...rest}) => {
    return (
        <div {...rest} className={`flex ${className}`}>
            {children}
        </div>
    )
}

export default Stack;
