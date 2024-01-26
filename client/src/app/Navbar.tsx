import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
   AlignJustify,
   Play,
   Lightbulb,
   LogOut,
   Settings,
   User,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Toggle } from '@/components/ui/toggle';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const NavLinks = () => {
   return (
      <>
         <NavLink to="/" className="bg-mutant-foreground">
            Home
         </NavLink>
      </>
   );
};
const Navbar = () => {
   const navigate = useNavigate();
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
      <header className="bg-background top-0 z-[20] mx-auto flex flex-wrap w-full items-center justify-between p-4 text-foreground ">
         <div className="flex items-center">
            <div className="flex logo h-10 w-10 items-center">
               <Play size={30} className="text-primary" strokeWidth={3} />
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
            <div className="justify-end md:hidden mr-2">
               <AlignJustify onClick={toggleNavbar} className="bg-background" />
            </div>
            <Toggle aria-label="Toggle bold" onClick={toggleTheme}>
               <Lightbulb className="h-4 w-4 mx-1" />
               <h1 className="text-base">{theme1 ? 'Dark' : 'Light'}</h1>
            </Toggle>
         </nav>
         {isLoggedIn ? (
            <DropdownMenu>
               <DropdownMenuTrigger>
                  <Avatar>
                     <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                     <AvatarFallback>Avatar</AvatarFallback>
                  </Avatar>
               </DropdownMenuTrigger>
               <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => navigate('/profile/1234')}>
                     <div className="flex justify-between items-center">
                        <div className="mr-6">My Profile</div>
                        <User size={20} strokeWidth={2} />
                     </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/settings')}>
                     <div className="flex justify-between items-center">
                        <div className="mr-9">Settings</div>
                        <Settings size={20} strokeWidth={2} />
                     </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setIsLoggedIn(!isLoggedIn)}>
                     <div className="flex justify-between items-center">
                        <div className="mr-11">Logout</div>
                        <LogOut size={20} strokeWidth={2} />
                     </div>
                  </DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         ) : (
            <Button
               variant="default"
               className="text-base"
               onClick={() => {
                  navigate('/login');
               }}
            >
               Login
            </Button>
         )}
         {isOpen && (
            <div className="flex flex-col items-center my-3 basis-full">
               <NavLinks />
            </div>
         )}
         <Input
            className="w-full mt-2 sm:hidden"
            id="search"
            placeholder="Search"
         />
      </header>
   );
};

export default Navbar;
