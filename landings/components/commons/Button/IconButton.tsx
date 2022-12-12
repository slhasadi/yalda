import {FC} from "react";
type Props = {
    title: string
}
const IconButton: FC<Props> = ({children, title}) => {
    return <button title={title} className='p-0 rounded-full w-[30px] h-[30px] cursor-pointer'>
        {children}
    </button>
}

export default IconButton;
