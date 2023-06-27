import { createContext, useState } from 'react';
import api from '../services/api';

interface AuthProviderProps {
  children?: React.ReactNode;
}

interface User {
  name: string;
  password?: string;
}

interface AuthContextData {
  signed: boolean;
  signIn: () => void;
  loading: boolean;
  user: User;
}

const initialState = {
  signed: false,
  setSigned: () => {},
  signIn: () => {},
  loading: false,
  user: {
    name: '',
  },
  token: null,
};

const AuthContext = createContext<AuthContextData>(initialState);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>(initialState.user);
  const [signed, setSigned] = useState(initialState.signed);
  const [loading, setLoading] = useState(initialState.loading);
  const [token, setToken] = useState(initialState.token);

  async function signIn() {
    try {
      setLoading(true);
      const { data } = await api.login('auth/', {});
      localStorage.setItem('@Auth:TOKEN', data.token);
      localStorage.setItem('@Auth:USER', JSON.stringify(data.name));
      setToken(data.token);
      setUser({ name: data.name });
      setSigned(true);
      setLoading(false);
    } catch (error) {}
  }

  return <AuthContext.Provider value={{ signed, signIn, loading, user }}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
