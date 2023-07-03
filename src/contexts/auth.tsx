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
  loading: boolean;
}

const initialState = {
  signed: false,
  setSigned: () => {},
  signIn: () => {},
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
      const { data } = await api.login('users/auth', user);
      localStorage.setItem('@Auth:TOKEN', data.token);
      setToken(data.token);
      setSigned(true);
      setLoading(false);
    } catch (error) {}
  }

  return <AuthContext.Provider value={{ signed, signIn, loading }}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
