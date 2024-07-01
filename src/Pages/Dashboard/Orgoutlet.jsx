import axios from "axios";
import React from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { Outlet, useNavigate } from "react-router-dom";


function Orgoutlet() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Navigate back one step
  };
  const handleForword = () => {
    navigate(+1); // Navigate back one step
  };

  return (
    <div>
      <div className=" w-full flex justify-end sticky z-[2] " style={{ top: "0px" }}>
      <div
            className="lg:w-full z-[-1] w-fit px-5 py-2 bg-[#e6eaee] lg:flex hidden lg:justify-between justify-end sticky "
            style={{ top: "0px" }}>
            <button
              onClick={handleBack}
              className=" p-2  text-gray-800 rounded ">
              <FaArrowAltCircleLeft className="h-6 w-6" />
            </button>
            <button
              onClick={handleForword}
              className=" p-2 text-gray-800 rounded ">
              <FaArrowAltCircleRight className="h-6 w-6" />
            </button>
          </div>
          </div>
      <Outlet />
    </div>
  );
}

export default Orgoutlet;
