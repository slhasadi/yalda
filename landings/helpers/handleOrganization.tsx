import axios from "axios";
import {serverSideURL} from "../globals";
import {GetServerSidePropsContext} from "next";

const handleOrganization = async (
    context?: GetServerSidePropsContext,
    forceSet: boolean = false
) => {
    let version = null;
    let organization = null;
    let data = null;
    let slug = "";
    let token = "";
    if (context) {
        version = context.req?.cookies["version"];
        organization = context.req?.cookies["lnd_org"];
        data = context.req?.cookies["data"];
        if (forceSet) {
            slug = `path=${(context.query?.slug as string) || ""}`;
        } else if (organization) {
            slug = `org=${organization}`;
        } else {
            slug = "path="
        }
        token = (context.query["token"] as string) || "";

        if (forceSet || !version || version != process.env.NEXT_PUBLIC_APP_VERSION || !organization || !data) {
            let url = `${serverSideURL}users/org/?${slug}`
            if (token != "") {
                url = url + `&token=${token}`
            }
            let response = await axios.get(url);
            if (response) {
                if (response.status == 200) {
                    let tokenCookie = '';
                    if (token != "" && response.data.token && response.data.token != "") {
                        context.res.setHeader("set-cookie", [
                            `organization=${response.data.baazigooshi_org};Max-Age=2147483647;Path=/`,
                            `prd_org=${response.data.prediction_org};Max-Age=2147483647;Path=/`,
                            `lnd_org=${response.data.landing_org};Max-Age=2147483647;Path=/`,
                            `data=${JSON.stringify(response.data)};Max-Age=3600;Path=/`,
                            `token=${response.data.token};Max-Age=2147483647;Path=/`,
                            `version=${process.env.NEXT_PUBLIC_APP_VERSION};Max-Age=2147483647;Path=/`,
                        ]);
                        tokenCookie = response.data.token;
                    } else {
                        context.res.setHeader("set-cookie", [
                            `organization=${response.data.baazigooshi_org};Max-Age=2147483647;Path=/`,
                            `prd_org=${response.data.prediction_org};Max-Age=2147483647;Path=/`,
                            `lnd_org=${response.data.landing_org};Max-Age=2147483647;Path=/`,
                            `data=${JSON.stringify(response.data)};Max-Age=3600;Path=/`,
                            `version=${process.env.NEXT_PUBLIC_APP_VERSION};Max-Age=2147483647;Path=/`,
                        ]);
                        tokenCookie = context.req?.cookies["token"] as string || '';
                    }
                    return {
                        organization: response.data.baazigooshi_org,
                        prd_org: response.data.prediction_org,
                        lnd_org: response.data.landing_org,
                        data: response.data,
                        token: tokenCookie,
                    }
                }
            }
        }
        return {
            organization: context.req?.cookies["organization"],
            prd_org: context.req?.cookies["prd_org"],
            lnd_org: context.req?.cookies["lnd_org"],
            data: JSON.parse(context.req?.cookies["data"] || ''),
            token: context.req?.cookies["token"],
        }
    }
};
export default handleOrganization;
