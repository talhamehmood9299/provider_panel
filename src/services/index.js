import { getTokens } from "./api";

export const fetchTokens = async (patientId) => {
  try {
    const locationId = "12";
    const data = await getTokens(locationId);

    let filteredTokens = data
      .filter((item) => item.status === "active")
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      .slice(0, 6);

    const activetoken = filteredTokens.map((item) => ({
      id: item.id,
      roomNo: item.room,
      tokenNo: item.token_no,
      updatedAt: item.updated_at,
      currentPatientId: item.patient_id,
    }));
    const filteredToken = activetoken.filter(
      (item) => item.currentPatientId === patientId
    );
    speakTokenNumber(filteredToken);

    return filteredToken;
  } catch (error) {
    console.error("Error fetching tokens:", error);
  }
};

export const speakTokenNumber = (data) => {
  const speakToken = Object.assign(data.map((item) => item.tokenNo));
  console.log("speakTokenNumber", speakToken);
  const speech = new SpeechSynthesisUtterance(
    `Token number ${speakToken} is active.`
  );
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;
  window.speechSynthesis.speak(speech);
};
