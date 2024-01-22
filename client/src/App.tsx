import { Route, Routes } from 'react-router-dom';
import Home from './app/Home';
import Register from './app/Register';
import Navbar from './app/Navbar';

function App() {
   return (
      <>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/navbar" element={<Navbar />} />
            <Route path="/register" element={<Register />} />
         </Routes>
      </>
   );
}

export default App;
