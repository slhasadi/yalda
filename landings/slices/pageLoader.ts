import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface props {
  activePage: string;
}
const initialState: props = {
  activePage: "",
};

export const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    Loader_page: (state, action: PayloadAction<string>) => {
      state.activePage = action.payload;
    },
  },
});

export const { Loader_page } =
loaderSlice.actions;

export default loaderSlice.reducer;
