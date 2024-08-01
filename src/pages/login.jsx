import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/reducers/authReducer";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../api/firebase";
import Select from "../components/Select";
import { toast } from "react-hot-toast";
// import { getProviders, getLocations } from "../api/service";
import { setProvider } from "../redux/reducers/providersReducer";
import { setSelectedLocation } from "../redux/reducers/locationReducer";
import { getLocations, getProviders } from "../api/apiEndpoints";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // Provider states
  const [provider, setProviderLocal] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState("");
  // Location states
  const [location, setLocation] = useState([]);
  const [selectedLocation, setSelectedLocationLocal] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/provider");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const getProvidersInfo = async () => {
      try {
        const data = await getProviders();
        const options = data.map((item) => ({
          value: item.name,
          label: item.name,
          profile: item.profile,
          room: item.room,
          name: item.name,
          description: item.description,
          address: item.address,
          azz_id: item.azz_id,
        }));
        setProviderLocal(options);
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };
    getProvidersInfo();
  }, []);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const { addresses } = await getLocations();
        const options = addresses.map((item) => ({
          value: item.city,
          label: item.city,
          location_id: item.location_id,
          address: item.address,
        }));
        setLocation(options);
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };
    getLocation();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!user.email || !user.password) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      const { email, password } = user;
      await signInWithEmailAndPassword(auth, email, password);
      const providerInfo = provider.find(
        (item) => item.value === selectedProvider
      );
      if (providerInfo) {
        dispatch(
          setProvider({
            name: providerInfo.name,
            profile: providerInfo.profile,
            room: providerInfo.room,
            description: providerInfo.description,
            address: providerInfo.address,
            azz_id: providerInfo.azz_id,
          })
        );
      }
      const locationItem = location.find(
        (loc) => loc.value === selectedLocation
      );
      if (locationItem) {
        dispatch(
          setSelectedLocation({
            location: locationItem.value,
            locationId: locationItem.location_id,
            address: locationItem.address,
          })
        );
      }
      dispatch(login());
      toast.success("Login successful");
      navigate("/provider");
    } catch (error) {
      console.error("Error logging in:", error.message);
      if (error.message === "INVALID_LOGIN_CREDENTIALS") {
        toast.error("Incorrect email or password");
      } else {
        toast.error("Incorrect email or password");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const handleProviderChange = (e) => {
    setSelectedProvider(e.target.value);
  };
  const handleLocationChange = (e) => {
    setSelectedLocationLocal(e.target.value);
  };

  return (
    <div className="w-full flex items-start justify-center">
      <form
        onSubmit={handleFormSubmit}
        className="px-20 my-32 pt-10 pb-16 bg-[#1E328F]/15  shadow-2xl flex flex-col items-center justify-center gap-3 rounded-xl  "
      >
        <div className="font-semibold text-2xl text-[#1E328F]  text-center py-5">
          Sign in to your account
        </div>
        <Select
          value={selectedProvider}
          onChange={handleProviderChange}
          options={provider}
          placeholder="Select Provider"
          styles={{
            control: "w-60 h-12 border-1 border-blue-500 bg-white rounded-lg",
          }}
        />
        <Select
          required
          value={selectedLocation}
          onChange={handleLocationChange}
          options={location}
          placeholder="Select Location"
          styles={{
            control: "w-60 h-12 border-1 border-blue-500 bg-white rounded-lg",
          }}
        />
        <label className="input input-[#1E328F] bg-white text-black border-blue-500 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            required
            value={user.email}
            onChange={handleChange}
            type="email"
            name="email"
            className="grow"
            placeholder="Email"
          />
        </label>
        <label className="input input-[#1E328F] bg-white text-black border-blue-500 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            required
            value={user.password}
            onChange={handleChange}
            name="password"
            type="password"
            className="grow"
            placeholder="Password"
          />
        </label>

        <button className="btn bg-[#1E328F] hover:bg-blue-800 text-white w-full text-lg mt-5">
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;
