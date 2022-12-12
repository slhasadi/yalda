import {FC} from "react";
type Props = {

}
const Tabs: FC<Props> = ({children}) => {
    return <ul className='flex justify-center lg:justify-start gap-x-8 child:font-medium [&>.active-tab]:text-primary [&>.active-tab]:font-bold mb-4'>
        {children}
    </ul>
}

export default Tabs;
