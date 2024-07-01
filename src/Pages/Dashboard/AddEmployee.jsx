import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from "react";
import Loader from "../Loader";
import Apibackendrequest from "../Apibackendrequest";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../Contextfile";
import { NavLink } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import Clock from "../../Components/Clock";

const apiUrl = import.meta.env.VITE_API_URL;

function AddEmployee() {
  const [orgList, setOrgList] = useState([]);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [otpSent, setOtpSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState("");
  const [showResendButton, setShowResendButton] = useState(false);
  const [otpSentSuccessfull, setOtpSentSuccessfull] = useState(false);
  const [isOtpVarified, setIsOtpVerified] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState("");
  const [ empMobileNumber,setEmpMobileNumber] = useState()
  const [showSuccessfull, setShowSuccessfull] = useState(false);
  const [loading, setLoading] = useState(false);
  const [
    is_terminated_employee_added_successfull,
    setIs_terminated_employee_added_successfull,
  ] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  const { userId } = useContext(UserContext);

  const timerRef = useRef(null);

  // const startTimer = useCallback(() => {
  //   setShowResendButton(false);
  //   setTimeLeft(120);
  //   if (timerRef.current) {
  //     clearInterval(timerRef.current);
  //   }
  //   timerRef.current = setInterval(() => {
  //     setTimeLeft((prev) => {
  //       if (prev === 1) {
  //         clearInterval(timerRef.current);
  //         setShowResendButton(true);
  //         return 0;
  //       }
  //       return prev - 1;
  //     });
  //   }, 1000);
  // }, []);

  useEffect(() => {
    const mobileNumber = String(state.employee_mobileNumber)
    const lastFour = mobileNumber.slice(-4);

    // Calculate the number of stars to prepend
    const starsCount = mobileNumber.length - 4;
    const stars = "*".repeat(starsCount);

    // Combine stars and last four characters
    const maskedNumber = stars + lastFour;
    setEmpMobileNumber(maskedNumber)
  }, []);

  function validate() {
    const newErrors = {};
    if (!selectedOrg) {
      newErrors.organization_list = "Please select Organization*";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const SendOTP = async (e) => {
    setError("");
    const email = state.employee_email;
    e.preventDefault();
    setLoading(true);
    const isCallApi = validate();
    if (isCallApi) {
      try {
        const response = await fetch(`${apiUrl}/shoot/otp/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            user_verification: false,
            employee_verification: true,
          }),
        });

        const data = await response.json();

        if (data.otp_send_successfull) {
          setOtpSentSuccessfull(true);
          setOtpSent(true);
          // startTimer(); // Start the timer when OTP is sent successfully
        } else {
          setError(data.error || "Something went wrong. Please try again.");
        }
      } catch (error) {
        console.log(error);
        setError(error);
      }
    }
    setLoading(false);
  };

  const verifyOTP = async () => {
    const otpCode = otp.join("");

    try {
      const response = await axios.post(`${apiUrl}/verify/otp/`, {
        user_id: userId,
        email: state.employee_email,
        otp_number: otpCode,
        employee_id: state.employee_id,
        organization_id: selectedOrg.organization_id,
        user_verification: false,
        employee_verification: true,
      });

      const data = response.data;

      if (response.status === 200) {
        if (
          data.otp_verified_successfull &&
          data.is_terminated_employee_added_successfull
        ) {
          setIsOtpVerified(true);
          setIs_terminated_employee_added_successfull(
            data.is_terminated_employee_added_successfull
          );
          console.log(is_terminated_employee_added_successfull);
          setShowSuccessfull(true);
          handleshowSuccessfull();
        } else if (data.otp_is_expired) {
          setError("OTP is expired. Please request a new one.");
        } else {
          setError(data.error || "OTP verification failed. Please try again.");
        }
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
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

  const handleKeyDown = (element, index, event) => {
    if (event.key === "Backspace") {
      if (element.previousSibling && !element.value) {
        element.previousSibling.focus();
      }
      setOtp([...otp.map((d, idx) => (idx === index ? "" : d))]);
    }
  };
  function Successfull() {
    console.log("function called");
    setTimeout(() => {
      navigate("/dashboard/organization");
      setShowSuccessfull(false);
    }, 3000);
  }
  function handleshowSuccessfull() {
    console.log(is_terminated_employee_added_successfull);
    if (is_terminated_employee_added_successfull) {
      Successfull();
      console.log("calling the function");
    }
  }

  function orgHandler(e) {
    const value = e.target.value;
    const selectedOrgId = parseInt(value); // Convert value to integer if needed
    setSelectedOrg((prevState) => ({
      ...prevState,
      organization_id: selectedOrgId,
    }));
    // Remove error for this field when user selects an option
    setErrors((prevErrors) => ({ ...prevErrors, organization: "" }));
  }

  useEffect(() => {
    setLoading(true);
    Apibackendrequest(`${apiUrl}/organizations/`)
      .then((res) => {
        const list = res.data.organization_list.filter((org) => {
          if (org.organization_verified) {
            return org;
          }
        });
        setOrgList(list);
        if (res.isexception) {
          setError(res.exceptionmessage.error);
        }
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleOTPSent = (e) => {
    SendOTP(e)
    console.log('OTP sent or resent');
    // Add any additional logic you want to perform when OTP is sent
  };

  if (loading) {
    return (
      <div className="h-[calc(100vh-200px)] flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return showSuccessfull ? (
    <div className="flex items-center justify-center  h-[calc(100vh-160px)] bg-zinc-100">
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center">
          <img
            undefinedhidden="true"
            alt="checkmark-icon"
            src="https://openui.fly.dev/openui/64x64.svg?text=✔"
            className="mb-4"
          />
          <h2 className="text-2xl font-semibold text-zinc-800 mb-2">
            Awesome!
          </h2>
          <p className="text-zinc-600 mb-6">
            Employee added to your Organization successfully
          </p>
          {/* <NavLink
            to={"/dashboard/organization"}
            className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 focus:outline-none"
          >
            Back to Organization List
          </NavLink> */}
        </div>
      </div>
    </div>
  ) : (
    <div className="mb-2 lg:mt-2 mt-14 min-h-[80%] mx-auto md:w-[60%] p-2 md:rounded-lg flex flex-col items-center bg-white">
      <div className="h-20 w-full bg-primary-100 rounded-lg p-2 flex items-start justify-end">
        <button
          className="text-3xl z-[5] text-white cursor-pointer"
          onClick={() => {
            navigate(-1);
          }}
        >
          <RxCross2/>
        </button>
      </div>
      <div className="w-full flex flex-col items-center mt-[-60px]">
        <img
          src={state?.employee_image}
          alt=""
          className="h-28 w-28 rounded-full border-4 border-white bg-white"
        />
        <div className="w-full mt-8 text-gray-800 text-start ms-10 space-y-1">
          <h1 className="text-2xl">{state?.employee_name}</h1>
          <h1 className="text-base">{state?.employee_designation}</h1>
          <h1 className="text-base ">{state?.employee_email}</h1>
          <h1 className="text-base text-gray-700 flex">
            Mobile No. :
            <h1 className="text-black">
              {" "}
              &nbsp;{empMobileNumber}
            </h1>
          </h1>
          <h1 className="text-base text-gray-700">
            Aadhar No. :
            <span className=" text-black">
              &nbsp;{state?.employee_aadhar_number}
            </span>
          </h1>
        </div>
      </div>
      <div className="mt-10 flex flex-col">
        <label htmlFor="organization"> Please select Organization : </label>
        <select
          name="organization"
          id="organization"
          value={selectedOrg.organization_id} // Assuming selectedOrg holds the selected organization state
          onChange={(e) => orgHandler(e)}
        >
          <option value="">--Please Select--</option>
          {orgList.map((org) => (
            <option key={org.organization_id} value={org.organization_id}>
              {org.name}
            </option>
          ))}
        </select>
        {errors?.organization_list && (
          <span className="text-red-600 text-sm">
            {errors.organization_list}
          </span>
        )}
      </div>
      {otpSentSuccessfull && (
        <div className="w-full flex flex-col items-center">
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
          
          {/* {otpSent && timeLeft > 0 && (
            <p className="text-sm text-center mt-4" ref={timerRef}>
              OTP is valid for {timeLeft} seconds
            </p>
          )} */}
          {/* {showResendButton && (
            <p className="text-sm text-center mt-4">
              Didn't receive an email?
              <button
                className="text-primary-100 hover:text-blue-600 font-semibold"
                onClick={(e) => SendOTP(e)}
              >
                RESEND OTP
              </button>
            </p>
          )} */}
        </div>
      )}

      {otpSentSuccessfull ? (
        <button
          onClick={verifyOTP}
          className="mt-5 px-8 py-2 bg-primary-100 rounded-lg text-white"
        >
          Confirm and Submit
        </button>
      ) : (
        <button
          onClick={(e) => SendOTP(e)}
          className="mt-5 px-8 py-2 bg-primary-100 rounded-lg text-white"
        >
          Send otp
        </button>
        // <Clock onOTPSent={(e)=>{handleOTPSent(e)}} />
      )}
    </div>
  );
}

export default AddEmployee;
