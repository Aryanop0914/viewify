import { Route, Routes } from 'react-router-dom';
import Home from './app/Home';
import Register from './app/Register';
import Login from './app/Login';

function App() {
   return (
      <>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
         </Routes>
      </>
   );
}

export default App;
