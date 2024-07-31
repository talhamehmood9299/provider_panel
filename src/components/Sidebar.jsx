import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ImCross } from "react-icons/im";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const defaultPath = "/assistants/patientCheckIn";
  const [active, setActive] = useState(location.pathname);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (location.pathname === "/assistants") {
      navigate(defaultPath);
    } else {
      setActive(location.pathname);
    }
  }, [location.pathname, navigate, defaultPath]);

  const menuItems = [
    {
      path: "/assistants/appointmentDetails",
      name: "Appointment Details",
      icon: "📅",
    },
    {
      path: "/assistants/patientCheckIn",
      name: "Patient Check-In",
      icon: "📍",
    },
    { path: "/assistants/titanAi", name: "Titan AI", icon: "🤖" },
    { path: "/assistants/settings", name: "Settings", icon: "⚙️" },
  ];

  return (
    <>
      <button
        className={`fixed top-2 left-2 transition-transform duration-300 ease-in-out p-2 bg-blue-900 text-white rounded-md flex items-center justify-center z-40
          ${sidebarOpen ? "translate-x-64" : "translate-x-0"}
          lg:hidden
        `}
        onClick={() => setSidebarOpen(prev => !prev)}
      >
        {sidebarOpen ? <ImCross size={14} /> : "☰"}
      </button>

      <div
        className={`fixed top-0 left-0 w-64 min-h-screen bg-blue-900 text-white flex flex-col py-6 transition-transform duration-300 z-50
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:w-3/10 lg:flex lg:static lg:min-h-screen
        `}
      >
        <div className="flex justify-center mb-10 bg-white w-48 rounded items-center mx-auto">
          <img src="/logo.png" alt="AZZ Medical Associates" className="w-40" />
        </div>
        <nav className="flex flex-col space-y-2">
          {menuItems.map(({ path, name, icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center px-6 py-3 rounded-md mx-4 text-sm font-medium transition-colors ${
                active === path
                  ? "bg-white text-blue-900"
                  : "hover:bg-white hover:text-black"
              }`}
              onClick={() => setActive(path)}
            >
              <span className="mr-3 w-6 text-center">{icon}</span>
              {name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
