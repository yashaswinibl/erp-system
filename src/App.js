import './App.css';
import MainDash from './components/MainDash/MainDash';
import Sidebar from './components/Sidebar';
import Orders from './components/Orders/Orders';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Products from './components/Products/Products';
import OrderCalendar from './components/OrderCalendar/OrderCalendar';

function App() {
  return (
    <div className="App">
      <div className="AppGlass">
        <Router>
          <Sidebar />
          <Routes>
            <Route path="/" element={<MainDash />} />
            <Route path="/maindash" element={<MainDash />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/ordercalendar" element={<OrderCalendar />} />
           
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
