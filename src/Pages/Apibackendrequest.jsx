import axios from "axios";
import { useState } from "react";

export default async function Apibackendrequest(url, request) {

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

