import { Route, Routes } from 'react-router-dom';
import Home from './app/Home';
import Register from './app/Register';
import Login from './app/Login';
import Settings from './app/Settings';
import VideosCard from './app/VideosCard';
import UpdateProfile from './app/UpdateProfile';
import Uploads from './app/Uploads';
import UserInfo from './app/UserInfo';

function App() {
   return (
      <>
         <Routes>
            <Route path="/" element={<Home />}>
               <Route index element={<VideosCard />} />
               <Route path="/profile" element={<UserInfo />} />
               <Route path="/settings" element={<Settings />}>
                  <Route index element={<UpdateProfile />} />
                  <Route path="/settings/uploads" element={<Uploads />} />
               </Route>
            </Route>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
         </Routes>
      </>
   );
}

export default App;
