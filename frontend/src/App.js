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
import RoleLoginSelection from './components/RoleLoginSelection';
import WorkerLogin from './components/WorkerLogin';
import OwnerLogin from './components/OwnerLogin';
import CustomerLogin from './components/CustomerLogin';
import CustomerDashboard from './components/CustomerDashboard';
import OwnerDashboard from './components/OwnerDashboard';
import WorkerDashboard from './components/WorkerDashboard';
import ChooseService from './components/ChooseService';
import MyOrders from './components/MyOrders';
import MyProfile from './components/MyProfile';
import RetreadingService from './components/Retreading';
import RepairingService from './components/Repairing';
import ApproveWorker from './components/ApproveWorker';
import ApproveOrder from './components/ApproveOrder';

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
          <Route path="/RoleLoginSelection" element={<RoleLoginSelection />} />
          <Route path="/login/worker" element={<WorkerLogin />} />
          <Route path="/login/owner" element={<OwnerLogin />} />
          <Route path="/login/customer" element={<CustomerLogin />} />
          <Route path="/CustomerDashboard" element={<CustomerDashboard />} />
          <Route path="/OwnerDashboard" element={<OwnerDashboard />} />
          <Route path="/WorkerDashboard" element={<WorkerDashboard />} />
          <Route path="/service" element={<ChooseService />} />
          <Route path="/MyOrders" element={<MyOrders />} />
          <Route path="/MyProfile" element={<MyProfile />} />
          <Route path="/service/Retreading" element={<RetreadingService />} />
          <Route path="/service/Repairing" element={<RepairingService />} />
          <Route path="/ApproveWorker" element={<ApproveWorker />} />
          <Route path="/ApproveOrder" element={<ApproveOrder />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
