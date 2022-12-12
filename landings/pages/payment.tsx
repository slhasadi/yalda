/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { sessionsBackendURL } from "../globals";
import PaymentPage from "../components/pages/Payment/Payment";
import { updateUserAsync } from "../slices/userSlice";
import {GetServerSideProps} from "next";
import handleOrganization from "../helpers/handleOrganization";
const Payment = () => {
  const router = useRouter();
  const [cookies] = useCookies();
  const dispatch = useDispatch<any>();
  useEffect(() => {
    const userToken = cookies.token;
    const payment_token = router.query.token;
    const status = router.query.status;
    const subUrl = sessionsBackendURL + "v4/fin/settle/";
    if (status) {
      let data = {
        payment_token: payment_token,
        gateway: "sadad",
        status: status,
      };
      if (router.query.payment_type) {
        Object.assign(data, { payment_type: router.query.payment_type });
      }
      axios({
        method: "post",
        data: data,
        url: subUrl,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "jwt " + userToken,
          organization: cookies.organization
        },
      }).then((response) => {
        if (response.status === 200) {
          dispatch(updateUserAsync());
        }
      });
    }
  }, [router]);
  return <PaymentPage />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const stateCookie = await handleOrganization(context, false)
    return {
        props: {}
    }
};
export default Payment;
