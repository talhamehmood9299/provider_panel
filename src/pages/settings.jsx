import { useState, useEffect } from "react";
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import { updateProfile } from "../api/apiEndpoints";
import { useDispatch, useSelector } from "react-redux";
import { setProvider } from "../redux/reducers/providersReducer";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const provider = useSelector((state) => state.provider.providers);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    room: "",
    profileImage: "",
    azz_id: "",
    modes: "",
    assistant_email: "",
  });

  useEffect(() => {
    if (provider) {
      setFormData({
        name: provider.name || "",
        description: provider.description || "",
        address: provider.address || "",
        room: provider.room || "",
        profile: provider.profile || "",
        azz_id: provider.azz_id || "",
        modes: provider.mode || "",
        assistant_email: provider.assistant_email || "",
      });
      setProfileImage(provider.profile || "");
    }
  }, [provider]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
        setFormData({
          ...formData,
          profileImage: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProviderInfo = await updateProfile(formData);
      dispatch(
        setProvider({
          name: formData.name,
          profile: formData.profile,
          room: formData.room,
          description: formData.description,
          address: formData.address,
          azz_id: formData.azz_id,
          modes: formData.modes,
          assistant_email: formData.assistant_email,
        })
      );
      navigate("/assistants/patientCheckIn");
      toast.success(updatedProviderInfo.message);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className=" md:overflow-y-auto h-[65vh] bg-white rounded-lg shadow-md p-4 md:p-6">
      <h2 className="text-lg md:text-xl text-blue-900 font-bold pb-2 md:pb-4 mb-3 md:mb-5 border-b">
        Update Profile
      </h2>
      <div className="h-[61vh]">
        <form className="space-y-3 md:space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            placeholder="Type here"
            value={formData.name}
            onChange={handleChange}
            name="name"
          />
          <Input
            label="Description"
            placeholder="Bio"
            value={formData.description}
            onChange={handleChange}
            name="description"
          />
          <Input
            label="Address"
            placeholder="Type here to"
            value={formData.address}
            onChange={handleChange}
            name="address"
          />
          <Input
            label="Room no."
            placeholder="Type here"
            value={formData.room}
            onChange={handleChange}
            name="room"
          />
          <Input
            type="email"
            label="Assistant Email"
            placeholder="Enter your assistant email"
            value={formData.assistant_email}
            onChange={handleChange}
            name="assistant_email"
          />
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <label className="w-full sm:w-32 font-semibold text-black text-center sm:text-left">
              Modes
            </label>
            <div className="w-full">
              <select
                id="modes"
                name="modes"
                value={formData.modes}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-full bg-white"
              >
                <option value="">Select a mode</option>
                <option value="telehealth">Telehealth</option>
                <option value="office">Office</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <label className="w-full sm:w-32 font-semibold text-black text-center sm:text-left">
              Profile Image
            </label>
            <div className="w-full">
              <input
                type="file"
                name="profileImage"
                className="file-input file-input-bordered file-input-primary bg-white w-full"
                onChange={handleImageChange}
              />
              {profileImage && (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="mt-2 md:mt-4 w-20 md:w-24 h-20 md:h-24 object-cover rounded-md"
                />
              )}
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-900 hover:bg-blue-800 text-white p-2 py-2 w-full sm:w-auto sm:px-4 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
