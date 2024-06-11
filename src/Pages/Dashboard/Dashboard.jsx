import { Outlet, useNavigate } from 'react-router-dom';
import DashboardNavigation from '../Dashboard/DashboardNavigation';
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";


import Tittle from '../../Tittle';

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
            <div className='h-[calc(100vh-80px)] bg-white rounded-3xl flex p-3'>
                <DashboardNavigation />
                <div className='rounded-lg md:w-full h-[calc(100vh-100px)] overflow-auto scrollbar-custom w-full bg-[#e6eaee]'>
                    {/* Back Button */}
                    <div className="p-2 flex justify-between sticky top-0">
                        <button
                            onClick={handleBack}
                            className=" p-2  text-gray-800 rounded "
                        >
                            <FaArrowCircleLeft className='h-6 w-6' />

                        </button>
                        <button  onClick={handleForword}
                            className=" p-2  text-gray-800 rounded ">
                        <FaArrowAltCircleRight className='h-6 w-6'/>
                        </button>
                    </div>
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default Dashboard;
