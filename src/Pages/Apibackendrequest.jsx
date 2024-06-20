import axios from "axios";
import { useState } from "react";
const Token = localStorage.getItem("accessToken")
export default async function Apibackendrequest(url, request) {
  console.log(Token)
  const responsedata = {
    isexception: false,
    exceptionmessage: "",
    data: null,
  };
  const headers = {
    "Content-Type": "multipart/form-data,application/json",
    "Authorization" : `Bearer ${Token}`,
  };
  try {
    const response = await axios.post(url, request, { headers });
    responsedata.data = response.data;
  } catch (error) {
    responsedata.isexception = true;
    responsedata.exceptionmessage = error.response.data ;
  }
  return responsedata;
}



export  async function ApiLoginRequest(url, request) {

  const responsedata = {
    isexception: false,
    exceptionmessage: "",
    data: null,
  };
  const headers = {
    "Content-Type": "multipart/form-data,application/json",
  };
  try {
    const response = await axios.post(url, request, { headers });
    responsedata.data = response.data;
  } catch (error) {
    responsedata.isexception = true;
    responsedata.exceptionmessage = error.response.data;
  }
  return responsedata;
}

