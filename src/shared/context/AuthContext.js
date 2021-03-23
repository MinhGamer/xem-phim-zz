import { createContext, useState, useCallback } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  token: null,
  user: null,
  login: () => {},
  logout: () => {},
});

export function AuthContextWrapper(props) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback((token, user) => {
    setToken(token);
    setUser(user);
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, user, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}
