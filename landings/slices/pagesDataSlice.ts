import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useRouter } from 'next/router';
import { Toast } from "../interfaces/interfaces";

const initialState: { list: any[], menu: any[] } = {
  list: [],
  menu: []
};
export const PagesSlice = createSlice({
  name: "Pages",
  initialState,
  reducers: {
    Pages_Data: (state, action: PayloadAction<any[]>) => {
        const path = window.location.href.split("/")[3];
        let list:any[] = [];
        action.payload.forEach(element => {
            let slug = element.slug;
            if (element.slug === "home") {
                slug = ""
            }
            if (slug === path){
                list.push(element)
            }
            if (element.type === "menu") {
              state.menu.push(element.slug);
            } 
        });
    state.list = list;
    },
  },
});

export const { Pages_Data } = PagesSlice.actions;

export default PagesSlice.reducer;
