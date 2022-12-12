import Button from "components/commons/Button";
import Stack from "components/commons/Stack";
import { useDispatch } from "react-redux";
import { Pages_Data } from "slices/pagesDataSlice";

const Modal = ({open, setOpen, title, children}: any) => {
    const dispatch = useDispatch();
    if (!open) return null

    const onCloseHandler = (event: any) => {
        // event.stopPropagation();
        // setOpen(false)
    }

    return <div onClick={onCloseHandler} className="darkBG">
        <div className="centered w-[280px]">
            <Stack dir="rtl" className='flex-col max-h-[450px] gap-y-4 bg-white drop-shadow-2xl shadow rounded-[20px] w-full lg:w-[360px] overflow-hidden'>
                <Stack className='justify-between items-center mb-2 font-black text-lg lg:text-xl bg-primary px-4 py-3'>
                    <span className='text-white'>{title}</span>
                    <span className='px-1 text-white text-3xl cursor-pointer font-thin' onClick={() => {
                        setOpen(false);
                        // dispatch(Pages_Data([]));
                        document.getElementsByTagName("body")[0].style.overflow ="visible";
                        }}>&times;</span>
                </Stack>
                <div className="px-6 py-1 mb-2 font-bold">
                    {children}
                </div>
                {/*<div className='text-center'>*/}
                {/*    <Button onClick={() => setOpen(false)} className='px-16 py-3 rounded-lg drop-shadow-lg w-full lg:w-auto' type='primary'>بستن</Button>*/}
                {/*</div>*/}
            </Stack>
        </div>
    </div>
}

export default Modal;
