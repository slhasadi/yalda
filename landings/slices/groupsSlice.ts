import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GroupsStatesDataIFace {
  activeMenuItem: number;
  activeRoundItem: number;
}
const initialState: GroupsStatesDataIFace = {
  activeMenuItem: 1,
  activeRoundItem: 0,
};

export const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    Groups_SET_ACTIVE_MENU_ITEM: (state, action: PayloadAction<number>) => {
      state.activeMenuItem = action.payload;
    },
    Groups_SET_ACTIVE_ROUND_ITEM: (state, action: PayloadAction<number>) => {
      state.activeRoundItem = action.payload;
    },
  },
});

export const { Groups_SET_ACTIVE_MENU_ITEM, Groups_SET_ACTIVE_ROUND_ITEM } =
  groupsSlice.actions;

export default groupsSlice.reducer;
