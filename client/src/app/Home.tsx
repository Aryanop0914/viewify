import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useTheme } from '@/components/theme-provider';
const Home = () => {
   const { setTheme } = useTheme();
   return (
      <div>
         <h1>Home</h1>
         <Button variant="outline">
            <Link to="/register">Register</Link>
         </Button>
         <Button variant="ghost" onClick={() => setTheme('light')}>
            Light
         </Button>
         <Button variant="ghost" onClick={() => setTheme('dark')}>
            Dark
         </Button>
      </div>
   );
};

export default Home;
