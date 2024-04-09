import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/user/HomePage';
import RegisterPage from './pages/user/RegisterPage';
import LoginPage from './pages/user/LoginPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/signin" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
