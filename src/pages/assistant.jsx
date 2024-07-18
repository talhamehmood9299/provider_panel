import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Assistant = () => {
  return (
    <div className="flex w-full h-full">
      <Sidebar />
      <div className="flex-1 p-10 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default Assistant;
