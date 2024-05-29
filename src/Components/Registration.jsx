import React from 'react';
import value from '../assets/images/register.jpg';
import { FaUser, FaEnvelope, FaMobileAlt, FaLock,FaKey } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Registration = () => {
  
  const [Registerdata, setRegisterdata] = useState({});
  const [error,seterror]=useState("");
  const navigate=useNavigate();
  
  const inputhandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setRegisterdata((values) => ({ ...values, [name]: value }));
  };
  function register(event) {
    event.preventDefault();
    axios
      .post("https://api.evalvue.com/create/user/", Registerdata, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        localStorage.setItem("isLogin",res.data.is_user_register_successfull);
        console.log(res)
        if(res.data.is_user_register_successfull){
          navigate("/verified", {state:{isForget:false}});
          return;
        }
        else{
          console.log(res.data.error)
          seterror(res.data.error);
        }
        
      })
      .catch(error=>{
        console.log(error);
      })
    }

  return (
    <div className="flex justify-center items-center min-h-screen bg-zinc-100">
      <div className="flex justify-center items-center w-full max-w-4xl ">
        <div className="w-[55%] h-[570px] p-3 text-white text-center hidden lg:block">
            <img
              src={value}
              alt="Logo"
              className=" h-[450px] mt-10 "
            />
         
        </div>

        <div className="w-4/5 md:w-1/2 lg:1/3 bg-white p-8  ">
          <h2 className="text-[26px] font-bold mb-7 text-zinc-800">Create Account :-</h2>
          <form onSubmit={register}>
            <div className="mb-4 relative">
              <p>{error?error:""}</p>

              <label
                htmlFor="name"
                className="block text-zinc-500 text-sm font-medium mb-1 ml-2"
              >
                Name:
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-logo-100" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  onChange={inputhandler}
                  value={Registerdata.name || ""}
                />
              </div>
            </div>
            <div className="mb-4 relative">
      <label
        htmlFor="email"
        className="block text-zinc-500 text-sm font-medium mb-1 ml-2"
      >
        Email:
      </label>
      <div className="relative">
        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-logo-100" />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          onChange={inputhandler}
          value={Registerdata.email || ""}
        />
      </div>
    </div>

    <div className="mb-4 relative">
      <label
        htmlFor="mobile"
        className="block text-zinc-500 text-sm font-medium mb-1 ml-2"
      >
        Mobile Number:
      </label>
      <div className="relative">
        <FaMobileAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-logo-100" />
        <input
          type="tel"
          id="mobile"
          name="mobile_number"
          placeholder="Mobile Number"
          maxLength={10}
          onChange={inputhandler}
          value={Registerdata.mobile_number || ""}
        />
      </div>
    </div>

    <div className="mb-4 relative">
      <label
        htmlFor="password"
        className="block text-zinc-500 text-sm font-medium mb-1 ml-2"
      >
        Password:
      </label>
      <div className="relative">
        <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-logo-100" />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          onChange={inputhandler}
          value={Registerdata.password || ""}
        />
      </div>
    </div>

    {/* <div className="mb-6 relative">
      <label
        htmlFor="confirm-password"
        className="block text-zinc-500 text-sm font-medium mb-1 ml-2"
      >
        Confirm Password:
      </label>
      <div className="relative">
        <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-logo-100" />
        <input
          type="password"   
          id="confirm-password" 
          name="confirm_password"
          placeholder="Confirm Password"
          onChange={inputhandler}
          value={Registerdata.confirm_password || ""}
        />
      </div>
    </div> */}

            {/* Other input fields with icons */}
    <div className='flex justify-center mt-10'>
            <button
              type="submit"
              className=" flex font-semibold hover:bg-primary-100 transition duration-300 ease-in-out hover:text-white text-primary-100 border border-primary-100 font-medium py-2 px-4  rounded focus:outline-none focus:shadow-outline"
            >
              Create Your Account
            </button>
            </div>
            <p className="mt-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
            Already have a Account?{" "}
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
}

export default Registration;