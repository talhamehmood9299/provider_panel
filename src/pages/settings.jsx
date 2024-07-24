import { useState, useEffect } from "react";
import Input from "../components/Input";
import TextArea from "../components/TextArea";

const Settings = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    description: "",
    address: "",
    roomNo: "",
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("persist:root");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const providerData = JSON.parse(parsedData.provider || "{}");

      if (providerData.providers) {
        setFormData({
          fullName: providerData.providers.name || "",
          description: providerData.providers.description || "",
          address: providerData.providers.address || "",
          roomNo: providerData.providers.room || "",
        });

        // Set profile image if available
        if (providerData.providers.profile) {
          setProfileImage(providerData.providers.profile);
        }
      }
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("fullName", formData.fullName);
    form.append("description", formData.description);
    form.append("address", formData.address);
    form.append("roomNo", formData.roomNo);

    if (imageFile) {
      form.append("profileImage", imageFile.name);
    }
    // console.log("Form submitted with data", formData);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          label="Full Name"
          placeholder="Type here"
          value={formData.fullName}
          onChange={handleChange}
          name="fullName"
        />
        <TextArea
          label="Description"
          placeholder="Bio"
          value={formData.description}
          onChange={handleChange}
          name="description"
        />
        <Input
          label="Address"
          placeholder="Type here"
          value={formData.address}
          onChange={handleChange}
          name="address"
        />
        <Input
          label="Room no."
          placeholder="Type here"
          value={formData.roomNo}
          onChange={handleChange}
          name="roomNo"
        />
        <div className="flex items-start space-x-4">
          <label className="w-32 font-semibold text-black">Profile Image</label>
          <div className="w-full">
            <input
              type="file"
              name="profileImage"
              className="file-input file-input-bordered file-input-success bg-white w-full"
              onChange={handleImageChange}
            />
            {profileImage && (
              <img
                src={profileImage}
                alt="Profile"
                className="mt-4 w-24 h-24 object-cover rounded-md"
              />
            )}
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-900 text-white py-2 w-[10%] rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Settings;
