import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/NavBar';
import { FaUser, FaUserTie, FaUserCog } from "react-icons/fa";
import '../styles/RoleSelection.css';

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRegister = (role) => {
    navigate(`/register/${role.toLowerCase()}`);
  };

  return (
    <div>
      <Navbar />
      
      <div className="role-selection-container">
        <div className="select-container">
          <h1 className="title-selection">Choose Your Role</h1>
          <p className="subtitle-selection">
            Select the role that best describes you and start your journey with us.
          </p>
          <div className="role-grid">
            {[
              { name: "Owner", icon: <FaUserTie size={50} />, color: "#ff6f61" },
              { name: "Worker", icon: <FaUserCog size={50} />, color: "#4CAF50" },
              { name: "Customer", icon: <FaUser size={50} />, color: "#007bff" }
            ].map(({ name, icon, color }) => (
              <div 
                key={name} 
                className="role-card" 
                style={{ borderColor: color }}
                onClick={() => handleRegister(name)}
              >
                <div className="icon-container" style={{ backgroundColor: color }}>
                  {icon}
                </div>
                <h2>{name}</h2>
                <button className="register-button" style={{ backgroundColor: color }}>
                  Register
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
