import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";
import axios from "axios";
import { sessionsBackendURL } from "../globals";
import { UserInfo } from "../components/pages/Game/interfaces/interfaces";
import { AppDispatch } from "../store";
import { Show_Modal } from "./guestModal";
const cookies = new Cookies();
interface GroupsStatesDataIFace {
  ShopList: any[];
}
const initialState: GroupsStatesDataIFace = {
  ShopList: [],
};

export const getshopList = createSlice({
  name: "groups",
  initialState,
  reducers: {
    setShopData: (state, action: PayloadAction<any[]>) => {
      state.ShopList = action.payload;
    },
  },
});

export const { setShopData } = getshopList.actions;

export const shopList = () => {
  return function (dispatch: AppDispatch) {
    if (cookies.get("token")) {
      axios({
        url: `${sessionsBackendURL}v2/fin/sku_list/?org_id=${cookies.get("organization")}`,
        method: "get",
        headers: {
          Authorization: "jwt " + cookies.get("token"),
          organization: cookies.get("organization"),
        },
      }).then((response) => {
        dispatch(setShopData(response.data));
      });
    } else {
      dispatch(setShopData([]));
      dispatch(Show_Modal(true));
    }
  };
};

export default getshopList.reducer;
