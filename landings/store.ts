import { configureStore } from "@reduxjs/toolkit";
import dashboardSlice from "./slices/dashboardSlice";
import groupsSlice from "./slices/groupsSlice";
import loaderSlice from "./slices/pageLoader";
import playerSlice from "./slices/playerSlice";
import toastSlice from "./slices/toastSlice";
import userSlice from "./slices/userSlice";
import shopSlice from "./slices/shopModal";
import PagesSlice from "./slices/pagesDataSlice";
import guestSlice from "./slices/guestModal";

export const store = configureStore({
  reducer: {
    user: userSlice,
    player: playerSlice,
    toast: toastSlice,
    groups: groupsSlice,
    dashboard: dashboardSlice,
    page: loaderSlice,
    shop: shopSlice,
    guest: guestSlice,
    pages: PagesSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
