import axios from "axios";

const apiUrl = import.meta.env.VITE_BASE_URL;
const clientId = import.meta.env.VITE_CLIENT_ID;
const authToken = import.meta.env.VITE_AUTH_TOKEN;

const createConfig = (url, method = "get", data = null, params = {}) => {
  const isFormData = data instanceof FormData;
  return {
    method,
    url: `${apiUrl}${url}`,
    headers: {
      client_id: clientId,
      auth_token: authToken,
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
    },
    params,
    data,
  };
};

export const request = async (
  url,
  method = "get",
  data = null,
  params = {}
) => {
  try {
    const config = createConfig(url, method, data, params);
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error(
      `Error making ${method.toUpperCase()} request to ${url}:`,
      error.message
    );
    throw error;
  }
};
