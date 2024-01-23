import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router-dom';

const Login = () => {
   return (
      <>
         <h1>Login</h1>
         <Button variant="outline">
            <NavLink to="/register">Register</NavLink>
         </Button>
      </>
   );
};

export default Login;
