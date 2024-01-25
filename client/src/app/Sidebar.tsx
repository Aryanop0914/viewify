import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { NavLink, useLocation } from 'react-router-dom';

const Sidebar = () => {
   const location = useLocation();
   const items = [
      {
         href: '/',
         title: 'Home',
      },
      {
         href: '/profile',
         title: 'Profile',
      },
      {
         href: '/settings',
         title: 'Settings',
      },
   ];
   return (
      <nav className="flex mt-5 mx-3 flex-col lg:space-x-0 lg:space-y-1">
         {items.map((item) => (
            <NavLink
               key={item.href}
               to={item.href}
               className={cn(
                  buttonVariants({ variant: 'ghost' }),
                  location.pathname === item.href
                     ? 'bg-muted hover:bg-muted'
                     : 'hover:bg-transparent',
                  'justify-start'
               )}
            >
               {item.title}
            </NavLink>
         ))}
      </nav>
   );
};

export default Sidebar;
