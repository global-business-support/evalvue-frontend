import React, { createContext, useState } from 'react';

const IsverifiedContext = createContext();

const IsverifiedProvider = ({ children }) => {
  const [Isverified, setIsverified] = useState(false);

  return (
    <IsverifiedContext.Provider value={{ Isverified, setIsverified }}>
      {children}
    </IsverifiedContext.Provider>
  );
};

export { IsverifiedContext, IsverifiedProvider };
