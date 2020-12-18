import React, { useState } from "react";

// initial, stored values
export const AuthContext = React.createContext({
  isAuth: false,
  login: () => {},
});

// updater stuff
const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // auth when invoked
  const loginHandler = () => {
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider
      value={{ login: loginHandler, isAuth: isAuthenticated }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
