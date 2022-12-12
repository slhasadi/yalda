/* --- News Endpoints --- */
export const getNewsEndpoint = (pageSize = 5) => {
  return `feed/news/?page_size=${pageSize}`;
};

export const getHottestNewsEndpoint = (pageSize = 5) => {
  return `feed/top-news/?page_size=${pageSize}`;
};

export const getOtherNewsEndpoint = (pageSize = 5) => {
  return `feed/news/?page_size=${pageSize}&page=${2}`;
};

export const getSingleNewsEndpoint = (slug: string) => {
  return `items/${slug}`;
};

/* --- Prediction Endpoints --- */

export const getScoringEndpoint = () => {
  return `cnt/scoring`;
};

export const getMatchByDateEndpoint = (date?: string, sub?: number) => {
  return `cnt/match/?date=${date}&league=70&user=${sub}`;
};

export const getPredictedMatchesEndpoint = () => {
  return "cnt/prediction";
};
export const postPredict = () => {
  return "cnt/predict/";
};
export const postAdsSeen = () => {
  return "cnt/ads_seen/";
};
export const getMatchRound = () => {
  return "cnt/match_round/?league=70";
};
export const getMatchStages = () => {
  return "cnt/match_stages/?league=70";
};
export const getStandings = () => {
  return "/cnt/standings/?league=70";
};
/* --- Sessions Endpoints --- */

// two way aut - GET req
export const getSessionLeaderBoard = (id: number) => {
  return `v1/tp_cnt/session_lbd/${id}`;
};
// with aut - GET req
export const getSkuList = (organization: number) => {
  return `v2/fin/sku_list/?org_id=${organization}`;
};
// two way aut - GET req
export const getSessionWinners = (id: number) => {
  return `v1/tp_cnt/get_session_winners/${id}`;
};
// with aut - POST req
export const getAdsSeen = () => {
  return `v2/tp_utl/advertisement_seen/`;
};
export const postPay = () => {
  return `v4/fin/pay/`;
};
export const getSessionLdb = (id: number, org: number) => {
  return `v1/tp_cnt/session_lbd/${id}/?org_id=${org}`;
};
export const getUserInfoApi = () => {
  return `v1/usr/info/`;
};
export const getBanner = (org: number) => {
  return `v1/tp_utl/banner/?org=${org}`;
};
export const getParentSession = (org: number) => {
  return `v1/tp_cnt/get_parent_sessions/?org_id=${org}`;
};
export const getWheel = (org: number) => {
  return `v1/frt/wheel/?org_id=${org}`;
};
export const getParentSessionLdb = (id: number) => {
  return `v1/tp_cnt/parent_session_lbd/${id}/`;
};
// with aut - POST req
export const postStartGame = () => {
  return `v1/tp_cnt/sessions/start_game/`;
};
// with aut - POST req
export const postInfo = () => {
  return `v1/tp_cnt/info_p1/`;
};
// with aut - POST req
export const postWheelAgain = () => {
  return `v1/frt/wheel_again/`;
};
export const getRules = (org: number) => {
  return `v1/tp_utl/tos/?org_id=${org}`;
};
export const getWheelResult = () => {
  return `v1/frt/wheel_result/`;
};
// with aut - POST req
export const postEndGame = () => {
  return `v1/tp_cnt/sessions/end_game/`;
};
export const getAdvertisement = (org: number) => {
  return `v2/tp_utl/advertisement/?org=${org}&type=video`;
};
export const getGameSetup = (id: number) => {
  return `v1/tp_cnt/gamesetup/${id}/`;
};
export const getGameHistory = (id: number) => {
  return `v1/tp_cnt/game_history/${id}/`;
};
export const postScore = () => {
  return `v1/tp_cnt/set_1p_score/`;
};
export const postHint = () => {
  return `v1/tp_cnt/hint/`;
};
export const postRaise = () => {
  return `v1/usr/raise_resource/`;
};
export const postGameHistory = (id: number) => {
  return `v1/tp_cnt/game_history/${id}/`;
};
export const getWeeklyLbd = (id: number) => {
  return `v1/tp_cnt/weekly_lbd/${id}/`;
};
export const getSuggestGames = (id: number) => {
  return `v1/tp_cnt/gamesetup/get_suggest_games/?cat_id=${id}`;
};
/* --- Videos Endpoints --- */
export const getVideoList = () => {
  return `feeds/video/`;
};
/* --- Musics Endpoints --- */
export const getMusicList = () => {
  return `feeds/audio/`;
};
export const getFooterPage = (route: string) => {
  return `pages${route}/`;
};

/* --- ActivityLogs Endpoints --- */
export const postActivities = () => {
  return `logs/`;
};
/* --- Pages Endpoints --- */
export const GetPages = () => {
  return `pages/`;
};
