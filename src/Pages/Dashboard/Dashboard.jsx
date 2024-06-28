import { Outlet, useNavigate } from "react-router-dom";
import DashboardNavigation from "../Dashboard/DashboardNavigation";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";

import Tittle from "../../Tittle";
import { useContext, useEffect } from "react";
import Apibackendrequest from "../Apibackendrequest";
import { UserContext } from "../../Contextfile";
const apiUrl = import.meta.env.VITE_API_URL;


function Dashboard() {
  const {setShowSearchByAadhaar} = useContext(UserContext);
  useEffect(()=>{
    Apibackendrequest(`${apiUrl}/organizations/`)
      .then((res) => { 
        res?.data?.organization_list?.map((organization)=>{
          if(organization.organization_verified == true){
            setShowSearchByAadhaar(true)
          } else {
            setShowSearchByAadhaar(false)
          }
        })
      })
      
  },[])
  Tittle("Dashboard - Evalvue");
  

  

  return (
    <>
      <div className="h-[calc(100vh-80px)] bg-white rounded-3xl flex pt-3 ">
        <DashboardNavigation />
        <div className=" rounded-lg h-[calc(100vh-100px)] w-full  relative overflow-auto scrollbar-custom bg-[#e6eaee]">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
