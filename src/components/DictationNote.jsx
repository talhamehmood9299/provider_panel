import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Select from "./Select";
import { AiFillAudio } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { IoMdSend } from "react-icons/io";
import { getPatients, sendDictation } from "../api/apiEndpoints";
import toast from "react-hot-toast";

const DictationNote = () => {
  const locationId = useSelector((state) => state.location.selectedLocationId);
  const provider = useSelector((state) => state.provider.providers);
  const [patientNames, setPatientNames] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedUrl, setRecordedUrl] = useState(null);
  const audioChunksRef = useRef([]);

  const [formData, setFormData] = useState({
    name_of_patient: "",
    provider_id: provider?.azz_id || "", // Use optional chaining to avoid errors
    audio_file: null,
    comments: "",
  });

  const getPatientsDetail = async () => {
    try {
      const azzId = provider.azz_id;
      const { patients } = await getPatients(locationId);
      let filteredPatients = patients.filter(
        (item) => item.provider_id === azzId
      );
      const dropdownOptions = filteredPatients.map((patient) => ({
        value: `${patient.first_name} ${patient.lastname}`,
        label: `${patient.first_name} ${patient.lastname}`,
      }));
      setPatientNames(dropdownOptions);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    getPatientsDetail();
  }, [provider, locationId]); // Include dependencies in the dependency array

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
        audioChunksRef.current = [];
        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        recorder.onstop = async () => {
          if (audioChunksRef.current.length > 0) {
            const audioBlob = new Blob(audioChunksRef.current, {
              type: "audio/webm",
            });
            const audioUrl = URL.createObjectURL(audioBlob);
            setRecordedUrl(audioUrl);
            await handleFileConversion(audioBlob);
            audioChunksRef.current = [];
          } else {
            console.error("No audio chunks available to create Blob.");
          }
        };

        recorder.start();
        toast.success("Recording started");
      })
      .catch((error) => console.error("Error accessing microphone:", error));
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      toast.success("Recording stopped");
    }
  };

  const convertBlobToAudioFile = async (blob) => {
    console.log("blob :", blob);
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result;
        // No need to convert if already in desired format; use blob directly
        const audioFile = new File([blob], "recording.mp3", {
          type: "audio/mp3",
        });
        resolve(audioFile);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(blob); // Use ArrayBuffer for better control
    });
  };

  const handleFileConversion = async (blob) => {
    console.log("blob :", blob);
    try {
      const file = new File([blob], "recording.webm", { type: "audio/webm" });
      setFormData((prev) => ({
        ...prev,
        audio_file: file,
      }));
    } catch (error) {
      console.error("Error converting Blob to File:", error);
    }
  };

  const dataURLToBlob = (dataURL, mimeType) => {
    const binary = atob(dataURL.split(",")[1]);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: mimeType });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.audio_file || !formData.name_of_patient) {
      console.error("Required fields are missing.");
      return;
    }

    const file = await convertBlobToAudioFile(formData.audio_file);
    const file2 = new File([file], "recording.mp3", { type: "audio/mp3" });

    console.log("sdddddddddd", formData.audio_file.name);

    const formDataToSend = new FormData();
    formDataToSend.append("name_of_patient", formData.name_of_patient);
    formDataToSend.append("provider_id", formData.provider_id);
    formDataToSend.append("audio_file", formData.audio_file.name);
    formDataToSend.append("comments", formData.comments);

    try {
      const res = await sendDictation(formData);
      console.log("Dictation sent successfully: ", res);
    } catch (error) {
      console.error("Error sending dictation:", error);
    }
  };

  const handlePatientChange = (e) => {
    const selectedOptionValue = e.target.value;
    console.log("Selected Option Value:", selectedOptionValue);

    // Find the selected patient from the list
    const selectedPatient = patientNames.find(
      (option) => option.value === selectedOptionValue
    );
    setFormData((prev) => ({
      ...prev,
      name_of_patient: selectedPatient ? selectedPatient.label : "",
    }));
  };

  const handleCommentsChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      comments: e.target.value,
    }));
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <h2 className="text-xl font-bold text-[#1E328F]">Dictation Note</h2>
      <form onSubmit={handleSubmit}>
        <Select
          value={formData.name_of_patient}
          onChange={(option) => {
            setSelectedPatient(option.value);
            handlePatientChange(option);
          }}
          options={patientNames}
          placeholder="Select Patient"
          styles={{
            control: "w-full h-14 border-1 bg-white rounded-lg",
          }}
        />
        <textarea
          rows={7}
          cols={55}
          className="bg-white text-gray-500 rounded-xl resize-none focus:outline-none border p-4 my-5"
          placeholder="Comment here..."
          name="comments"
          value={formData.comments}
          onChange={handleCommentsChange}
        />
        <div className="flex items-center justify-between relative rounded-full border-2 bg-white py-2 px-[20px] mx-20 my-5">
          <button
            type="button"
            className="flex items-center justify-between hover:text-blue-900 font-semibold gap-2"
            onClick={stopRecording}
          >
            <RxCross2 size={20} className="text-black" />
            <span>CANCEL</span>
          </button>
          <button
            type="button"
            className="absolute left-[113px] p-5 bg-blue-900 rounded-full transition-transform transform hover:scale-110 hover:shadow-lg"
            onClick={startRecording}
          >
            <AiFillAudio className="text-white" size={40} />
          </button>
          <button
            type="submit"
            className="flex items-center justify-between hover:text-blue-900 font-semibold gap-2"
          >
            <span>SEND</span>
            <IoMdSend size={22} className="text-black" />
          </button>
        </div>
        {recordedUrl && <audio controls src={recordedUrl} className="mt-4" />}
      </form>
    </div>
  );
};

export default DictationNote;
