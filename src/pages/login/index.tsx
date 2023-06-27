import { useContext } from 'react';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { Label } from '../../components/label';
import { AuthContext } from '../../contexts/auth';
import { BoxLogin } from '../../components/BoxLogin';

export function Login() {
  const { signIn } = useContext(AuthContext);

  const handleLogin = () => {
    signIn();
  };

  return (
    <BoxLogin>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
        Login
      </h1>
      <form className="space-y-4 md:space-y-6" action="#">
        <div>
          <Label title="Your email" />
          <Input name="email" id="email" type="text" placeholder="name@company.com" />
        </div>
        <div>
          <Label title="Password" />
          <Input type="password" name="password" id="password" placeholder="••••••••" />
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
        <Button onClick={() => handleLogin} type="button">
          Entrar
        </Button>
      </form>
    </BoxLogin>
  );
}
