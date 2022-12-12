import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useInterval from 'use-interval';

import ToastXl from "./ToastXl";
import ToastXs from "./ToastXs";
import { popToast } from "../../../slices/toastSlice";
import { RootState } from "../../../store";

const Toast = () => {
  const list = useSelector((state: RootState) => state.toast.list);
  const dispatch = useDispatch();

  useInterval(
    () => {
      dispatch(popToast({ index: 0 }));
    },
    list.length ? 5000 : null
  );

  return (
    <>
      <ToastXs />
      <ToastXl />
    </>
  );
};

export default Toast;
