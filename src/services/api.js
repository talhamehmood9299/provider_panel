import axios from "axios";

const apiUrl = import.meta.env.VITE_BASE_URL;
const clientId = import.meta.env.VITE_CLIENT_ID;
const authToken = import.meta.env.VITE_AUTH_TOKEN;

let config = {
  method: "get",
  maxBodyLength: Infinity,
  url: `${apiUrl}/api/v1/show`,
  headers: {
    client_id: clientId,
    auth_token: authToken,
    "Content-Type": "application/json",
  },
};

export const getTokens = async (locationId) => {
  try {
    config.params = { location_id: locationId };
    const response = await axios.request(config);
    return response.data.patients;
  } catch (error) {
    console.error("Error fetching tokens:", error.message);
    throw error;
  }
};
