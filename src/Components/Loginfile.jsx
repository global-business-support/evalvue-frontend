import React, { useContext, useState } from 'react';
import { FaEnvelope, FaKey } from "react-icons/fa";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from '../Contextfile';
import logo from '../assets/images/evalvuelogo.jpg'
// import { Spinner } from "@material-tailwind/react";

const Loginfile = () => {
  const [Formdata, setFormdata] = useState({});
  const [Loginerror, setLoginerror] = useState({});
  const [networkError, setNetworkError] = useState(null);
  const [loading, setLoading] = useState(false);
  const {setUserId}=useContext(UserContext);
  const navigate = useNavigate(); 

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormdata((values) => ({ ...values, [name]: value }));
  };

  const baseurl = "https://api.evalvue.com/login/user/";

  const submithandle = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true before starting the request
    setNetworkError(null); // Reset network error before starting the request

    try {
      const res = await axios.post(baseurl, Formdata);
      localStorage.setItem("isLogin", res.data.is_login_successfull);
      if (res.data.is_login_successfull && res.data.is_user_verified) {
        setUserId(res.data.user_id);
        navigate("/organization",{state:{is_login_successfull:res.data.is_login_successfull,is_user_verified:res.data.is_user_verified}});
        return;
      }
      else{
        navigate('/verified', { state: { isForget: false } });
        return;
      }
    } catch (err) {
      if (!err.response) {
        // Network error
        setNetworkError("Network error, please try again later.");
      } else {
        setLoginerror(err.response.data);
      }
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };
 
  return (
    <div className="h-screen flex items-center justify-center bg-gray-200">
      <div className=" md:w-full md:m-8 lg:w-2/3 xl:w-1/2   bg-white  flex justify-center items-center gap-4">
        <div className=" md:w-1/2 w-full p-10">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-sans font-bold">Hello Again</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Welcome back, you've been missed
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={submithandle}>
            <div className="relative">
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-logo-100" />
              </div>
              <input
                id="email-address"
                name="email"
                value={Formdata.email || ""}
                type="email"
                autoComplete="email"
                required
                placeholder="Email"
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaKey className="text-logo-100" />
              </div>
              <input
                id="password"
                name="password"
                value={Formdata.password || ""}
                type="password"
                autoComplete="current-password"
                required
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
            <NavLink to='/verified' state={{ isForget: true }}  >
              <button
                type="button"
                className="font-medium text-sm ml-40 font-semibold  text-primary-100 hover:text-indigo-500 focus:outline-none"
               
              >
                Forgot Password?
              </button>
            </NavLink>
            {Loginerror.error && <p className="text-red-500 font-medium">{Loginerror.error}</p>}
            {networkError && <p className="text-red-500 font-medium">{networkError}</p>}
            <div>
              <button
                type="submit"
                className="w-full hover:bg-primary-100 transition duration-300 ease-in-out hover:text-white text-primary-100 border border-primary-100 font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={loading}
                
                 // Disable button when loading
              >
                {loading ? 'Logging in...' : 'LOGIN'}
              </button>
            </div>
          </form>
          <p className="mt-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
            Don't have registration yet?{" "}
            <NavLink to="/register" state={{ isForget: false }}>
              <button
                type="button"
                className="font-semibold  text-primary-100 hover:text-indigo-500 focus:outline-none"

              >
                Register Now
              </button>
            </NavLink>
          </p>
        </div>
        <div className="w-1/2 flex justify-center items-center md:block h-[400px] text-white ">
            <img src={logo}  className='h-[300px] w-[300px] mx-auto my-10' alt="" />
        </div>
      </div>
    </div>
  );
};

export default Loginfile;
