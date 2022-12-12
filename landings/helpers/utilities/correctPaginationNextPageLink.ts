export default (url: string) => {
  if (url) return url.replace("http://", "https://");
  throw Error("not suitable url");
};
