import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Navbar from './NavBar'; // Import the Navbar component

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRegister = (role) => {
    navigate(`/register/${role.toLowerCase()}`);
  };

  return (
    <div>
      <Navbar /> {/* Add the Navbar component here */}
      <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-8">Select Your Role</h1>
        <div className="grid grid-cols-3 gap-6">
          {["Owner", "Worker", "Customer"].map((role) => (
            <div
              key={role}
              className="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-lg transition cursor-pointer"
            >
              <h2 className="text-xl font-semibold mb-4">{role}</h2>
              <button
                onClick={() => handleRegister(role)}
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
              >
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