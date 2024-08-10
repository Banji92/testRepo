import React, { createContext, useContext, useState, useEffect } from "react";

// Create a context with default values
const AuthContext = createContext({
  auth: false,
  currentUser: null,
  setAuth: () => {},
  getCurrentUser: () => {},
  getAuth: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setIsAuthenticated] = useState(
    JSON.parse(localStorage.getItem("isAuthenticated")) || false
  );
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );

  const setAuth = (authState, user = null) => {
    setIsAuthenticated(authState);
    setCurrentUser(user);
  };

  const getCurrentUser = () => currentUser;
  const getAuth = () => auth;

  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(auth));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [auth, currentUser]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        currentUser,
        setAuth,
        getCurrentUser,
        getAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
