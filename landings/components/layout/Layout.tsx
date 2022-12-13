import GuestModal from "components/commons/guestModal/guestModal";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Header from "./Header";
import Meta from "./Meta";
const Toast = dynamic(() => import("./Toast"), { ssr: false });
const Player = dynamic(() => import("./Player"), { ssr: false });
type Props = {
  children: React.ReactNode;
};
const Layout = ({ children }: Props) => {
  const router = useRouter();
  return (
    <>
      <Meta />

      <Header />

      {children}
      <Toast />
      {router.pathname.split("/")[1] === "sessionplay" ? "" : <Player />}
      <GuestModal />
    </>
  );
};

export default Layout;
