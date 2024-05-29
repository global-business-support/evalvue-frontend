import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

function Protected() {
     let orgshow=localStorage.getItem("isLogin");
  return (
     <>
     {
          orgshow?<Outlet/>:<Navigate to= "/login"/>
          
     }
     </>
  )
}

export default Protected