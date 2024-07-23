import axios from "axios";

const apiUrl = import.meta.env.VITE_BASE_URL;
const clientId = import.meta.env.VITE_CLIENT_ID;
const authToken = import.meta.env.VITE_AUTH_TOKEN;

const createConfig = (url, params = {}) => ({
  method: "get",
  maxBodyLength: Infinity,
  url: `${apiUrl}${url}`,
  headers: {
    client_id: clientId,
    auth_token: authToken,
    "Content-Type": "application/json",
  },
  params,
});

export const getPatients = async (locationId) => {
  try {
    const config = createConfig("/api/v1/show", { location_id: locationId });
    const response = await axios.request(config);
    return response.data.patients;
  } catch (error) {
    console.error("Error fetching patients:", error.message);
    throw error;
  }
};

export const getLocation = async () => {
  try {
    const config = createConfig("/api/v1/locations");
    const response = await axios.request(config);
    return response.data.addresses;
  } catch (error) {
    console.error("Error fetching locations:", error.message);
    throw error;
  }
};

export const getProviders = async () => {
  try {
    const config = createConfig("/api/v1/providers");
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error("Error fetching locations:", error.message);
    throw error;
  }
};
