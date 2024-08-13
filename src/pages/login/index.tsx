import { useContext, useState } from 'react';
import { Button } from '../../components/button';
import { Input } from '../../components/input';

import { AuthContext } from '../../contexts/auth';
import { BoxLogin } from '../../components/box-login';
import { Label } from '../../components/label';

interface User {
  email?: string;
  password?: string;
}

export function Login() {
  const { signIn } = useContext(AuthContext);
  const [user, setUser] = useState<User>();

  const handleLogin = () => {
    if (user) {
      signIn(user);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const fieldName = event.target.name;
    const value = event.target.value;
    setUser({ ...user, [fieldName]: value });
  };

  return (
    <>
      <BoxLogin>
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Login
        </h1>
        <form className="space-y-4 md:space-y-6" action="#">
          <div>
            <Label title="Seu email" />
            <Input onChange={handleChange} name="email" id="email" type="text" />
          </div>
          <div>
            <Label title="Senha" />
            <Input onChange={handleChange} type="password" name="password" id="password" />
          </div>

          <Button onClick={handleLogin} type="button">
            Entrar
          </Button>
        </form>
      </BoxLogin>
    </>
  );
}
