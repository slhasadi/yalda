import {FC} from "react";

const Container: FC = ({children}) => {
    return <div className='container mx-auto lg:px-6 px-3'>
        {children}
    </div>
}

export default Container;
