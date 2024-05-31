import React, { useContext, useState } from "react";
import logo from "../assets/images/logo.png";
import { Link, NavLink, Outlet } from "react-router-dom";
import HouseIcon from "@mui/icons-material/House";
import ViewAgendaIcon from "@mui/icons-material/ViewAgenda";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InfoIcon from "@mui/icons-material/Info";
import CallIcon from "@mui/icons-material/Call";
import HelpIcon from "@mui/icons-material/Help";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import DehazeIcon from "@mui/icons-material/Dehaze";
import { Button, Drawer, Typography } from "@mui/material";
import { UserContext } from "../Contextfile";

function Navbar() {
  const [state, setState] = useState({
    right: false,
  });
  const { userId, setUserId } = useContext(UserContext);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ [anchor]: open });
  };
  const logout = () => {
    setUserId(null);
    localStorage.removeItem("userId");
    localStorage.setItem("isLogin", false);
  };
  return (
    <>
      <nav className="h-[80px] sticky border-b-2 z-10 top-0 w-full bg-white lg:px-[80px] sm:px-[20px] px-[10px] flex items-center justify-between ">
        <Link>
          <img src={logo} alt="" className="lg:h-[40px] sm:h-[35px] h-[30px]" />
        </Link>

        <div className="md:flex hidden items-center gap-7 lg:text-lg">
          {/* <NavLink className='font-semibold text-primary-100 lg:text-base text-xl'><Typography variant='button-text'><HouseIcon className='text-[#4f5ecd] align-text-bottom' sx={{ fontSize:20 }} to="/" />Home</Typography></NavLink> */}

          {/* <NavLink className='font-semibold lg:text-base text-xl text-gray-600' to="/services"><Typography variant='button-text'><HomeRepairServiceIcon className='text-primary-100 align-text-bottom' sx={{ fontSize:20 }} />Services</Typography></NavLink> */}

          {/* <NavLink className='font-semibold lg:text-base text-xl text-gray-600' to="/feed"><Typography variant='button-text'><ViewAgendaIcon className='text-primary-100 align-text-bottom' sx={{ fontSize:20 }} />Feed</Typography></NavLink> */}

          {userId ? (
            <NavLink
              className="font-semibold lg:text-base text-xl text-gray-600"
              to="/dashboard"
            >
              <Typography variant="button-text">
                <DashboardIcon
                  className="text-primary-100 align-text-bottom"
                  sx={{ fontSize: 20 }}
                />
                Dashboard
              </Typography>
            </NavLink>
          ) : (
            ""
          )}

          {/* <NavLink className='font-semibold lg:text-base text-xl text-gray-600' to="/dashboard"><Typography variant='button-text'><DashboardIcon className='text-primary-100 align-text-bottom' sx={{ fontSize:20 }} />Dashboard</Typography></NavLink> */}

          {/* <NavLink className='font-semibold lg:text-base text-xl text-gray-600' to="/about"><Typography variant='button-text'><InfoIcon className='text-primary-100 align-text-bottom' sx={{ fontSize:20 }} />About us</Typography></NavLink> */}

          {/* <NavLink className='font-semibold lg:text-base text-xl text-gray-600' to="/contact"><Typography variant='button-text'><CallIcon className='text-primary-100 align-text-bottom' sx={{ fontSize:20 }} />Contact</Typography></NavLink> */}

          {/* <NavLink className='font-semibold lg:text-base text-xl text-gray-600' to="/help"><Typography variant='button-text'><HelpIcon className='text-primary-100 align-text-bottom' sx={{ fontSize:20 }} />Help</Typography></NavLink> */}
        </div>

        {userId ? (
          <NavLink to="/login">
            <button
              onClick={logout}
              className="bg-primary-100 hover:bg-[#5559af] hover:shadow-sm hover:shadow-gray-600 shadow-sm shadow-gray-500 text-white rounded w-[100px] p-1 md:flex hidden items-center justify-center gap-1"
            >
              <LogoutIcon sx={{ fontSize: 20 }} />
              Logout
            </button>
          </NavLink>
        ) : (
          <NavLink to="/login">
            <button className="bg-primary-100 hover:bg-[#5559af] hover:shadow-sm hover:shadow-gray-600 shadow-sm shadow-gray-500 text-white rounded w-[100px] p-1 md:flex hidden items-center justify-center gap-1">
              <LogoutIcon sx={{ fontSize: 20 }} />
              Login
            </button>
          </NavLink>
        )}

        {/* <button className='bg-primary-100 hover:bg-[#5559af] hover:shadow-sm hover:shadow-gray-600 shadow-sm shadow-gray-500 text-white rounded w-[100px] p-1 md:flex hidden items-center justify-center gap-1'><LogoutIcon sx={{ fontSize: 20 }} /><NavLink to="/login">Login</NavLink></button> */}

        <div className="md:hidden">
          {["right"].map((anchor) => (
            <React.Fragment key={anchor}>
              <Button onClick={toggleDrawer(anchor, true)}>
                <DehazeIcon className="text-primary-100"/>
              </Button>
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                <div className="w-[50vw] flex justify-start items-start ">
                  <div className="md:hidden flex flex-col items-start gap-4 p-5">
                    <NavLink
                      className="font-semibold text-lg w-full border-b-2 text-gray-600 "
                      to="/"
                      onClick={toggleDrawer(anchor, false)}
                    >
                      <Typography variant="button-text">
                        <HouseIcon
                          className="text-primary-100 align-text-bottom "
                          sx={{ fontSize: 20 }}
                          to="/"
                        />
                        Home
                      </Typography>
                    </NavLink>

                    {/* <NavLink
                      className="font-semibold text-lg text-gray-600"
                      to="/services"
                      onClick={toggleDrawer(anchor, false)}
                    >
                      <Typography variant="button-text">
                        <HomeRepairServiceIcon
                          className="text-primary-100 align-text-bottom"
                          sx={{ fontSize: 23 }}
                        />
                        Services
                      </Typography>
                    </NavLink> */}

                    <NavLink
                      className="font-semibold text-lg text-gray-600"
                      to="/dashboard"
                      onClick={toggleDrawer(anchor, false)}
                    >
                      <Typography variant="button-text">
                        <ViewAgendaIcon
                          className="text-primary-100 align-text-bottom"
                          sx={{ fontSize: 20 }}
                        />
                        Feed
                      </Typography>
                    </NavLink>
                    {userId ? (
            <NavLink
              className="font-semibold lg:text-base text-xl text-gray-600"
              to="/dashboard"
            >
              <Typography variant="button-text">
                <DashboardIcon
                  className="text-primary-100 align-text-bottom"
                  sx={{ fontSize: 20 }}
                />
                Dashboard
              </Typography>
            </NavLink>
          ) : (
            ""
          )}

                    {/* <NavLink
                      className="font-semibold text-lg text-gray-600"
                      to="/about"
                      onClick={toggleDrawer(anchor, false)}
                    >
                      <Typography variant="button-text">
                        <InfoIcon
                          className="text-primary-100 align-text-bottom"
                          sx={{ fontSize: 23 }}
                        />
                        About us
                      </Typography>
                    </NavLink> */}

                    {/* <NavLink
                      className="font-semibold text-lg text-gray-600"
                      to="/contact"
                      onClick={toggleDrawer(anchor, false)}
                    >
                      <Typography variant="button-text">
                        <CallIcon
                          className="text-primary-100 align-text-bottom"
                          sx={{ fontSize: 23 }}
                        />
                        Contact
                      </Typography>
                    </NavLink> */}
{/* 
                    <NavLink
                      className="font-semibold text-lg text-gray-600"
                      to="/help"
                      onClick={toggleDrawer(anchor, false)}
                    >
                      <Typography variant="button-text">
                        <HelpIcon
                          className="text-primary-100 align-text-bottom"
                          sx={{ fontSize: 23 }}
                        />
                        Help
                      </Typography>
                    </NavLink> */}
                  </div>
                </div>

                <button className="bg-primary-100 mx-auto mt-auto mb-24 hover:bg-[#5559af] hover:shadow-sm hover:shadow-gray-600 shadow-sm shadow-gray-500 text-white rounded w-[100px] md:m-0 m-5 p-1 flex md:hidden items-center justify-center gap-1 content-center">
                  <LogoutIcon sx={{ fontSize: 20 }} />
                  <NavLink to="/login">Login</NavLink>
                </button>
              </Drawer>
            </React.Fragment>
          ))}
        </div>
      </nav>

      <Outlet />
    </>
  );
}

export default Navbar;
