import React, { useContext, useState } from "react";
import { FaEnvelope, FaKey, FaCheck, FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import { FaX } from "react-icons/fa6";

import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../Contextfile";
import logo from "../assets/images/evalvuelogo.jpg";
import Loader from "../Pages/Loader";
import { ValidateEmail, ValidatePassword } from "../Pages/Validation";
import Tittle from "../Tittle";
import Apibackendrequest from "../Pages/Apibackendrequest";
const apiUrl = import.meta.env.VITE_API_URL;

const Loginfile = () => {
  const [Formdata, setFormdata] = useState({ password: "", email: "" });
  const [Loginerror, setLoginerror] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to track password visibility
  const { setUserId } = useContext(UserContext);
  const navigate = useNavigate();
  const [validemailicon, setValidEmailIcon] = useState(false);
  const [validpasswordicon, setValidPasswordIcon] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  Tittle("Login page - Evalvue");
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "email") {
      setValidEmailIcon(ValidateEmail(value).isValid);
    } else if (name === "password") {
      setValidPasswordIcon(ValidatePassword(value).isValid);
    }

    setFormdata((values) => ({ ...values, [name]: value }));
    if (value.trim() !== "") {
      setFormErrors((errors) => ({ ...errors, [name]: "" }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validate = () => {
    const errors = {};
    if (!Formdata.email) errors.email = "Email is required";
    if (!Formdata.password) errors.password = "Password is required";
    return errors;
  };

  const submithandle = async (event) => {
    event.preventDefault();

    const errors = validate();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setLoading(true);
      const res = await Apibackendrequest(`${apiUrl}/login/user/`, Formdata);
      if (res.data) {
        localStorage.setItem("isLogin", res.data.is_login_successfull);
        if (res.data.is_login_successfull && res.data.is_user_verified) {
          setUserId(res.data.user_id);
          navigate("/organization", {
            state: {
              is_login_successfull: res.data.is_login_successfull,
              is_user_verified: res.data.is_user_verified,
            },
          });
        } else if (res.data.is_user_verified == false) {
          navigate("/verified", {
            state: { isForget: false, email: Formdata.email },
          });
        }
      }
      setLoading(false);
      if (res.isexception) {
        setLoginerror(res.exceptionmessage.error);
      }
    }
  };

  return (
    <>
      {loading ? (
        <div className="h-screen w-full flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="h-screen flex items-center justify-center bg-gray-200">
          <div className="md:w-full md:m-8 lg:w-[70%] xl:w-1/2 bg-white flex justify-center items-center gap-4 rounded-lg">
            <div className="md:w-1/2 w-full p-10">
              <div className="text-center">
                <img src={logo} className="h-20 mx-auto md:hidden" alt="" />
                <h2 className="mt-6 text-3xl font-sans font-bold">
                  Hello Again
                </h2>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  Welcome back, you've been missed
                </p>
              </div>
              <form className="mt-8 space-y-6" onSubmit={submithandle}>
                <div className="relative">
                  <div className="flex justify-center items-center">
                    <div className="absolute left-0 pl-3 flex items-center justify-center pointer-events-none">
                      <FaEnvelope className="text-logo-100" />
                    </div>
                    <input
                      id="email-address"
                      name="email"
                      value={Formdata.email || ""}
                      type="email"
                      autoComplete="email"
                      placeholder="Email"
                      onFocus={() => setIsEmailFocused(true)}
                      onBlur={() => setIsEmailFocused(false)}
                      onChange={handleChange}
                      className={`border ${
                        formErrors.email ? "border-red-500" : "border-gray-300"
                      } rounded-md px-3 py-2 pl-10 w-full`}
                    />
                    <div
                      className="ml-1"
                      title={ValidateEmail(Formdata.email).message}
                    >
                      {isEmailFocused &&
                        Formdata.email.length > 0 &&
                        (validemailicon ? (
                          <FaCheck className="text-green-500 text-sm" />
                        ) : (
                          <FaX className="text-red-500 text-sm" />
                        ))}
                    </div>
                  </div>
                  {formErrors.email && (
                    <p className="text-red-500 text-sm">{formErrors.email}</p>
                  )}
                </div>
                <div className="relative">
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <div className="flex justify-center items-center">
                    <div className="absolute left-0 pl-3 flex items-center pointer-events-none">
                      <FaKey className="text-logo-100" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      value={Formdata.password || ""}
                      type={showPassword ? "text" : "password"} // Toggle password visibility
                      autoComplete="current-password"
                      placeholder="Password"
                      onFocus={() => setIsPasswordFocused(true)}
                      onBlur={() => setIsPasswordFocused(false)}
                      onChange={handleChange}
                      className={`border ${
                        formErrors.password
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-md px-3 py-2 pl-10 w-full`}
                    />
                    {/* Add password visibility toggle icon */}
                    <div
                      className="absolute right-4 pr-3 flex items-center cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <FaEyeSlash className="text-logo-100" />
                      ) : (
                        <FaEye className="text-logo-100" />
                      )}
                    </div>
                    <div
                      className="ml-1"
                      title={ValidatePassword(Formdata.password).message}
                    >
                      {isPasswordFocused &&
                        Formdata.password.length > 0 &&
                        (validpasswordicon ? (
                          <FaCheck className="text-green-500 text-sm" />
                        ) : (
                          <FaX className="text-red-500 text-sm" />
                        ))}
                    </div>
                  </div>
                  {formErrors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.password}
                    </p>
                  )}
                </div>
                <div className="w-full flex mt-[3px!important] ml-[-14px] justify-end items-start">
                  <NavLink
                    to="/verified"
                    state={{ isForget: true }}
                    className="text-sm font-semibold text-primary-100 hover:text-indigo-500 focus:outline-none"
                  >
                    Forgot Password?
                  </NavLink>
                </div>
                {Loginerror && (
                  <p className="text-red-500 font-medium">{Loginerror}</p>
                )}

                <div>
                  <button
                    type="submit"
                    className="w-full hover:bg-primary-100 transition duration-300 ease-in-out hover:text-white text-primary-100 border border-primary-100 font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    disabled={loading}
                  >
                    {loading ? <Loader /> : "LOGIN"}
                  </button>
                </div>
              </form>
              <p className="mt-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
                Don't have registration yet?{" "}
                <NavLink to="/register" state={{ isForget: false }}>
                  <button
                    type="button"
                    className="font-semibold text-primary-100 hover:text-indigo-500 focus:outline-none"
                  >
                    Register Now
                  </button>
                </NavLink>
              </p>
            </div>

            <div className="w-1/2  justify-center items-center md:flex hidden h-[400px] text-white">
              <img
                src={logo}
                className="h-[300px] w-[300px] md:block hidden mx-auto my-10"
                alt=""
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Loginfile;
