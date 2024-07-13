import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("data")) || null
  );
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(user));
  }, [user]);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("data", JSON.stringify(userData));
  };

  const updateUser = (data) => {
    localStorage.setItem("data", JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem("data");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
