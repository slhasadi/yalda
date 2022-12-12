import { axios } from "../../networks/axios/activityAxios";
import { postActivities } from "../../networks/endpoints";

export const saveClicks = (
  content_id: number | string,
  content_type: string,
  org: number,
  token: string
) => {
  let data = {
    log_type: "view",
    content_id: content_id,
    content_type: content_type,
    organization: `${org}`,
    token: token,
  };
  axios()
    .post(postActivities(), data)
    .then((res) => {});
};
export const saveWatchTime = (content_id: number, content_type: string, org: number, duration: number,
                              last_watch: number, token: string) => {
    let data = {
        log_type: 'watchtime',
        content_id: content_id,
        content_type: content_type,
        organization: `${org}`,
        duration: duration,
        last_watch: last_watch,
        token: token,
    }
    axios().post(postActivities(), data).then(res=>{})
}