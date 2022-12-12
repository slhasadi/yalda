import {FC, HTMLProps} from "react";

interface Props extends HTMLProps<HTMLDivElement>{}

const Divider: FC<Props> = (props) => {
    return <hr className={`divider ${props.className}`}/>
}

export default Divider;
