import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import ProfileHeader from "../components/ProfileHeader.jsx";
import { logout } from "../redux/reducers/authReducer.js";
import toast from "react-hot-toast";

const Provider = () => {
  const provider = useSelector((state) => state.provider.providers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate("/");
    toast.success("You are now logged out");
  };

  return (
    <div className="flex w-full h-full">
      <Sidebar />
      <div className="flex-1 p-10 bg-gray-100">
        <div className="flex flex-col gap-5">
          <ProfileHeader provider={provider} handleLogout={handleLogout} />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Provider;
