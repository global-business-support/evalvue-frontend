import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
function Empoutletoutlet() {
  const {state}=useLocation()
  return (
    <>
      
        <Outlet state={state} />
    </>
    
  );
}

export default Empoutletoutlet;
