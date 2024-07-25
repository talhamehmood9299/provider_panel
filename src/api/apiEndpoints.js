import { request } from "./apiClient";

// API functions
export const getPatients = async (locationId) => {
  const data = await request("/api/v1/show", "get", null, {
    location_id: locationId,
  });
  return data;
};

export const getLocations = async () => {
  const data = await request("/api/v1/locations");
  return data;
};

export const getProviders = async () => {
  const data = await request("/api/v1/providers");
  return data;
};

export const callPatient = async (patientId) => {
  const data = await request("/api/v1/patient-call", "get", null, {
    id: patientId,
  });
  return data;
};

export const endPatient = async (patientId) => {
  const data = await request("/api/v1/end", "get", null, { id: patientId });
  return data;
};

export const updateProfile = async (profileData) => {
  const data = await request(
    "/api/v1/provider-profile-update",
    "post",
    profileData
  );
  console.log("data in api: ", data);
  return data;
};

export const getSlotsByProvider = async (providerId, startDate, endDate) => {
  const data = await request("/api/v1/slots-by-provider", "get", null, {
    provider_id: providerId,
    start_date: startDate,
    end_date: endDate,
  });
  return data;
};
