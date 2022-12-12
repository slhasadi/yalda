import {FC} from "react";

const index: FC = ({children}) => {
    return <span className='text-sm md:text-normal border text-secondary pt-1 text-sm rounded-full px-2 h-[24px] flex items-center'>
        {children}
    </span>
}

export default index;
