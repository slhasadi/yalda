import Link from "next/link";
import { useRouter } from "next/router";
const Footer = () => {
    const router = useRouter();
    return (
        <>
        <div className="absolute bottom-0 text-center w-full contents">
            <p className="text-center mb-[10px] text-[14px] font-[system-ui]">Copyright 2022 by <Link href="https://keylid.com"><a className="text-[#8a1638]">goldenkey</a></Link></p>
        </div>
        </>
    )
}

export default Footer;