import React from "react";
import logo from '../assets/images/logo.png'

function Footer() {
  return (
    <div className="bg-gray-200 max-h-content flex flex-col md:justify-center md:items-center justify-start items-center  text-zinc-300 py-8 px-4">
      <div className="w-full max-w-7xl">
        <div className=" w-full flex flex-col gap-10 md:flex-row items-center  justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={logo}
              alt="logo"
              className="h-20 w-56"
            />
          </div>
       
          <nav className="flex space-x-4 mt-4 md:mt-0">
            <a href="/" className="hover:text-primary-100 hover:underline">
              Home
            </a>
            <a href="/services" className="hover:text-primary-100 hover:underline">
              Services
            </a>
            <a href="/contact" className="hover:text-primary-100 hover:underline">
              Contact
            </a>
            <a href="/help" className="hover:text-primary-100 hover:underline">
              Help
            </a>
            
            <a href="/privacy" className="hover:text-primary-100 hover:underline">
              Privacy
            </a>
          </nav>
          <div className="text-center mt-4 text-sm">
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
