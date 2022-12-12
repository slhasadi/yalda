import { Cookies } from "react-cookie";
import ContentSideLayout from "../commons/ContentSideLayout";

const SignOut = () => {
  const cookies = new Cookies();
  return (
  <>
    <ContentSideLayout title="خروج از حساب کاربری">
      <div className="w-[200px] md:w-[500px] h-[150px] md:h-[300px] text-[#ffffff] rounded-lg bg-[#BABABA] flex text-[18px] flex-col justify-evenly items-center absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]">
        <p>برای خروج اطمینان دارید؟</p>
        <button 
          className="w-[70%] rounded-lg h-[40px] md:w-[70%] md:h-[70px] text-[#ffffff] text-[20px] bg-gradient-to-b from-[#700f2e] to-[#b3083e]"
          onClick={() => {
            Object.keys(cookies.getAll()).forEach((key) => {
              cookies.remove(key, { path: "/", sameSite: true });
            });
            localStorage.clear();
            window.location.href = "/";
          }}
        >خروج</button>
      </div>
    </ContentSideLayout>
  </>
  )
};

export default SignOut;
