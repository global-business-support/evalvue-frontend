import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../Contextfile'; // Adjust the path as needed
import PageNotFound from '../PageNotFound';

const PrivateRoute = ({ element }) => {
    const { userId } = useContext(UserContext);

    if (userId == 3 || userId == 4) {
        return element;
    } else {
        return <PageNotFound />;
      }
    
};

export default PrivateRoute;
