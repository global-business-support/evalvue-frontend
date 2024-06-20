import { Outlet, useNavigate } from "react-router-dom";
import DashboardNavigation from "../Dashboard/DashboardNavigation";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";

import Tittle from "../../Tittle";

function Dashboard() {
  Tittle("Dashboard - Evalvue");
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Navigate back one step
  };
  const handleForword = () => {
    navigate(+1); // Navigate back one step
  };

  return (
    <>
      <div className="h-[calc(100vh-80px)] bg-white rounded-3xl flex pt-3 ">
        <DashboardNavigation />
        <div className=" rounded-lg h-[calc(100vh-100px)] w-full  relative overflow-auto scrollbar-custom bg-[#e6eaee]">
          <div className="px-5 py-5 bg-[#e6eaee] flex justify-between sticky z-30 " style={{top:'0px'}}>
            <button
              onClick={handleBack}
              className=" p-2  text-gray-800 rounded "
            >
              <FaArrowAltCircleLeft className="h-6 w-6" />
            </button>
            <button
              onClick={handleForword}
              className=" p-2 text-gray-800 rounded "
            >
              <FaArrowAltCircleRight className="h-6 w-6" />
            </button>
          </div>

          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
