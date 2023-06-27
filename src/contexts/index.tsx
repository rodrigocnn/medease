import { AuthProvider } from './auth';

interface ContextProviderProps {
  children?: React.ReactNode;
}

function ContextProvider({ children }: ContextProviderProps) {
  return <AuthProvider>{children}</AuthProvider>;
}

export default ContextProvider;
