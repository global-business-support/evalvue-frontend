import React from "react";
import { NavLink } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import BungalowIcon from "@mui/icons-material/Bungalow";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SearchIcon from "@mui/icons-material/Search";
import ShieldIcon from "@mui/icons-material/Shield";
import HttpsIcon from "@mui/icons-material/Https";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import SettingsIcon from "@mui/icons-material/Settings";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
const apiUrl = import.meta.env.VITE_API_URL;

function DashboardNavigation() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  function showtermandcondition() {
    window.open(
      "http://api.evalvue.com/media/Terms/Terms%20and%20Conditions.pdf",
      "_blank"
    );
  }
  function showprivicy() {
    window.open(
      "http://api.evalvue.com/media/Policy/privacy%20policy.pdf",
      "_blank"
    );
  }
  return (
    <>
      <div className="py-10 lg:flex hidden flex-col items-center ">
        <div className="flex flex-col items-center gap-3 h-full lg:w-[280px] w-[200px] p-2">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `w-full py-2 ps-2 rounded lg:text-base text-sm font-semibold ${
                isActive ? "text-white bg-[#5134a9]" : "text-gray-600"
              }`
            }
          >
            <BungalowIcon className="align-text-bottom" sx={{ fontSize: 18 }} />
            Feed
          </NavLink>

          <NavLink
            to="/dashboard/organization"
            end
            className={({ isActive }) =>
              `w-full py-2 ps-2 rounded lg:text-base text-sm font-semibold ${
                isActive ? "text-white bg-[#5134a9]" : "text-gray-600"
              }`
            }
          >
            <DashboardIcon className="align-text-bottom" sx={{ fontSize: 18 }} />
            Organization
          </NavLink>
          <NavLink
            to="/dashboard/searchByAadharCard"
            className={({
              isActive,
            }) => `w-full py-2 ps-2 rounded lg:text-base text-sm font-semibold 
                        ${
                          isActive
                            ? "text-white bg-primary-100 "
                            : "text-gray-600"
                        }`}
          >
            <SearchIcon className="align-text-bottom" sx={{ fontSize: 18 }} />
            Search by Aadhar card
          </NavLink>
          <NavLink
            onClick={showtermandcondition}
            className={({ isActive }) =>
              `w-full py-2 ps-2 rounded lg:text-base text-sm font-semibold text-gray-600`
            }
          >
            <ShieldIcon className="align-text-top" sx={{ fontSize: 16 }} />
            Terms and conditions
          </NavLink>

          <NavLink
            id="abhi"
            onClick={showprivicy}
            className={({ isActive }) =>
              `w-full py-2 ps-2 rounded lg:text-base text-sm font-semibold text-gray-600`
            }
          >
            <HttpsIcon className="align-text-top" sx={{ fontSize: 15 }} />
            Privacy
          </NavLink>
          {/* ${(isActive) ? 'text-white bg-[#5134a9] ' : 'text-gray-600'} */}
          {/* <NavLink
            to="/dashboard"
            className={({
              isActive,
            }) => `w-full text-gray-600 py-2 ps-2 rounded lg:text-base text-sm font-semibold
                    `}
          >
            <BungalowIcon
              className="align-text-top"
              sx={{ fontSize: 20 }}
              to="/dashboard/"
            />
            Feed
          </NavLink>

          <NavLink
            to="/dashboard/organization"
            className={({
              isActive,
            }) => `w-full text-gray-600 py-2 ps-2 rounded lg:text-base text-sm font-semibold 
                    `}
          >
            <DashboardIcon className="align-text-top" sx={{ fontSize: 20 }} />
            Organization
          </NavLink> */}

         

          {/* <NavLink
            onClick={showtermandcondition}
            className={({
              isActive,
            }) => `w-full py-2 ps-2 rounded lg:text-base text-sm font-semibold 
                        text-gray-600`}
          >
            <ShieldIcon className="align-text-top" sx={{ fontSize: 20 }} />
            Terms and conditions
          </NavLink> */}

          {/* <NavLink
            to=""
            id="abhi"
            onClick={showprivicy}
            className={({
              isActive,
            }) => `w-full py-2 ps-2 rounded lg:text-base text-sm font-semibold 
                        text-gray-600`}
          >
            <HttpsIcon className="align-text-top" sx={{ fontSize: 20 }} />
            Privacy
          </NavLink> */}

          {/* <NavLink to='/dashboard/help' className={({ isActive }) => `w-full py-2 ps-2 rounded lg:text-base text-sm font-semibold 
                        ${(isActive) ? 'text-white bg-primary-100 ' : 'text-gray-600'}`}>
                        <HelpCenterIcon className='align-text-top' sx={{ fontSize: 20 }} />
                        Help
                    </NavLink> */}
        </div>

        {/* <button className='font-bold  text-gray-600'><SettingsIcon className='text-[#5559AF] align-top' sx={{ fontSize: 20 }} /> Settings</button> */}
      </div>

      <div className="lg:hidden w-0">
        <Button onClick={toggleDrawer(true)} className="w-full text-left z-40">
          <span className="text-primary-100 font-semibold ml-5 ">Menu</span>
          <KeyboardArrowRightOutlinedIcon className="text-xs p-0 text-primary-100" />
        </Button>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          <div className="py-10 flex  flex-col items-center ">
            <div className="flex flex-col items-center gap-3 h-full  w-[280px] p-2 ">
              <NavLink
                to="/dashboard"
                end
                className={({
                  isActive,
                }) => `w-full py-2 ps-2 rounded font-semibold
                                    ${
                                      isActive
                                        ? "text-white bg-primary-100 "
                                        : "text-gray-600"
                                    }`}
                                    onClick={toggleDrawer(false)}
              >
                <BungalowIcon
                  className="align-text-bottom"
                  sx={{ fontSize: 18 }}
                  to="/"
                />
                Feed
              </NavLink>

              <NavLink
                to="/dashboard/organization"
                end
                className={({
                  isActive,
                }) => `w-full py-2 ps-2 rounded font-semibold 
                                    ${
                                      isActive
                                        ? "text-white bg-primary-100 "
                                        : "text-gray-600"
                                    }`}
                                    onClick={toggleDrawer(false)}
              >
                <DashboardIcon
                  className="align-text-top"
                  sx={{ fontSize: 15 }}
                />
                Organization
              </NavLink>

              <NavLink
                to="/dashboard/searchByAadharCard"
                end
                className={({
                  isActive,
                }) => `w-full py-2 ps-2 rounded font-semibold 
                                    ${
                                      isActive
                                        ? "text-white bg-primary-100 "
                                        : "text-gray-600"
                                    }`}
                                    onClick={toggleDrawer(false)}
              >
                <SearchIcon className="align-text-bottom" sx={{ fontSize: 18 }} />
                Search by Aadhar card
              </NavLink>

              <NavLink
                onClick={()=>{showtermandcondition(); toggleDrawer(false)}}
                className={({ isActive }) =>
                  `w-full py-2 ps-2 rounded lg:text-base text-sm font-semibold text-gray-600`
                }
                
              >
                <ShieldIcon className="align-text-top" sx={{ fontSize: 15 }} />
                Terms and conditions
              </NavLink>

              <NavLink
                id="abhi"
                onClick={()=>{showprivicy(); toggleDrawer(false)}}
                className={({ isActive }) =>
                  `w-full py-2 ps-2 rounded lg:text-base text-sm font-semibold text-gray-600`
                }
              >
                <HttpsIcon className="align-text-top" sx={{ fontSize: 15 }} />
                Privacy
              </NavLink>

              {/* <NavLink
                to="/dashboard/help"
                className={({
                  isActive,
                }) => `w-full py-2 ps-2 rounded font-semibold 
                                    ${
                                      isActive
                                        ? "text-white bg-primary-100 "
                                        : "text-gray-600"
                                    }`}
              >
                <HelpCenterIcon
                  className="align-text-top"
                  sx={{ fontSize: 20 }}
                />
                Help
              </NavLink> */}
            </div>

            {/* <button className="font-bold text-gray-600">
              <SettingsIcon className="text-[#5559AF]" /> Settings
            </button> */}
          </div>
        </Drawer>
      </div>
    </>
  );
}

export default DashboardNavigation;
