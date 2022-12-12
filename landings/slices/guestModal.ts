import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface GroupsStatesDataIFace {
  showGuestModal: boolean;
}
const initialState: GroupsStatesDataIFace = {
  showGuestModal: false,
};
export const showModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    Show_Modal: (state, action: PayloadAction<boolean>) => {
      state.showGuestModal = action.payload;
    },
  },
});

export const { Show_Modal } = showModalSlice.actions;

export default showModalSlice.reducer;
