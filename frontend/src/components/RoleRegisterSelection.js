import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './NavBar'; // Import the Navbar component
import { FaUser, FaUserTie, FaUserCog } from "react-icons/fa"; // FontAwesome icons
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
      <div className="select-container">
        <h1 className="title-selection">Select Your Role</h1>
        <div className="role-grid-registerht-selection">
          {["Owner", "Worker", "Customer"].map((role) => (
            <div key={role} className="role-cardht-selection">
              <div className="icon-container">
                {role === "Owner" && <FaUserTie size={50} color="black" />}
                {role === "Worker" && <FaUserCog size={50} color="black" />}
                {role === "Customer" && <FaUser size={50} color="black" />}
              </div>
              <h2>{role}</h2> {/* Role name */}
              <button onClick={() => handleRegister(role)} className="register-button">
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
