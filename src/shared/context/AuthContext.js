import { createContext, useState, useCallback } from 'react';

import { ADMIN_EMAIL } from '../../shared/util/config';

export const AuthContext = createContext({
  isLoggedIn: false,
  token: null,
  user: null,
  isAdmin: false,
  login: () => {},
  logout: () => {},
});

export function AuthContextWrapper(props) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(null);

  const login = useCallback((token, user) => {
    setToken(token);
    setUser(user);
    setIsLoggedIn(true);

    if (user.email === ADMIN_EMAIL) {
      setIsAdmin(true);
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);
    setIsAdmin(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, token, user, login, logout, isAdmin }}>
      {props.children}
    </AuthContext.Provider>
  );
}
