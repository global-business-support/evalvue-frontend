import React from "react";
import logo from '../assets/images/evalvuelogo.jpg'
import { NavLink } from "react-router-dom";
import footerBackgroundImage from '../assets/images/FooterBackgroundImage.png'

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
  function showRefundPolicy() {
    window.open(
      "http://test.api.evalvue.com/media/Refund/Refund%20Policy.pdf",
      "_blank"
    );
  }
  return (
    <div className={`bg-[#383433] min-h-78 max-h-content flex flex-col md:justify-center md:items-center justify-start items-center  text-zinc-300 py-8 px-4 bg-footer-bg bg-no-repeat bg-center bg-cover `}>
      
      
      <div className="w-full max-w-7xl flex flex-col items-center gap-10">
        <div className=" w-full flex md:flex-row flex-col gap-10 md:items-center justify-around">
          
        
       
          <nav className="md:ml-0 ml-8 flex md:flex-row flex-col md:items-center gap-4 mt-4 md:mt-0 sm:text-base text-sm text-white md:border-none border-l border-gray-700">
            <NavLink to='/' className="hover:text-primary-100 hover:underline md:border-l border-gray-700 ps-4">
              Home
            </NavLink>
            <NavLink to="/services" className="hover:text-primary-100 hover:underline md:border-l border-gray-700 ps-4">
              Services
            </NavLink>
          <NavLink to="/contact" className="hover:text-primary-100 hover:underline md:border-l border-gray-700 ps-4">
              Contact
           </NavLink >
          <NavLink to="/help" className="hover:text-primary-100 hover:underline md:border-l border-gray-700 ps-4">
              Help
           </NavLink >
            
            <NavLink onClick={showprivicy} className="hover:text-primary-100 hover:underline md:border-l border-gray-700 ps-4">
              Privacy
           </NavLink >

          <NavLink onClick={showRefundPolicy} to="/" className="hover:text-primary-100 hover:underline md:border-l border-gray-700 ps-4">
              Refund Policy
           </NavLink >

            <NavLink onClick={showtermandcondition} className="hover:text-primary-100 hover:underline md:border-l md:border-r border-gray-700 px-4">
              Terms and Conditions
           </NavLink >
          </nav>
          
         
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
        
        <div className="flex md:flex-row flex-col  items-center justify-center  ms:gap-10 gap-5 text-center mt-4 text-xs text-white border-t border-gray-700 w-full pt-5">
        <div className="flex space-x-4">
            {/* <img
              src={logo}
              alt="logo"
              className="size-20 rounded-full "
            /> */}
          </div>
          <p className="text-gray-300 md:text-base text-xs">© 2024 Global Business Support. All rights reserved.</p>
          </div>

      </div>
    </div>
  );
}

export default Footer;
