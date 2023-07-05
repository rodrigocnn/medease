import { useContext, useState } from 'react';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { Label } from '../../components/label';
import { AuthContext } from '../../contexts/auth';
import { BoxLogin } from '../../components/BoxLogin';

interface User {
  username?: string;
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
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
          Login
        </h1>
        <form className="space-y-4 md:space-y-6" action="#">
          <div>
            <Label title="Your email" />
            <Input onChange={handleChange} name="username" id="email" type="text" placeholder="name@company.com" />
          </div>
          <div>
            <Label title="Password" />
            <Input onChange={handleChange} type="password" name="password" id="password" placeholder="••••••••" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-end">
              <a
                href="http://www.globo.com"
                className="text-primary-600 dark:text-primary-500 text-sm font-medium hover:underline"
              >
                Forgot password?
              </a>
            </div>
          </div>
          <Button onClick={handleLogin} type="button">
            Entrar
          </Button>
        </form>
      </BoxLogin>
    </>
  );
}
