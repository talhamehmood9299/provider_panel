import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/reducers/authReducer";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });

  const handleLogin = () => {
    dispatch(login());
    navigate("/assistants");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="w-full flex items-start justify-center">
      <form
        onSubmit={handleLogin}
        className="px-20 mt-32 pt-10 mb-[196px] pb-16 bg-[#1E328F]/15  shadow-2xl flex flex-col items-center justify-center gap-3 rounded-xl "
      >
        <div className="font-semibold text-2xl text-[#1E328F]  text-center py-5">
          Sign in to your account
        </div>

        <label className="rounded flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-5 h-5 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            required
            name="userName"
            value={user.userName}
            onChange={handleChange}
            type="text"
            className="py-2 px-2 rounded border-none border-"
            placeholder="Username"
          />
        </label>
        <label className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-5 h-5 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            required
            name="password"
            value={user.password}
            onChange={handleChange}
            type="password"
            className="py-2 px-2 rounded"
            placeholder="Password"
          />
        </label>
        <button className="bg-blue-900 text-white rounded py-2 w-full text-lg mt-5">
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;
