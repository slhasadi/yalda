import { Pages } from "interfaces/interfaces";
import { getPagesData } from "networks/pages";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { RootState } from "store";
const Nav = () => {
  const [openNav, setOpenNav] = useState(false);
  const [pages, setPages] = useState<Pages[]>([]);
  const pagesData = useSelector((state: RootState) => state.pages.list);
  const router = useRouter();
  const [cookies, setCookies] = useCookies(["token", "lnd_org", "menu_items"]);
  useEffect(() => {
    getPagesData(cookies.lnd_org, cookies.token).then(async (res: any) => {
      setPages(
        res.data.filter(function (el: any) {
          return el.type === "menu";
        })
      );
    });
  }, [router]);
  return (
    <>
      <div className="hidden items-center flex-[80] md:flex">
        <div className="flex flex-row mt-[15px] gap-8">
          {pages.map((page, index) => {
            return (
              <Link href={page.slug} key={index}>
                <a className="text-[#fff]">{page.title}</a>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex items-center flex-1 md:hidden">
        <div
          className="w-[30px] h-[30px] flex my-[10px]"
          onClick={() => {
            setOpenNav(!openNav);
          }}
        >
          <Image
            src="/images/main-page/nav.svg"
            alt="nav"
            width={40}
            height={40}
          />
        </div>
        <div className=" w-[70px] h-[70px] flex mr-[10px] md:mr-[0] py-[4px]">
          <div className="flex items-center relative w-[100px]">
            <Image
              src={"/images/logo.svg"}
              alt="logo"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
        {openNav && (
          <div className="fixed w-[60vw] h-[100vh] z-10 bg-[#fff] top-0 right-0">
            <div
              className="w-[20px] h-[20px] mx-[20px] my-[25px] cursor-pointer"
              onClick={() => {
                setOpenNav(false);
              }}
            >
              <Image
                src="/images/header/close.svg"
                alt="nav"
                width={50}
                height={50}
              />
            </div>
            <div className="flex flex-col gap-4">
              {pages.map((page, index) => {
                return (
                  <>
                    <Link href={page.slug}>
                      <a className="text-[#000] flex items-center mr-2">
                        <Image
                          src={page.icon}
                          alt={page.title}
                          width={40}
                          height={40}
                        />
                        <p className="mr-2">{page.title}</p>
                      </a>
                    </Link>
                    <hr />
                  </>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Nav;
