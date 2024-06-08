import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaMobileAlt,
  FaKey,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
// import {Swiper,SwiperSlide} from 'swiper'

import logo from "../assets/images/logo.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";
import value from "../assets/images/register.jpg";
import { Margin } from "@mui/icons-material";

const Registration = () => {
  const [Registerdata, setRegisterdata] = useState({});
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  console.log(termsAccepted);
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
      <div className="flex justify-center items-center min-h-screen bg-gray-100 ">
     <div className="flex justify-center  shadow-md items-center w-full max-w-4xl rounded-xl">
      <div className="w-[50%] h-[640px] bg-primary-100 text-white text-center hidden lg:flex flex-col relative justify-center gap-14 items-center">
        <div className='h-[25%] flex flex-col justify-between items-center '>
          <div className=' '>
            <h1 className='text-4xl font-semibold'>Welcome to Evalvue</h1>
            <h1 className='text-sm font-semibold mt-2'> Where Your Journey to Success Begins!</h1>
          </div>
          <h1 className='text-xs w-[75%] text-gray-200 font-medium text-start border-l border-gray-400 ps-2'>
              "Invest in talent, reap success. Grow with the best. Investing in talent is an investment in the
               company's success, as it cultivates a culture of excellence and enables the organization to grow alongside its exceptional employees”
          </h1>
        </div>
        {/* <div className='h-full w-full absolute bg-[#0000008f] z-10 px-12 pt-20 flex flex-col items-center gap-22 text-start'>
          <div className='text-center '>
            <h1 className='text-4xl font-semibold'>Welcome to Evalvue</h1>
            <h1 className='text-sm font-semibold mt-2'> Where Your Journey to Success Begins!</h1>
          </div>
          <h1 className='text-sm text-gray-200 font-medium text-start border-l border-gray-400 ps-2'>
              "Invest in talent, reap success. Grow with the best. Investing in talent is an investment in the
               company's success, as it cultivates a culture of excellence and enables the organization to grow alongside its exceptional employees”
          </h1>
        </div>
        <img
         src={value}
        alt="Logo"
        className="h-full w-full object-cover"
        /> */}

        {/* slider */}
        <div className='h-60  w-[80%] '>
          <Swiper
          spaceBetween={30}
          pagination={{
          
            
          }}
        
          autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          }}
        
         modules={[Autoplay, Pagination]}
         className=" mySwiper text-black text-base">

        <SwiperSlide className='!h-[250px] rounded-xl p-2 border-2 border-indigo-300   text-white font-md bg-purple-900'>
          <div className='flex flex-col items-center gap-1 mb-4'>
            <img src="https://thumbs.dreamstime.com/b/profile-picture-caucasian-male-employee-posing-office-happy-young-worker-look-camera-workplace-headshot-portrait-smiling-190186649.jpg" alt=""className='rounded-full h-[95px] w-[135px] p-1 object-contain ' />
            <h1 >Good employees exhibit several key qualities that contribute to their effectiveness and value within an organization:</h1>
          </div>
          </SwiperSlide>
        <SwiperSlide className='!h-[250px] rounded-xl p-2 border-2 border-indigo-300   text-white font-md bg-purple-900'>
          <div className='flex flex-col items-center gap-1 mb-4'>
            <img src="https://thumbs.dreamstime.com/b/profile-picture-smiling-indian-young-businesswoman-look-camera-posing-workplace-headshot-portrait-happy-millennial-ethnic-190959731.jpg" alt=""className='rounded-full h-[95px] w-[135px] p-1 object-contain ' />
            <h1 >Good employees are dependable and consistently meet deadlines. They can be counted on to fulfill their responsibilities and follow through on commitments</h1>
          </div>
          </SwiperSlide>
        <SwiperSlide className='!h-[250px] rounded-xl p-2 border-2 border-indigo-300   text-white font-md bg-purple-900'>
          <div className='flex flex-col items-center gap-1 mb-4'>
            <img src="data:image/jpeg;base64,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" alt=""className='rounded-full h-[95px] w-[135px] p-1 object-contain ' />
            <h1 >A good employee is someone who consistently meets or exceeds expectations, communicates effectively, collaborates well with others and demonstrates a willingness to learn and grow</h1>
          </div>
          </SwiperSlide>
        <SwiperSlide className='!h-[250px] rounded-xl p-2 border-2 border-indigo-300   text-white font-md bg-purple-900'>
          <div className='flex flex-col items-center gap-1 mb-4'>
            <img src="data:image/jpeg;base64,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" alt=""className='rounded-full h-[95px] w-[135px] p-1 object-contain ' />
            <h1 >A good employee embodies a multitude of qualities that contribute to their success and the success of the organization.</h1>
          </div>
          </SwiperSlide>
        <SwiperSlide className='!h-[250px] rounded-xl p-2 border-2 border-indigo-300   text-white font-md bg-purple-900'>
          <div className='flex flex-col items-center gap-1 mb-4'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaNvHavDfcEK0AM3tEtV24X2EwqGvFx4kA4Q&s" alt=""className='rounded-full h-[95px] w-[135px] p-1 object-contain ' />
            <h1 >Adaptability is essential in today's fast-paced work environment, and a good employee embraces change with resilience.</h1>
          </div>
          </SwiperSlide>

        {/* <SwiperSlide  className='  rounded-xl p-2 border-2   text-gray-700  font-medium bg-white'>
          <div className='flex flex-col items-center gap-2 mb-4'>
            <img src={logo} alt=""className='rounded-full  h-[95px] w-[135px] p-2 object-contain' />
            <h1>Good employees are dependable and consistently meet deadlines. They can be counted on to fulfill their responsibilities and follow through on commitments</h1>
          </div>  
        </SwiperSlide>

        <SwiperSlide  className='  rounded-xl p-2 border-2   text-gray-700  font-medium bg-white'>
          <div className='flex flex-col items-center gap-2 mb-4'>
            <img src={logo} alt=""className='rounded-full  h-[95px] w-[135px] p-2 object-contain' />
            <h1>A good employee is like a Swiss Army knife - versatile, reliable, and always ready to tackle any task thrown their way. They're the ones who not only excel in their assigned roles but also go above and beyond to support their team and contribute to the overall success of the organization</h1>
          </div>
        </SwiperSlide>

        <SwiperSlide  className='  rounded-xl p-2 border-2   text-gray-700  font-medium bg-white'>
          <div className='flex flex-col items-center gap-2 mb-4'>
            <img src={logo} alt=""className='rounded-full  h-[95px] w-[135px] p-2 object-contain' />
            <h1>A good employee is someone who consistently meets or exceeds expectations, communicates effectively, collaborates well with others, takes initiative, is reliable, adaptable, and demonstrates a willingness to learn and grow.</h1>
          </div>
        </SwiperSlide>

        <SwiperSlide  className='  rounded-xl p-2 border-2   text-gray-700  font-medium bg-white'>
          <div className='flex flex-col items-center gap-2 mb-4 '>
            <img src={logo} alt=""className='rounded-full  h-[95px] w-[135px] p-2 object-contain' />
            <h1>Communication is another key attribute of a good employee. They effectively convey ideas, actively listen to others, and collaborate seamlessly with colleagues. Whether it's providing updates on project statuses or offering constructive feedback.</h1>
          </div>
        </SwiperSlide>

        <SwiperSlide  className='  rounded-xl p-2 border-2   text-gray-700  font-medium bg-white'>
          <div className='flex flex-col items-center gap-3 mb-4'>
            <img src={logo} alt=""className='rounded-full  h-[95px] w-[135px] p-2 object-contain' />
            <h1>Adaptability is essential in today's fast-paced work environment, and a good employee embraces change with resilience. They remain flexible and open-minded, quickly adjusting to new challenges or priorities as they arise.</h1>
          </div>
        </SwiperSlide> */}
        
          </Swiper>
          </div>  
      </div>


        <div className="w-4/5 md:w-1/2 lg:1/3 bg-white p-8 m-5 rounded-xl">
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
