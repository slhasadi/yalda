import { FC } from "react";
type Props = {
  parentClass: string;
};
const BannerAds: FC<Props> = ({ parentClass, children }) => {
  return <div className={parentClass}>{children}</div>;
};

export default BannerAds;
