import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../Contextfile.jsx'; // Adjust the path as needed

const ProtectedAadhaarRoute = ({ element }) => {
  const { showSearchByAadhaar } = useContext(UserContext);

  if (showSearchByAadhaar) {
    return element;
  } else {
    return <Navigate to="/dashboard/organization" replace />;
  }
};

export default ProtectedAadhaarRoute;
