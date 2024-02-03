import { createContext, useEffect, useState } from 'react';
import api from '../services/api';

interface AuthProviderProps {
  children?: React.ReactNode;
}

interface User {
  username?: string;
  password?: string;
}

interface AuthContextData {
  signed: boolean | null;
  signIn: (user: User) => void;
  signOut: () => void;
  loading: boolean;
}

const initialState = {
  signed: false,
  setSigned: () => {},
  signIn: () => {},
  signOut: () => {},
  loading: true,
  user: {
    username: '',
  },
  token: null,
};

const AuthContext = createContext<AuthContextData>(initialState);

function AuthProvider({ children }: AuthProviderProps) {
  const [signed, setSigned] = useState(initialState.signed);
  const [loading, setLoading] = useState(initialState.loading);
  const [, setToken] = useState(initialState.token);

  useEffect(() => {
    function checkIsLogged() {
      setLoading(true);
      const storedToken = localStorage.getItem('@Auth:TOKEN');
      if (storedToken) {
        setSigned(true);
      } else {
        setSigned(false);
      }
    }
    checkIsLogged();
    setLoading(false);
  }, []);

  async function signIn(user: User) {
    try {
      setLoading(true);
      const { data } = await api.login('login', user);
      localStorage.setItem('@Auth:TOKEN', data.token);
      setToken(data.token);
      setSigned(true);
      setLoading(false);
    } catch (error) {}
  }

  function signOut() {
    localStorage.removeItem('@Auth:TOKEN');
    setToken(null);
    setSigned(false);
  }

  return <AuthContext.Provider value={{ signed, signIn, signOut, loading }}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
