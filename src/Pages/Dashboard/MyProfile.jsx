
import React, { useState } from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import { Button, Drawer, Typography } from '@mui/material'

function MyProfile() {

    const [state, setState] = useState({
        top: false,
    })

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ [anchor]: open });
    };


    return (
        <>
            <div className='h-full lg:w-[280px] w-[220px] bg-white md:flex hidden flex-col gap-10 pt-10 lg:px-5 px-3 p-2'>
                <div>
                    <div className='flex items-center justify-center lg:gap-20 gap-10'>
                        <h1 className='lg:text-xl text-lg font-bold'>My Profile</h1>
                        <button>
                            <MoreHorizIcon className='text-gray-500' />
                        </button>
                    </div>
                    <h2 className='font-medium text-gray-600 lg:text-base text-xs ps-4'><span className=' text-green-700 lg:text-lg text-sm'>70% </span>you/are progress</h2>
                </div>
                <div className='flex flex-col items-center'>
                    <div className='lg:size-[105px] size-[90px] flex items-center justify-center border-2 border-[#956CC2] rounded-full'>
                        <img src='' alt="" className='lg:size-24 size-20 rounded-full ' />
                    </div>
                    <h6 className='lg:text-xl text-base font-semibold text-gray-600'>Name</h6>
                    <p className='lg:text-sm text-xs font-medium text-gray-500'>Email Id</p>
                </div>
                <div>
                    <div className='flex items-center justify-between '>
                        <h3 className='font-semibold lg:text-lg text-sm text-gray-700'>Notification <NotificationsActiveIcon sx={{ fontSize: 19 }} className=' align-baseline' /></h3>
                        <button className='text-sm text-[#956CC2]'>view all<KeyboardArrowDownIcon /></button>
                    </div>
                    <div className=' min-h-[100px] w-full p-2 border-2 rounded-lg '>
                        <p className='bg-gray-200 text-sm font-medium text-gray-500'><NotificationsIcon sx={{ fontSize: 17 }} className='text-[#575FB4]' /> Notification Text</p>
                    </div>
                </div>
            </div>


            <div className='md:hidden w-0 absolute z-10 right-[140px]'>
                <Button onClick={toggleDrawer('right', true)} variant='text'><KeyboardArrowLeftOutlinedIcon className='text-lg p-0' />Profile</Button>
                <Drawer
                    anchor='right'
                    open={state['right']}
                    onClose={toggleDrawer('right', false)}
                >
                    <div className='h-full w-[280px] bg-white flex md:hidden flex-col gap-10 pt-10 px-5 p-2'>
                        <div>
                            <div className='flex items-center justify-center gap-20'>
                                <h1 className='text-xl font-bold'>My Profile</h1>
                                <button>
                                    <MoreHorizIcon className='text-gray-500' />
                                </button>
                            </div>
                            <h2 className='font-medium text-gray-600 text-base ps-4'><span className=' text-green-700 text-lg'>70% </span>you/are progress</h2>
                        </div>
                        <div className='flex flex-col items-center'>
                            <div className='size-[105px] flex items-center justify-center border-2 border-[#956CC2] rounded-full'>
                                <img src='' alt="" className='size-24  rounded-full ' />
                            </div>
                            <h6 className='text-xl font-semibold text-gray-600'>Name</h6>
                            <p className='text-sm font-medium text-gray-500'>Email Id</p>
                        </div>
                        <div>
                            <div className='flex items-center justify-center gap-8'>
                                <h3 className='font-semibold text-lg text-gray-700'>Notification <NotificationsActiveIcon sx={{ fontSize: 19 }} className=' align-baseline' /></h3>
                                <button className='text-sm text-[#956CC2]'>view all<KeyboardArrowDownIcon /></button>
                            </div>
                            <div className=' min-h-[100px] w-full p-2 border-2 rounded-lg '>
                                <p className='bg-gray-200 text-sm font-medium text-gray-500'><NotificationsIcon sx={{ fontSize: 17 }} className='text-[#575FB4]' /> Notification Text</p>
                            </div>
                        </div>
                    </div>
                </Drawer>


            </div>
        </>
    )
}

export default MyProfile