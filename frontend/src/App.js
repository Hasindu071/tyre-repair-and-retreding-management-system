import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import RoleRegisterSelection from "./components/RoleRegisterSelection";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/RoleRegisterSelection" element={<RoleRegisterSelection />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
