import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './NavBar'; // Import the Navbar component
import '../styles/RoleSelection.css'; // Import the CSS file for styling


const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRegister = (role) => {
    navigate(`/register/${role.toLowerCase()}`);
  };

  return (
    <div>
      <Navbar />
      <div className="role-selection-container">
        <h1 className="title">Select Your Role</h1>
        <div className="role-grid">
          {["Owner", "Worker", "Customer"].map((role) => (
            <div key={role} className="role-card">
              <h2>{role}</h2>
              <button onClick={() => handleRegister(role)} className="register-button">
                Register
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
