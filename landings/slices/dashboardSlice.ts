import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GroupsStatesDataIFace {
  activeMenuItem: string;
}
const initialState: GroupsStatesDataIFace = {
  activeMenuItem: "movies",
};

export const gdashboardSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    Dashboard_Active_Tab: (state, action: PayloadAction<string>) => {
      state.activeMenuItem = action.payload;
    },
  },
});

export const { Dashboard_Active_Tab } =
gdashboardSlice.actions;

export default gdashboardSlice.reducer;
