import React, { useRef } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Personalreview from "./Personalreview";
import { Rating } from "@material-tailwind/react";

function Enpreview() {
  const { state } = useLocation();
  const reviewref = useRef(0);

  const updateReviewCount = (count) => {
    reviewref.current.textContent = `Total Review: ${count}`;
  };

  return (
    <>
      <div className="sm:flex-col lg:flex-row w-[95%] flex justify-between items-center mx-auto m-10 mb-6 bg-white p-4 w-5/6 rounded-lg ">
        <div className="flex justify-center items-center gap-5 sm:gap-8 ">
          <div className="h-16 w-16 border border-zinc-300 rounded-full">
            <img
              src={state.empimage}
              alt=""
              className="h-full w-full object-cover rounded-full"
            />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-700">
              {state.empname}
            </h1>
            <p className="text-xs font-regular text-gray-600">
              {state.empdesignation}
            </p>
          </div>
        </div>
        <div className="mt-1 p-3 flex gap-2">
          <span className="text-gray-800 font-semibold lg:text-lg sm:text-sm">Overall Rating:</span>
          <Rating value={4} readonly />
        </div>
        <div className="flex justify-center flex-col items-center gap-2">
          <p className="text-sm font-semibold" ref={reviewref}></p>
          <div className="flex justify-end">
            <NavLink to={'newpost'} state={state}>
              <button className='bg-primary-100 text-white lg:py-2 lg:px-4 rounded lg:text-lg sm:py-1 sm:px-1 sm:text-sm'>+Add Review</button>
            </NavLink>
          </div>
        </div>
      </div>
      <Outlet
        context={{
          empid: state.empid,
          emporgid: state.emporgid,
          state: state,
          updateReviewCount: updateReviewCount,
        }}
      />
    </>
  );
}

export default Enpreview;
