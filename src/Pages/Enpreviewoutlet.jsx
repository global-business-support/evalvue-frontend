import React, { useEffect } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import Personalreview from './Personalreview'
import axios from 'axios'

function Enpreview() {

  const { state } = useLocation();
  console.log(state.empimage);
  return (
     <>
        <div className="flex justify-between items-center mx-auto m-10 mb-6 bg-white p-4 w-5/6 rounded-xl">
          <div className="flex justify-center items-center gap-5 ">
            <div className="h-16 w-16 border border-zinc-300 rounded-full p-1">
              <img src={state.empimage} alt="" className="h-full w-full object-contain rounded-full" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-700">{state.empname}</h1>
              <p className="text-xs font-regular text-gray-600">
              {state.empdesignation}
              </p>
            </div>
          </div>
          <div className="flex justify-center flex-col items-center gap-2">
            <p className="text-sm font-semibold">Total Review:0</p>
            <div className="flex justify-end">
              <NavLink to={'newpost'}
              state={state}
              >

          <button className='bg-primary-100 text-white py-2 px-3 rounded'>+Add Review</button>
              </NavLink>
        </div>
          </div> 
        </div>
        <Outlet empid={state.empid} emporgid={state.emporgid} state={state} />
        
        
     </>
  )
}

export default Enpreview