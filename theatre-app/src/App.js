import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Seats from './Components/Seats';
import Checkout from './Components/Checkout';
import Admin from './Components/Admin'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/seats/:name" element={<Seats/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/admin" element={<Admin/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
