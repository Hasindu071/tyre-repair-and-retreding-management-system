import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './NavBar'; // Import the Navbar component
import '../styles/RoleLoginSelection.css'; // Import the CSS file for styling


const RoleLoginSelection = () => {
  const navigate = useNavigate();

  const handleRegister = (role) => {
    navigate(`/login/${role.toLowerCase()}`);
  };

  return (
    <div>
      <Navbar />
      <div className="role--login-selection-container">
        <h1 className="title-login">Select Your Role</h1>
        <div className="role-login-grid">
          {["Owner", "Worker", "Customer"].map((role) => (
            <div key={role} className="role-login-card">
              <h2>{role}</h2>
              <button onClick={() => handleRegister(role)} className="role-login-button">
                Login
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleLoginSelection;
