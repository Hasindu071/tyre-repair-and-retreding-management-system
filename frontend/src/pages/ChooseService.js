import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomerSidebar from "../components/CustomerSidebar"; // Sidebar component
import { FaTools, FaRecycle } from "react-icons/fa"; // Importing icons
import '../styles/ChooseService.css'; // Import CSS file

const ChooseService = () => {
  const navigate = useNavigate();

  const handleRegister = (role) => {
    navigate(`/service/${role.toLowerCase()}`);
  };

  return (
    <div>
      <CustomerSidebar />
      <div className="role-service-selection-container">
      <div className="select-service-container-back">
        <h1 className="title-service">Select Your Service</h1>
        <div className="role-service-grid">
          {/* Retreading Service */}
          <div className="role-service-card-choose">
            <FaRecycle size={60} className="service-icon-choose" />
            <h2>Retreading</h2>
            <button onClick={() => handleRegister("Retreading")} className="role-service-button">
              Choose
            </button>
          </div>

          {/* Repairing Service */}
          <div className="role-service-card-choose">
            <FaTools size={60} className="service-icon-choose" />
            <h2>Repairing</h2>
            <button onClick={() => handleRegister("Repairing")} className="role-service-button">
              Choose
            </button>
          </div>
        </div>
      </div>
    </div>
</div>
  );
};

export default ChooseService;
