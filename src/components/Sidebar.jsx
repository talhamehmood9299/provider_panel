import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const defaultPath = "/assistants/patientCheckIn";
  const [active, setActive] = useState(location.pathname);

  useEffect(() => {
    if (location.pathname === "/assistants") {
      navigate(defaultPath);
    } else {
      setActive(location.pathname);
    }
  }, [location.pathname, navigate]);

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
  ];

  return (
    <div className="w-1/6 min-h-screen bg-blue-900 text-white flex flex-col py-6">
      <div className="flex justify-center mb-10 bg-white w-48 rounded items-center mx-auto">
        <img src="/logo.png" alt="AZZ Medical Associates" className="w-40" />
      </div>
      <nav className="flex flex-col space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-6 py-3 rounded-md mx-4 text-sm font-medium transition-colors ${
              active === item.path
                ? "bg-white text-blue-900"
                : "hover:bg-white hover:text-black"
            }`}
            onClick={() => setActive(item.path)}
          >
            <span className="mr-3 w-6 text-center">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
