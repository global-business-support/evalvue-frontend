import { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "../Contextfile";
import { useLocation, useNavigate } from "react-router-dom";
import Tittle from "../Tittle";
import Loader from "./Loader";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

function Passwordotp(props) {
  Tittle("Verified OTP - Evalvue");

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [otpSent, setOtpSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showResendButton, setShowResendButton] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { userId, setUserId } = useContext(UserContext);
  const location = useLocation();
  const state = location.state;
  const [loading, setLoading] = useState(false);
  const [userverification, setuserverification] = useState(false);
  const [employeeverification, setemployeeverification] = useState(false);
  const timerRef = useRef(null);

  let user_id = userId;

  useEffect(() => {
    if (!state.isForget) {
      setEmail(state.email);
    }

    if (!isEmailSent && email && !state.isForget) {
      handleEmailSubmit();
    }

    if (isOtpVerified && state.isForget) {
      navigate("/passgenerate");
    }
  }, [isOtpVerified, state.isForget, email, isEmailSent]);

  const handleEmailSubmit = async (e) => {
    setError("");
    setLoading(true);
    if (e) e.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/shoot/otp/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          user_verification: !userverification,
          employee_verification: employeeverification,
        }),
      });

      const data = await response.json();

      if (data.otp_send_successfull) {
        setIsEmailSent(true);
        setUserId(data.user_id);
        setOtpSent(true);
        startTimer();
        setShowResendButton(false);
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setError("Failed to send email. Please try again.");
    }
    setLoading(false);
  };

  const startTimer = () => {
    setTimeLeft(120);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) return prev - 1;
        clearInterval(timerRef.current);
        setShowResendButton(true);
        return 0;
      });
    }, 1000);
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

  const handleOtpSubmit = async () => {
    const otpCode = otp.join("");
    if (otpCode.length < 1) {
      setError("please enter the OTP");
    } else {
      await axios.post(`${apiUrl}/verify/otp/`, {
        user_id: user_id,
        otp_number: otpCode,
        email,
        user_verification: state.isForget ? userverification : !userverification,
        employee_verification: employeeverification,
      }).then(response => {
        if (response.data.otp_verified_successfull && response.data.is_email_verified_successfull) {
          setIsOtpVerified(response.data.otp_verified_successfull);
          setIsEmailVerified(response.data.is_email_verified_successfull);
          if (state.isForget) {
            navigate("/passgenerate");
          }
        } else if (response.data.otp_is_expired) {
          setError("OTP is expired. Please request a new one.");
        } else if (response.data.incorrect_otp) {
          setError("Please enter correct OTP");
        } else {
          setError(response.error || "OTP verification failed. Please try again.");
        }
      });
    }
  };

  if (loading) {
    return (
      <div className="w-full h-[100vh] flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-zinc-100 rounded-lg shadow-lg p-8 max-w-lg w-full">
        {!isOtpVerified ? (
          !isEmailSent ? (
            state.isForget ? (
              <>
                <h2 className="text-center text-2xl font-semibold mb-6">
                  Send Verification Email
                </h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleEmailSubmit}>
                  <div className="mb-4">
                    <label htmlFor="email" className="block mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary-100 text-white p-2 rounded-lg hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-100"
                  >
                    Send OTP
                  </button>
                </form>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <h2 className="font-bold text-xl">
                    OTP Verification <span className="text-[red]">*</span>
                  </h2>
                  <button
                    className="text-zinc-400 hover:text-zinc-600"
                    onClick={() => (window.location.href = "/login")}
                  >
                    <span aria-hidden="true" className="text-3xl">×</span>
                  </button>
                </div>
                <p className="text-sm text-zinc-600 mt-4">
                  Please enter the 6-digit OTP that was sent to your email
                  <span className="text-red-500"> *</span>
                </p>
                <div className="flex justify-between gap-2 mt-4">
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
                <button
                  className="mt-6 bg-primary-100 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded w-full"
                  onClick={handleOtpSubmit}
                >
                  Continue
                </button>
                {otpSent && timeLeft > 0 && (
                  <p className="text-sm text-center mt-4">OTP is valid for {timeLeft} seconds</p>
                )}
                {showResendButton && (
                  <p className="text-sm text-center mt-4">
                    Didn't receive an email?
                    <button
                      className="text-primary-100 hover:text-blue-600 font-semibold"
                      onClick={handleEmailSubmit}
                    >
                      RESEND OTP
                    </button>
                  </p>
                )}
              </>
            )
          ) : (
            <>
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-xl">
                  OTP Verification <span className="text-[red]">*</span>
                </h2>
                <button
                  className="text-zinc-400 hover:text-zinc-600"
                  onClick={() => (window.location.href = "/login")}
                >
                  <span aria-hidden="true" className="text-3xl">×</span>
                </button>
              </div>
              <p className="text-sm text-zinc-600 mt-4">
                Please enter the 6-digit OTP that was sent to your email
                <span className="text-red-500"> *</span>
              </p>
              <div className="flex justify-between gap-2 mt-4">
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
              <button
                className="mt-6 bg-primary-100 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded w-full"
                onClick={handleOtpSubmit}
              >
                Continue
              </button>
              {otpSent && timeLeft > 0 && (
                <p className="text-sm text-center mt-4">OTP is valid for {timeLeft} seconds</p>
              )}
              {showResendButton && (
                <p className="text-sm text-center mt-4">
                  Didn't receive an email?
                  <button
                    className="text-primary-100 hover:text-blue-600 font-semibold"
                    onClick={handleEmailSubmit}
                  >
                    RESEND OTP
                  </button>
                </p>
              )}
            </>
          )
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">OTP Verification Successful</h2>
            {isEmailVerified && (
              <>
                <p className="text-zinc-600 mb-4">
                  Your email has been successfully verified. You can now log in.
                </p>
                <button
                  className="bg-primary-100 text-white p-2 rounded-lg hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-100"
                  onClick={() => navigate("/login")}
                >
                  Go to Login
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Passwordotp;
