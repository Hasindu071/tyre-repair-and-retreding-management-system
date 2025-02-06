import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import RoleRegisterSelection from "./components/RoleRegisterSelection";
import OwnerRegister from './components/OwnerRegister';
import WorkerRegister from './components/WorkerRegister';
import CustomerRegister from './components/CustomerRegister';
import About from './components/about';
import Contact from './components/contact';
import HowItWorks from './components/HowItWorks';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/RoleRegisterSelection" element={<RoleRegisterSelection />} />
          <Route path="/register/owner" element={<OwnerRegister />} />
          <Route path="/register/worker" element={<WorkerRegister />} />
          <Route path="/register/customer" element={<CustomerRegister />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/HowItWorks" element={<HowItWorks />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
