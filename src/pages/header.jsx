import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-blue-900 fixed top-0 w-full z-50">
      <div className="container px-24 py-4 flex items-center">
        <div className="bg-white cover rounded-md p-2">
          <Link to="/">
            <img src="/logo.png" alt="Site Logo" className="w-[135px] h-8" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
