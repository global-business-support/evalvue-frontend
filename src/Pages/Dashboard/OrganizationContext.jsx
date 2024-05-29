// OrganizationContext.js
import React, { createContext, useState, useEffect } from 'react';

const OrganizationContext = createContext();

const OrganizationProvider = ({ children }) => {
  // Initialize state with the value from localStorage if available
  const [organization, setOrganization] = useState(() => {
    const storedOrganization = localStorage.getItem('organization');
    return storedOrganization ? JSON.parse(storedOrganization) : {};
  });

  // Update localStorage whenever organization changes
  useEffect(() => {
    if (organization && Object.keys(organization).length > 0) {
      localStorage.setItem('organization', JSON.stringify(organization));
    } else {
      localStorage.removeItem('organization');
    }
  }, [organization]);

  return (
    <OrganizationContext.Provider value={{ organization, setOrganization }}>
      {children}
    </OrganizationContext.Provider>
  );
};

export { OrganizationContext, OrganizationProvider };
