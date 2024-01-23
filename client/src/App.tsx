import { Route, Routes } from 'react-router-dom';
import Home from './app/Home';
import Register from './app/Register';

function App() {
   return (
      <>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
         </Routes>
      </>
   );
}

export default App;
