import { createSlice } from "@reduxjs/toolkit";
import { Toast } from "../interfaces/interfaces";

const initialState: { list: Toast[] } = {
  list: [],
};

export const ToastSlice = createSlice({
  name: "Toast",
  initialState,
  reducers: {
    pushToast: (state, action) => {
      let temp = [...state.list];
      temp.push({
        status: action.payload.status,
        message: action.payload.message,
      });
      state.list = temp;
    },
    popToast: (state, action) => {
      let temp = [...state.list];
      temp.splice(action.payload.index, 1);
      state.list = temp;
    },
  },
});

export const { pushToast, popToast } = ToastSlice.actions;

export default ToastSlice.reducer;
