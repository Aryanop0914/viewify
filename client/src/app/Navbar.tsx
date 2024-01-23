import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { AlignJustify, Play, Lightbulb, LogOut } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Toggle } from '@/components/ui/toggle';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const NavLinks = () => {
   return (
      <>
         <NavLink to="/">Home</NavLink>
      </>
   );
};
const Navbar = () => {
   const [isOpen, setIsOpen] = useState(false);
   const [isLoggedIn, setIsLoggedIn] = useState(true);
   //true--dark false--light
   const [theme1, setTheme1] = useState(true);
   const { setTheme } = useTheme();

   const toggleNavbar = () => {
      setIsOpen(!isOpen);
   };
   const toggleTheme = () => {
      if (theme1) {
         setTheme('dark');
      } else {
         setTheme('light');
      }
      setTheme1(!theme1);
   };
   useEffect(() => {
      const handleResize = () => {
         if (window.innerWidth > 768) {
            setIsOpen(false);
         }
      };
      // toggleTheme();
      window.addEventListener('resize', handleResize);
      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);
   return (
      <header className="bg-dark-background border-2 top-0 z-[20] mx-auto flex flex-wrap w-full items-center justify-between border-gray-500 p-4  ">
         <div className="flex items-center">
            <div className="flex logo h-10 w-10 items-center">
               <Play size={30} color="red" strokeWidth={3} />
            </div>
            <h1 className="text-xlhover:italic">Viewify</h1>
         </div>
         <Input
            className="w-1/3  max-sm:hidden"
            id="search"
            placeholder="Search"
         />
         <nav className="flex w-1/3 justify-end items-center">
            <div className="hidden w-full justify-around md:flex">
               <NavLinks />
            </div>
            <div className="justify-end md:hidden">
               <AlignJustify onClick={toggleNavbar} className="bg-background" />
            </div>
            <Toggle aria-label="Toggle bold" onClick={toggleTheme}>
               <Lightbulb className="h-4 w-4 mx-1" />
               <h1 className="text-base">{theme1 ? 'Dark' : 'Light'}</h1>
            </Toggle>
         </nav>
         {isOpen && (
            <div className="flex flex-col items-center basis-full">
               <NavLinks />
            </div>
         )}
         <div className="flex items-center">
            {isLoggedIn ? (
               <DropdownMenu>
                  <DropdownMenuTrigger>
                     <img
                        className="h-12 w-12 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                     />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                     <DropdownMenuLabel>My Account</DropdownMenuLabel>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem>Profile</DropdownMenuItem>
                     <DropdownMenuItem>Billing</DropdownMenuItem>
                     <DropdownMenuItem>Team</DropdownMenuItem>
                     <DropdownMenuItem>Subscription</DropdownMenuItem>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem
                        onClick={() => setIsLoggedIn(!isLoggedIn)}
                     >
                        <div className="flex justify-between items-center ">
                           <div className="mr-10">Logout</div>
                           <LogOut size={20} strokeWidth={3} />
                        </div>
                     </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            ) : (
               <Button
                  variant="outline"
                  onClick={() => setIsLoggedIn(!isLoggedIn)}
               >
                  Login
               </Button>
            )}
         </div>
         <Input
            className="w-full mt-2 sm:hidden"
            id="search"
            placeholder="Search"
         />
      </header>
   );
};

export default Navbar;
