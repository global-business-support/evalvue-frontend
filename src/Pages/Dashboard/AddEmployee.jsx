import React, { useState, useEffect } from "react";
import aboutimg from "../../assets/images/about-img.jpg";
import Loader from "../Loader";
import Apibackendrequest from "../Apibackendrequest";
import bgImg from "../../assets/images/FooterBackgroundImage.png";
import { useLocation } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

function AddEmployee() {
  const [orgList, setOrgList] = useState([]);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(120);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState("");
  const [selectedOrg, setSelectedOrg] = useState({
    // user_id: userId,
    // organization_id: location.state?.organization_id || "",
    // gstin:""
  });
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const state = location.state;

  function orgHandler(e) {
    const name = e.target.name;
    const value = e.target.value;
    setSelectedOrg((values) => ({ ...values, [name]: value }));
    // Remove error for this field when user enters a value
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  }

  

  const SendOTP = async (e) => {
    setError("");
    console.log("before");
    const email = state.employee_email;
    console.log(email);
    e.preventDefault();
    console.log("after");
    console.log(state.employee_email);
    try {
      const response = await fetch(`${apiUrl}/shoot/otp/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, user_varification : false, employee_varification : true }),
      });

      const data = await response.json();

      if (data.otp_send_successfull) {
        setIsEmailSent(true);
        setUserId(data.user_id);
        setOtpSent(true);
        setTimeLeft(120);
        setShowResendButton(false);
        setLoading(false);
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setError("Failed to send email. Please try again.");
    }
    setLoading(false);
  };

  const verifyOTP = async () => {
    const otpCode = otp.join("");

    try {
      const response = await fetch(`${apiUrl}/verify/otp/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: user_id, otp_number: otpCode, email }),
      });

      const data = await response.json();

      if (response.ok) {
        if (
          data.otp_verified_successfull &&
          data.is_email_verified_successfull
        ) {
          setIsOtpVerified(true);
          setIsEmailVerified(true);
        } else if (data.otp_is_expired) {
          setError("OTP is expired. Please request a new one.");
        } else {
          setError(data.error || "OTP verification failed. Please try again.");
        }
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setError("Failed to verify OTP. Please try again.");
    }
  };

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };


  // useEffect(() => {
  //   let timer;
  //   if (otpSent && timeLeft > 0) {
  //     timer = setInterval(() => {
  //       setTimeLeft((prev) => prev - 1);
  //     }, 1000);
  //   }

  //   if (timeLeft === 0) {
  //     setShowResendButton(true);
  //   }

  //   return () => clearInterval(timer);
  // }, [otpSent, timeLeft]);

  if (loading) {
    return (
      <>
        <div className="h-[calc(100vh-200px)] flex justify-center items-center">
          <Loader />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="min-h-full mx-auto md:w-[60%] bg-white p-2 rounded-lg flex flex-col items-center">
        <div className="h-20 w-full bg-gray-300 rounded-lg"></div>
        <div className="w-full flex flex-col items-center mt-[-60px]">
          <img
            src={state?.employee_image}
            alt=""
            className="h-28 w-28 rounded-full"
          />
          <div className="mt-8 text-gray-800 space-y-1">
            <h1 className="text-xl">{state?.employee_name}</h1>
            <h1 className="text-sm">{state?.employee_designation}</h1>
            <h1 className="text-sm font-bold">{state?.employee_email}</h1>
            <h1 className="text-sm">
              Mobile No. :{" "}
              <span className="font-bold">{state?.employee_mobileNumber}</span>
            </h1>
            <h1 className="text-sm">
              Aadhar No. :{" "}
              <span className=" font-bold">
                {state?.employee_aadhar_number}
              </span>
            </h1>
          </div>
        </div>
        <div className="mt-5 flex flex-col">
          <label htmlFor="organization"> Please select Organization : </label>
          <select
            name="organization"
            id="organization"
            onChange={() => orgHandler}
          >
            <option value="">--Please Select--</option>
            {orgList.map((org, index) => (
              <option key={index} value={org.id}>
                {org.name}
              </option>
            ))}
          </select>
          {errors?.org?.name && (
            <span className="text-red-600 text-sm">
              {errors.organization_image}
            </span>
          )}
        </div>

        <>
          <div className="flex justify-between items-center mt-10">
            <h2 className="font-bold text-xl">Please Enter OTP</h2>
          </div>
          <p className="text-sm text-zinc-600 mt-4">
            Please enter the 6-digit OTP that was sent to your email
            <span className="text-red-500"> *</span>
          </p>
          <div className="w-[60%] flex justify-between gap-2 mt-4">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                className="w-full bg-zinc-200 rounded p-2 text-center"
                maxLength={1}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e.target, index, e)}
                onFocus={(e) => e.target.select()}
              />
            ))}
          </div>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}

          {timeLeft > 0 && (
            <p className="text-sm text-center mt-4">
              OTP is valid for {timeLeft} seconds
            </p>
          )}
          {
            <p className="text-sm text-center mt-4">
              Didn't receive an email?
              <button
                className="text-primary-100 hover:text-blue-600 font-semibold"
                onClick={() => {
                  handleEmailSubmit();
                }}
              >
                RESEND OTP
              </button>
            </p>
          }
        </>
        <>
          <button
            onClick={(e) => {
              SendOTP(e);
            }}
            className=" mt-5 px-8 py-2 bg-primary-100 rounded-lg text-white"
          >
            Send otp
          </button>
          {/* <button
          onClick={()=>{
            verifyOTP()
          }}
          className=" mt-5 px-8 py-2 bg-primary-100 rounded-lg text-white">
            Confirm
          </button> */}
        </>
      </div>
    </>
  );
}

export default AddEmployee;
