import { Cookies } from "react-cookie";
import Image from "next/image";
import ContentSideLayout from "../commons/ContentSideLayout";

const Edit = () => {
  const cookies = new Cookies();
  return (
  <>
    <ContentSideLayout title="ویرایش پروفایل">
      <div className="w-[200px] md:w-[500px] h-[150px] md:h-[300px] text-[#444] rounded-lg flex text-[18px] flex-col justify-evenly items-center absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]">
      <h3>در حال انتقال شما به صفحه ویرایش پروفایل ...</h3>
      </div>
    </ContentSideLayout>
   
  </>
  )
};

export default Edit;
