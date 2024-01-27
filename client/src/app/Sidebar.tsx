import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Settings } from 'lucide-react';
import arrUser from './data';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
const Subscriptions = () => {
   return (
      <>
         {arrUser.map((video) => (
            <div
               key={video.id}
               className="mt-3 flex justify-center lg:justify-start"
            >
               <Button
                  variant="ghost"
                  className="flex flex-row justify-between mx-3"
               >
                  <Avatar className="h-8 w-8  lg:mr-2">
                     <AvatarImage
                        className="rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                     />
                     <AvatarFallback>Avatar</AvatarFallback>
                  </Avatar>
                  <div className="hidden lg:block">{video.channelName}</div>
               </Button>
            </div>
         ))}
      </>
   );
};
const Sidebar = () => {
   const location = useLocation();
   const items = [
      {
         href: '/',
         title: 'Home',
         symbol: <Home strokeWidth={2} />,
      },
      {
         href: '/settings',
         title: 'Settings',
         symbol: <Settings strokeWidth={2} />,
      },
   ];

   return (
      <>
         <nav className="flex mt-5 mx-3 flex-col justify-center lg:space-x-0 lg:space-y-1">
            {items.map((item) => (
               <NavLink
                  key={item.href}
                  to={item.href}
                  className={cn(
                     buttonVariants({ variant: 'ghost' }),
                     '/' + location.pathname.split('/')[1] === item.href
                        ? 'bg-muted hover:bg-muted'
                        : 'hover:bg-transparent'
                  )}
               >
                  <div className="hidden lg:block text-start">{item.title}</div>
                  <div className="block lg:hidden justify-center">
                     {item.symbol}
                  </div>
               </NavLink>
            ))}
         </nav>
         <Separator orientation="horizontal" className=" rounded m-3" />
         <Button variant="ghost" className="mt-1" disabled>
            Subscriptions
         </Button>
         <Subscriptions />
      </>
   );
};

export default Sidebar;
