import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";


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
      <div
        className="px-5 py-5 bg-[#e6eaee] flex lg:justify-between justify-end sticky z-30 "
        style={{ top: "0px" }}
      >
        <button onClick={handleBack} className=" p-2  text-gray-800 rounded ">
          <FaArrowAltCircleLeft className="h-6 w-6" />
        </button>
        <button onClick={handleForword} className=" p-2 text-gray-800 rounded ">
          <FaArrowAltCircleRight className="h-6 w-6" />
        </button>
      </div>
      <Outlet />
    </div>
  );
}

export default Orgoutlet;
