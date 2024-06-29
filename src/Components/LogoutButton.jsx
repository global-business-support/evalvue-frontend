// src/components/LogoutButton.jsx
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { UserContext } from "../Contextfile";

const LogoutButton = () => {
  const navigate = useNavigate();
  const { setUserId } = useContext(UserContext);

  const handleLogout = () => {
    // Clear user data and tokens
    setUserId(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("accessToken"); // Remove accessToken
    localStorage.setItem("isLogin", "false");
    navigate("/login"); // Redirect to login page
  };

  return (
    <button
      onClick={handleLogout}
      variant="contained"
      className="text-white"
    ><LogoutIcon className="text-white"/>
      Logout
    </button>
  );
};

export default LogoutButton;
