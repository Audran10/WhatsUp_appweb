import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserHomePage from './pages/user/HomePage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserHomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App