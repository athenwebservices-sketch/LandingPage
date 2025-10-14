import React from 'react';
import Home from '../src/pages/Home';
import Navbar from './component/navbar/Navbar';
import Login from './pages/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div>
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </Router>
    </div>
  );
};

export default App;
