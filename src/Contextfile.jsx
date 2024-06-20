import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(() => {
    // Initialize state with value from localStorage if it exists
    return localStorage.getItem('userId') || null;
  });
  const [stateOrgData, setStateOrgData] = useState({})

  useEffect(() => {
    // Save userId to localStorage whenever it changes
    if (userId !== null) {
      localStorage.setItem('userId', userId);
    } else {
      localStorage.removeItem('userId');
    }
  }, [userId]);

 


  return (
    <UserContext.Provider value={{ userId, setUserId, stateOrgData, setStateOrgData }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
