export const hafezURL = "https://games.digikala.com/landings_api/";
export const haffezGhazalApi = (code: number) =>
  hafezURL + `nowrooz/static/hafez_db/ghazal/${("000" + code).slice(-3)}.txt`;
export const haffezInterpretationApi = (code: number) =>
  hafezURL +
  `nowrooz/static/hafez_db/interpretation/${("000" + code).slice(-3)}.txt`;
export const basePath = "http://localhost:3000";
export const baseURL =
  process.env.NEXT_PUBLIC_PATH_ENVS === "production"
    ? "https://api.sports.vidaneh.com/api/"
    : "https://api.sports.vidaneh.com/api/";
export const fileBaseURL =
  process.env.NEXT_PUBLIC_PATH_ENVS === "production"
    ? "https://api.sports.vidaneh.com"
    : "https://api.sports.vidaneh.com";
export const serverSideURL =
  process.env.NEXT_PUBLIC_PATH_ENVS === "production"
    ? "https://api.sports.vidaneh.com/api/"
    : process.env.NEXT_PUBLIC_PATH_ENVS === "development"
    ? "https://api.sports.vidaneh.com/api/"
    : "https://api.sports.vidaneh.com/api/";

export const serverSideFileURL =
  process.env.NEXT_PUBLIC_PATH_ENVS === "production"
    ? "https://api.sports.vidaneh.com"
    : process.env.NEXT_PUBLIC_PATH_ENVS === "development"
    ? "http://api.landings.q00p.ir"
    : "https://api.sports.vidaneh.com";

export const BASE_ADS_URL =
  process.env.NEXT_PUBLIC_PATH_ENVS === "production"
    ? "https://api.ads.kplus.holdings/"
    : process.env.NEXT_PUBLIC_PATH_ENVS === "development"
    ? "https://api.ads.kplus.holdings/"
    : "https://api.ads.kplus.holdings/";
export const bookFileBaseURL =
  process.env.NEXT_PUBLIC_PATH_ENVS === "production"
    ? "https://api.sports.vidaneh.com"
    : "https://api.sports.vidaneh.com";
export const iv = "1011121314151617";
export const playerUrl =
  process.env.NEXT_PUBLIC_PATH_ENVS === "production"
    ? "https://api.sports.vidaneh.com"
    : "http://api.landings.q00p.ir";
export const ActivityLog = "https://api.sports.vidaneh.com/al/api/";
export const sessionsBackendURL = "https://api.baazigooshi.com/";
export const predictionURL = "https://api.prediction.tika-team.ir/";

export function SSO_PATH(hostname: string = "") {
  if (hostname === "landing.splus.ir") {
    return "https://accounts.splus.ir/?srv=land_worldcup";
  }
  return `https://accounts.kplus.holdings/?srv=land_worldcup`;
}

export function replaceUrl(url: string) {
  let change = url.split("/");
  let base = url.split("http");
  if (change[0] === "http:") {
    return "https" + base[1];
  }
}
