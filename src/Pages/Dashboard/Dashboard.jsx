import { Outlet } from 'react-router-dom'
import DashboardNavigation from '../Dashboard/DashboardNavigation'
import MyProfile from '../Dashboard/MyProfile'

function Dashboard() {
    return (
        <>
            <div className=' h-[calc(100vh-80px)] bg-white rounded-3xl flex p-3'>
                <DashboardNavigation />
                <div className='rounded-lg md:w-full h-[calc(100vh-100px)] overflow-auto scrollbar-custom w-full  bg-blue-gray-100'>
                {/* bg-[#dae0e5] */}
                {/* bg-[#9eb2c45e] */}
                {/* bg-[#b4cade5e] */}
                {/* bg-[#2350783c] */}
                    <Outlet />
                    {/* <h1>hello</h1> */}
                </div>
                {/* <MyProfile /> */}
            </div>
        </>
    )
}

export default Dashboard