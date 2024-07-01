import React, { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Personalreview from "./Personalreview";
import { Rating } from "@material-tailwind/react";

function Enpreview() {
  const { state } = useLocation();
  const reviewref = useRef(0);


  const updateReviewCount = (count) => {
    reviewref.current.textContent = `Total Review : ${count}`;
  };


  return (
    <>
      <div className=" w-[95%] lg:mb-0 mb-14 flex justify-between z-[1] items-center mx-auto sticky top-[47px]  bg-white p-4  rounded-lg">
        <div className="flex justify-center items-center gap-5">
          <div className="h-20 w-20 border border-zinc-300 rounded-full">
            <img
              src={state.empimage}
              alt=""
              className="h-full w-full object-cover rounded-full"
            />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-primary-100">
              {state.empname}
            </h1>
            <p className="text-xs font-regular text-primary-100">
              {state.empdesignation}
            </p>
          </div>
        </div>
        <div className="mt-1 p-3 flex gap-2">
          {/* <span className="text-gray-800 font-semibold lg:text-lg sm:text-sm">Overall Rating:</span> */}
          {/* <Rating value={()=>{overallRating()}} readonly /> */}
        </div>
        <div className="flex justify-center flex-col items-center gap-2">
          <p className="text-base font-semibold" ref={reviewref}></p>
          <div className="flex justify-end">
            {state.aadhar?
            <NavLink to={'newpost'} state={state}>
              <button className=' text-white bg-primary-100 font-semibold py-2 px-5 rounded border border-primary-100 sm:text-xl text-sm'> <span className="font-bold sm:text-xl text-sm"> + </span> Add Review</button>
            </NavLink>:""}
          </div>
        </div>
      </div>
      <Outlet
        context={{
          empid: state.empid,
          emporgid: state.emporgid,
          state: state,
          updateReviewCount: updateReviewCount,
          // overallRating:overallRating,
        }}
      />
    </>
  );
}

export default Enpreview;
