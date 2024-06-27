import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Contextfile";
import { useLocation, useNavigate } from "react-router-dom";
import Tittle from "../Tittle";
import Loader from "./Loader";
const apiUrl = import.meta.env.VITE_API_URL;
function Passwordotp(props) {
  Tittle("Verified OTP - Evalvue");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [otpSent, setOtpSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
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
  console.log(state);
  // Initialize user_id from context
  let user_id = userId;

  useEffect(() => {
    // Set the email state if it exists in location state and not in forget mode
    if(state.isForget){
      setuserverification(true)
      setemployeeverification(false)
    }else if(state.addemp){
      setuserverification(false)
      setemployeeverification(true)
    }
    if (!state.isForget) {
      setEmail(state.email);
    }

    // If email exists and not in forget mode, automatically submit to send OTP
    if (email && !state.isForget) {
      handleEmailSubmit();
    }

    // Navigate to password generation page if OTP is verified and it is for forget password
    if (isOtpVerified && state.isForget) {
      navigate("/passgenerate");
    }
  }, [isOtpVerified, state.isForget, navigate, email]);

  // Function to handle email submission
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
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.otp_send_successfull) {
        setIsEmailSent(true);
        setUserId(data.user_id);
        setOtpSent(true);
        setTimeLeft(120);
        setShowResendButton(false);
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setError("Failed to send email. Please try again.");
    }
    setLoading(false);
  };

  // Function to handle OTP input change
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  // Function to handle OTP input key down (Backspace)
  const handleKeyDown = (element, index, event) => {
    if (event.key === "Backspace") {
      if (element.previousSibling && !element.value) {
        element.previousSibling.focus();
      }
      setOtp([...otp.map((d, idx) => (idx === index ? "" : d))]);
    }
  };

  // Function to handle OTP submission
  const handleOtpSubmit = async () => {
    const otpCode = otp.join("");

    try {
      const response = await fetch(`${apiUrl}/verify/otp/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user_id,
          otp_number: otpCode,
          email,
          user_verification: userverification,
          employee_verification: employeeverification,
        }),
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

  // Function to handle resend OTP
  useEffect(() => {
    let timer;
    if (otpSent && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timeLeft === 0) {
      setShowResendButton(true);
    }

    return () => clearInterval(timer);
  }, [otpSent, timeLeft]);

  if (loading) {
    return (
      <>
        <div className=" w-full h-[100vh] flex justify-center items-center">
          <Loader />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-zinc-100 rounded-lg shadow-lg p-8 max-w-lg w-full">
          {/* Conditional rendering based on OTP and email verification status */}
          {!isOtpVerified ? (
            !isEmailSent ? (
              state.isForget ? (
                <>
                  <h2 className="text-center text-2xl font-semibold mb-6">
                    Send Verification Email
                  </h2>
                  {error && (
                    <p className="text-red-500 text-center mb-4">{error}</p>
                  )}
                  <form onSubmit={handleEmailSubmit}>
                    <div className="mb-4">
                      <label htmlFor="email" className="block mb-2">
                        Email
                      </label>
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
                      <span aria-hidden="true" className="text-3xl">
                        ×
                      </span>
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
                  {error && (
                    <p className="text-red-500 text-center mt-4">{error}</p>
                  )}
                  <button
                    className="mt-6 bg-primary-100 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded w-full"
                    onClick={handleOtpSubmit}
                  >
                    Continue
                  </button>
                  {otpSent && timeLeft > 0 && (
                    <p className="text-sm text-center mt-4">
                      OTP is valid for {timeLeft} seconds
                    </p>
                  )}
                  {showResendButton && (
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
                    <span aria-hidden="true" className="text-3xl">
                      ×
                    </span>
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
                {error && (
                  <p className="text-red-500 text-center mt-4">{error}</p>
                )}
                <button
                  className="mt-6 bg-primary-100 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded w-full"
                  onClick={handleOtpSubmit}
                >
                  Continue
                </button>
                {otpSent && timeLeft > 0 && (
                  <p className="text-sm text-center mt-4">
                    OTP is valid for {timeLeft} seconds
                  </p>
                )}
                {showResendButton && (
                  <p className="text-sm text-center mt-4">
                    Didn't receive an email?
                    <button
                      className="text-primary-100 hover:text-blue-600 font-semibold"
                      onClick={() => {
                        handleEmailSubmit();
                        console.log("clicked");
                      }}
                    >
                      RESEND OTP
                    </button>
                  </p>
                )}
              </>
            )
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">
                OTP Verification Successful
              </h2>
              {isEmailVerified && (
                <>
                  <p className="text-zinc-600 mb-4">
                    Your email has been successfully verified. You can now log
                    in.
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
    </>
  );
}

export default Passwordotp;
