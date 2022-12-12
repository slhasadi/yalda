import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { popToast } from "../../../slices/toastSlice";
import { motion, AnimatePresence } from "framer-motion";
import { RootState } from "../../../store";
import styles from "./styles/ToastXl.module.scss";

const ToastXl = () => {
  const list = useSelector((state: RootState) => state.toast.list);
  const dispatch = useDispatch();
  const renderList = () => {
    return (
      <div className={styles["toast-list-outer-container-xl"]}>
      <div className={styles["toast-list-inner-container-xl"]}>
        <AnimatePresence>
          {list.map((item, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => {
                  dispatch(popToast(index));
                }}
                className={styles["toast-list-item-container-xl"]}
              >
                <div className={styles["toast-list-item-text-container-xl"]}>
                  <p className={styles["toast-list-item-text-title-xl"]}>
                    {item.status === "success" ? "موفق" : "ناموفق"}
                  </p>
                  <small className={styles["toast-list-item-text-xl"]}>
                    {item.message}
                  </small>
                </div>
                <Image
                  src={
                    item.status === "success"
                      ? "/images/toast/success.svg"
                      : "/images/toast/failed.svg"
                  }
                  alt="toast"
                  className={styles["toast-list-item-icon-xl"]}
                  height={29}
                  width={29}
                />
                <div
                  style={{
                    backgroundColor:
                      item.status === "success" ? "#00AF5D" : "#FF5722",
                  }}
                  className={styles["toast-list-item-badge-xl"]}
                ></div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
    );
  };
  return (
    <div className={styles["toast-outer-container-xl"]}>
      <div className={styles["toast-inner-contianer-xl"]}>{renderList()}</div>
    </div>
  );
};

export default ToastXl;
