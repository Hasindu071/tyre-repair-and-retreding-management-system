import React, { createContext, useContext, useState } from 'react';

const OwnerAuthContext = createContext();

export const OwnerAuthProvider = ({ children }) => {
  const [owner, setOwner] = useState(null);

  const loginOwner = (ownerData) => {
    setOwner(ownerData);
  };

  const logoutOwner = () => {
    setOwner(null);
  };

  return (
    <OwnerAuthContext.Provider value={{ owner, loginOwner, logoutOwner }}>
      {children}
    </OwnerAuthContext.Provider>
  );
};

export const useOwnerAuth = () => useContext(OwnerAuthContext);