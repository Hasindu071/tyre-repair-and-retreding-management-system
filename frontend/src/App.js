import React from 'react';
import { ToastContainer } from 'react-toastify';


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RoleRegisterSelection from "./pages/RoleRegisterSelection";
import OwnerRegister from './pages/OwnerRegister';
import WorkerRegister from './pages/WorkerRegister';
import CustomerRegister from './pages/CustomerRegister';
import About from './pages/about';
import Contact from './pages/contact';
import HowItWorks from './pages/HowItWorks';
import RoleLoginSelection from './pages/RoleLoginSelection';
import WorkerLogin from './pages/WorkerLogin';
import OwnerLogin from './pages/OwnerLogin';
import CustomerLogin from './pages/CustomerLogin';
import CustomerDashboard from './pages/CustomerDashboard';
import OwnerDashboard from './pages/OwnerDashboard';
import WorkerDashboard from './pages/WorkerDashboard';
import ChooseService from './pages/ChooseService';
import MyOrders from './pages/MyOrders';
import CustomerProfile from './pages/CustomerProfile';
import RetreadingService from './pages/Retreading';
import RepairingService from './pages/Repairing';
import ApproveWorker from './pages/ApproveWorker';
import ApproveOrder from './pages/ApproveOrder';
import AssignWorker from './pages/AssignWorker';
import WorkerProfile from './pages/WorkerProfile';
import WorkerMessage from './pages/WorkerMassage';
import Inquiries from './pages/Inquiries';
import OwnerProductInquiries from './pages/OwnerProductInquiries';
import WorkerStocks from './pages/WorkerStocks';
import OwnerSeePayment from './pages/OwnerSeePayment';
import CustomerHandle from './pages/CustomerHandle';
import CustomerSignup from './pages/CustomerSignup';
import WorkerSignup from './pages/WorkerSignup';
import CustomerNotice from './pages/CustomerNotice';
import CustomerPayment from './pages/CustomerPayment';
import Notification from './pages/notification';
import OwnerSendNotice from './pages/OwnerSendNotice';
import YourService from './pages/YourService';
import Supplies from './pages/Supplies';
import WorkerTasks from './pages/WorkerTasks';
import WorkerProfileImage from './pages/WorkerProfileImage';

function App() {
  return (
    <div>
      <ToastContainer />
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
            <Route path="/Customer/Profile" element={<CustomerProfile />} />
            <Route path="/service/Retreading" element={<RetreadingService />} />
            <Route path="/service/Repairing" element={<RepairingService />} />
            <Route path="/ApproveWorker" element={<ApproveWorker />} />
            <Route path="/ApproveOrder" element={<ApproveOrder />} />
            <Route path="/AssignWorker" element={<AssignWorker />} />
            <Route path="/Worker/Profile" element={<WorkerProfile />} />
            <Route path="/Worker/Message" element={<WorkerMessage />} />
            <Route path="/Inquiries" element={<Inquiries />} />
            <Route path="/OwnerProductInquiries" element={<OwnerProductInquiries />} />
            <Route path="/Worker/Stocks" element={<WorkerStocks />} />
            <Route path="/Owner/SeePayment" element={<OwnerSeePayment />} />
            <Route path="/CustomerHandle" element={<CustomerHandle />} />
            <Route path="/CustomerSignup" element={<CustomerSignup />} />
            <Route path="/WorkerSignup" element={<WorkerSignup />} />
            <Route path="/notice" element={<CustomerNotice />} />
            <Route path="/Owner/SeeCustomerPayment" element={<CustomerPayment />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/Owner/SendNotice" element={<OwnerSendNotice />} />
            <Route path="/services" element={<YourService />} />
            <Route path="/Owner/Supplies" element={<Supplies />} />
            <Route path="/workerTask/:workerId" element={<WorkerTasks />} />
            <Route path="/WorkerProfileImage" element={<WorkerProfileImage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
