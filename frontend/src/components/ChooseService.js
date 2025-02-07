import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import NewNavbar from "../components/Navbars/CustomerRegiNavBar"; // Assuming you have a Navbar component
import '../styles/ChooseService.css'; // Import the CSS file for styling


const ChooseService = () => {
  const navigate = useNavigate();

  const handleRegister = (role) => {
    navigate(`/service/${role.toLowerCase()}`);
  };

  return (
    <div>
      <NewNavbar />
      <div className="role-service-selection-container">
        <h1 className="title-service">Select Your Service</h1>
        <div className="role-service-grid">
          {["Retreading", "Repairing"].map((role) => (
            <div key={role} className="role-service-card">
              <h2>{role}</h2>
              <button onClick={() => handleRegister(role)} className="role-service-button">
                Choose
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChooseService;
