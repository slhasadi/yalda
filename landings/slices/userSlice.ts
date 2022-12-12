import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Cookies } from "react-cookie";
import { sessionsBackendURL } from "../globals";
import { UserInfo } from "../components/pages/Game/interfaces/interfaces";
import { AppDispatch } from "../store";
const cookies = new Cookies();
interface State {
  user: UserInfo;
}
const initialState: State = {
  user: {
    birth_date: null,
    bzg_username: "",
    city: null,
    coin: 0,
    email: "",
    fair_access: false,
    first_name: "",
    golden_key: 0,
    has_active_golden_package: false,
    heart: 0,
    instagram_username: "",
    invitation_count: 0,
    invite_code: "",
    is_guest: false,
    is_invited: false,
    is_phone_confirmed: false,
    last_name: "",
    najva_id: null,
    phone: "",
    picture: null,
    province: null,
    purchased_coin: 0,
    remained_seen_ad: 0,
    reward_coin: 0,
    ruby: 0,
    see_ad: false,
    stage: null as any,
    tp_userid: "",
    tp_username: "",
    user_stage: "",
    wallet: 0,
    subscription: null,
    wheel_iphone_chance: 0,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUserInfo } = userSlice.actions;

export const updateUserAsync = () => {
  return function (dispatch: AppDispatch) {
    if (cookies.get("token")) {
      axios({
        url: `${sessionsBackendURL}v1/usr/info/`,
        method: "get",
        headers: {
          Authorization: "jwt " + cookies.get("token"),
          organization: cookies.get("organization"),
        },
      }).then((response) => {
        dispatch(setUserInfo(response.data));
      });
    }
    // else {
    //   axios({
    //     url: `${sessionsBackendURL}v1/usr/info/`,
    //     method: "get",
    //     headers: {
    //       organization: cookies.get("organization"),
    //     },
    //   }).then((response) => {
    //     dispatch(setUserInfo(response.data));
    //   });
    // }
  };
};

export default userSlice.reducer;
