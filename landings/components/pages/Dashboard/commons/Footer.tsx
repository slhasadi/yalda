import Link from "next/link";

const Footer = () => {
  return (
    <div className="h-[33px] md:h-[30px] absolute bottom-[-7px] flex items-center w-[97%]">  
    <p className="text-center mb-[10px] text-[14px] font-[system-ui]">Copyright 2022 by <Link href="https://keylid.com"><a className="text-[#8a1638]">goldenkey</a></Link></p>
    </div>
  );
};

export default Footer;
