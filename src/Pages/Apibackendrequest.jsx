import axios from "axios";
import { useState } from "react";

async function Apibackendrequest(url, request) {
  const [Loading, setLoading] = useState(true);
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
    responsedata.data = response;
  } catch (error) {
    responsedata.isexception = true;
    responsedata.exceptionmessage =
      "Something went wrong, please try after sometime";
    console.error("API Request Error:", error);
  }
  setLoading(false);
  return responsedata;
}

export default Apibackendrequest;
