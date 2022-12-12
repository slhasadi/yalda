import Stack from "../Stack";
import Rhombus from "./Rhombus";
type Props = {
    className?: string
}
const Rhombuses = ({className}: Props) => {
    return <Stack className={`gap-x-1 md:gap-x-2 ${className}`}>
        <Rhombus className='bg-cubes scale-110 w-[8px] h-[8px] lg:w-[15px] lg:h-[15px]' />
        <Rhombus className='bg-cubes w-[8px] h-[8px] lg:w-[15px] lg:h-[15px]' />
        <Rhombus className='bg-cubes scale-75 w-[8px] h-[8px] lg:w-[15px] lg:h-[15px]' />
        <Rhombus className='bg-cubes scale-50 w-[8px] h-[8px] lg:w-[15px] lg:h-[15px]' />
        <Rhombus className='bg-cubes scale-25 w-[8px] h-[8px] lg:w-[15px] lg:h-[15px]' />
    </Stack>
}

export default Rhombuses;
