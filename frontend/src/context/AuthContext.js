import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userType, setUserType] = useState(null); // 'customer' or 'owner'
  const [userID, setUserID] = useState(null);
  const [userName, setUserName] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);


  useEffect(() => {
    const savedUserType = localStorage.getItem("userType");
    const savedUserID = localStorage.getItem("userID");
    const savedUserName = localStorage.getItem("userName");

    if (savedUserType) setUserType(savedUserType);
    if (savedUserID) setUserID(savedUserID);
    if (savedUserName) setUserName(savedUserName);
  }, []);

  const login = (type, id, name, token) => {
    setUserType(type);
    setUserID(id);
    setUserName(name);
    setToken(token); // Add this line to store the token
  
    localStorage.setItem("userType", type);
    localStorage.setItem("userID", id);
    localStorage.setItem("userName", name);
    localStorage.setItem("token", token); // Store token in localStorage
  };

  const logout = () => {
    setUserType(null);
    setUserID(null);
    setUserName(null);

    localStorage.removeItem("userType");
    localStorage.removeItem("userID");
    localStorage.removeItem("userName");
  };

  return (
    <AuthContext.Provider value={{ userType, userID, userName, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
  
};

export const useAuth = () => useContext(AuthContext);
