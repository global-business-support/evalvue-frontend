import React from "react";
import logo from '../assets/images/logo.png'

function Footer() {
  function showprivicy() {
    window.open(
      "http://api.evalvue.com/media/Policy/privacy%20policy.pdf",
      "_blank"
    );
  }
  function showtermandcondition() {
    window.open(
      "http://api.evalvue.com/media/Terms/Terms%20and%20Conditions.pdf",
      "_blank"
    );
  }
  return (
    <div className="bg-[#383433] min-h-96 max-h-content flex flex-col md:justify-center md:items-center justify-start items-center  text-zinc-300 py-8 px-4">
      
      <div className="w-full max-w-7xl ">
        <div className=" w-full flex md:flex-row flex-col gap-10 items-center justify-evenly">
          <div className="flex items-center space-x-4">
            <img
              src={logo}
              alt="logo"
              className="h-16 w-36"
            />
          </div>
       
          <nav className="md:ml-0 ml-8 flex flex-col gap-2 mt-4 md:mt-0 text-base text-white">
            <a href="/" className="hover:text-primary-100 hover:underline ">
              Home
            </a>
            <a href="/services" className="hover:text-primary-100 hover:underline ">
              Services
            </a>
            <a href="/contact" className="hover:text-primary-100 hover:underline">
              Contact
            </a>
            <a href="/help" className="hover:text-primary-100 hover:underline">
              Help
            </a>
            
            <a onClick={showprivicy} className="hover:text-primary-100 hover:underline">
              Privacy
            </a>

            <a href="/" className="hover:text-primary-100 hover:underline">
              Refund Policy
            </a>

            <a onClick={showtermandcondition} className="hover:text-primary-100 hover:underline">
              Terms and Conditions
            </a>
          </nav>
          <div className="md:text-end text-center mt-4 text-sm text-white">
          © 2024 Global Business Support. All rights reserved.
          </div>
          {/* <div className="mt-4 md:mt-0 flex items-center space-x-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 rounded-md border text-primary-100 text-lg placeholder:text-white border-gray-600 bg-gray-400 "
            />
            <button className="bg-gray-400 border-2 p-2 rounded-md hover:bg-gray-700 transition duration-300">
              Subscribe
            </button>
          </div> */}
        </div>
        
      </div>
    </div>
  );
}

export default Footer;
