import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaMobileAlt,
  FaLock,
  FaKey,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import value from "../assets/images/register.jpg";

const Registration = () => {
  const [Registerdata, setRegisterdata] = useState({});
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
console.log(termsAccepted)
  const inputHandler = (event) => {
    const { name, value } = event.target;
    setRegisterdata((values) => ({ ...values, [name]: value }));

    if (name === "confirmPassword") {
      setConfirmPassword(value);
    } else {
      if (value.trim() !== "") {
        setFormErrors((errors) => ({ ...errors, [name]: "" }));
      }
    }

    if (name === "password" || name === "confirmPassword") {
      if (Registerdata.password !== confirmPassword) {
        setFormErrors((errors) => ({
          ...errors,
          confirmPassword: "Passwords do not match",
        }));
      } else {
        setFormErrors((errors) => ({ ...errors, confirmPassword: "" }));
      }
    }
  };

  const validate = () => {
    const errors = {};
    if (!Registerdata.name) errors.name = "Name is required";
    if (!Registerdata.email) errors.email = "Email is required";
    if (!Registerdata.mobile_number)
      errors.mobile_number = "Mobile number is required";
    if (!Registerdata.password) errors.password = "Password is required";
    if (Registerdata.password !== confirmPassword)
      errors.confirmPassword = "Passwords do not match";
    if (!termsAccepted)
      errors.termsAccepted = "You must accept the terms and conditions";
    return errors;
  };

  const register = (event) => {
    event.preventDefault();
    const errors = validate();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      axios
        .post("https://api.evalvue.com/create/user/", Registerdata, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          localStorage.setItem(
            "isLogin",
            res.data.is_user_register_successfull
          );
          if (res.data.is_user_register_successfull) {
            navigate("/verified", { state: { isForget: false } });
            return;
          } else {
            setError(res.data.error);
          }
        })
        .catch((error) => {
          setError(error.response.data.error);
        });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleTermsChange = () => {
    setTermsAccepted(!termsAccepted);
    if (termsAccepted) {
      setFormErrors((errors) => ({ ...errors, termsAccepted: "" }));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex justify-center bg-white shadow-md items-center w-full max-w-4xl">
        <div className="w-[55%] h-[570px] p-3 text-white text-center hidden lg:block">
          <img src={value} alt="Logo" className="h-[450px] mt-10" />
        </div>

        <div className="w-4/5 md:w-1/2 lg:1/3 bg-white p-8">
          <h2 className="text-[26px] font-bold mb-7 text-zinc-800">
            Create Account :-
          </h2>
          <form onSubmit={register}>
            <div className="mb-4 relative">
              <p className="text-[red]">{error ? error : ""}</p>

              <label
                htmlFor="name"
                className="block text-zinc-500 text-sm font-medium mb-1 ml-0"
              >
                Name:
                <span className="text-[red]">*</span>
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-logo-100" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  onChange={inputHandler}
                  value={Registerdata.name || ""}
                  className={`border ${
                    formErrors.name ? "border-red-500" : "border-gray-300"
                  } rounded-md px-3 py-2 pl-10 w-full`}
                />
              </div>
              {formErrors.name && (
                <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
              )}
            </div>

            <div className="mb-4 relative">
              <label
                htmlFor="email"
                className="block text-zinc-500 text-sm font-medium mb-1 ml-0"
              >
                Email:
                <span className="text-[red]">*</span>
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-logo-100" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  onChange={inputHandler}
                  value={Registerdata.email || ""}
                  className={`border ${
                    formErrors.email ? "border-red-500" : "border-gray-300"
                  } rounded-md px-3 py-2 pl-10 w-full`}
                />
              </div>
              {formErrors.email && (
                <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
              )}
            </div>

            <div className="mb-4 relative">
              <label
                htmlFor="mobile"
                className="block text-zinc-500 text-sm font-medium mb-1 ml-0"
              >
                Mobile Number:
                <span className="text-[red]">*</span>
              </label>
              <div className="relative">
                <FaMobileAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-logo-100" />
                <input
                  type="tel"
                  id="mobile"
                  name="mobile_number"
                  placeholder="Mobile Number"
                  maxLength={10}
                  onChange={inputHandler}
                  value={Registerdata.mobile_number || ""}
                  className={`border ${
                    formErrors.mobile_number
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md px-3 py-2 pl-10 w-full`}
                />
              </div>
              {formErrors.mobile_number && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.mobile_number}
                </p>
              )}
            </div>

            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-zinc-500 text-sm font-medium mb-1 ml-0"
              >
                Password:
                <span className="text-[red]">*</span>
              </label>
              <div className="relative">
                <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-logo-100" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Password"
                  onChange={inputHandler}
                  value={Registerdata.password || ""}
                  className={`border ${
                    formErrors.password ? "border-red-500" : "border-gray-300"
                  } rounded-md px-3 py-2 pl-10 w-full`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-logo-100"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {formErrors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.password}
                </p>
              )}
            </div>

            <div className="mb-4 relative">
              <label
                htmlFor="confirmPassword"
                className="block text-zinc-500 text-sm font-medium mb-1 ml-0"
              >
                Confirm Password:
                <span className="text-[red]">*</span>
              </label>
              <div className="relative">
                <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-logo-100" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={inputHandler}
                  value={confirmPassword}
                  className={`border ${
                    formErrors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md px-3 py-2 pl-10 w-full`}
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-logo-100"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {formErrors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.confirmPassword}
                </p>
              )}
            </div>

            <div className="flex items-center mb-4">
              <input
                id="terms-checkbox"
                type="checkbox"
                className="w-4 h-4 text-primary-100 border-gray-300 rounded focus:ring-primary-100"
                checked={termsAccepted}
                onChange={handleTermsChange}
              />
              <label
                htmlFor="terms-checkbox"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                I agree with the{" "}
                <a
                  href="https://api.evalvue.com/media/Terms/Terms%20and%20Conditions.pdf"
                  className="text-primary-100 dark:text-primary-100 underline hover:underline"
                >
                  terms and conditions.
                </a>
    
              </label>
              
              {formErrors.termsAccepted && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.termsAccepted}
                </p>
              )}
            </div>
            <div className="flex justify-center mt-10">
              <button
                type="submit"
                className="flex font-semibold hover:bg-primary-100 transition duration-300 ease-in-out hover:text-white text-primary-100 border border-primary-100  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Create Your Account
              </button>
            </div>
            <p className="mt-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
              Already have an account?{" "}
              <NavLink to="/login">
                <button
                  type="button"
                  className="font-semibold text-primary-100 hover:text-indigo-500 focus:outline-none"
                >
                  Login Now
                </button>
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
