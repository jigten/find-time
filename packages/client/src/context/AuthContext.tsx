import React, {useState, useEffect, createContext} from 'react';
import {TOKEN_KEY} from '../utils/auth';
import jwtDecode from 'jwt-decode';

export const AuthContext = createContext(null);
export const AuthProvider = (props: {
  children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal;
}) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const idToken = localStorage.getItem(TOKEN_KEY);
    if (idToken) {
      setUser(jwtDecode(idToken));
    }
  }, []);

  return <AuthContext.Provider value={[user, setUser]}>{props.children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const [user, setUser] = React.useContext(AuthContext);
  return {user, setUser};
};
