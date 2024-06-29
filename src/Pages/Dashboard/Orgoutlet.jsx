import axios from "axios";
import React from "react";
import { Outlet } from "react-router-dom";


function Orgoutlet() {


  return (
    <div>
      <Outlet />
    </div>
  );
}

export default Orgoutlet;
