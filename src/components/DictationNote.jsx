import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Select from "./Select";
import { AiFillAudio } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { IoMdSend } from "react-icons/io";
import { getPatients, sendDictation } from "../api/apiEndpoints";

const DictationNote = () => {
  const locationId = useSelector((state) => state.location.selectedLocationId);
  const provider = useSelector((state) => state.provider.providers);
  const [selectedFile, setSelectedFile] = useState(null);
  const [patientNames, setPatientNames] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  // for recording
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState("");

  const getPatientsDetail = async () => {
    const azzId = provider.azz_id;
    const { patients } = await getPatients(locationId);
    let filteredPatients = patients.filter(
      (item) => item.provider_id === azzId
    );
    const dropdownOptions = filteredPatients.map((patient) => ({
      value: patient.id,
      label: `${patient.first_name} ${patient.lastname}`,
    }));
    setPatientNames(dropdownOptions);
  };

  useEffect(() => {
    getPatientsDetail();
  }, []);

  const [recordedUrl, setRecordedUrl] = useState("");
  const mediaStream = useRef(null);
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStream.current = stream;
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.current.push(e.data);
        }
      };
      mediaRecorder.current.onstop = () => {
        const recordedBlob = new Blob(chunks.current, { type: "audio/webm" });
        const url = URL.createObjectURL(recordedBlob);
        setRecordedUrl(url);
        chunks.current = [];
      };
      mediaRecorder.current.start();
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };
  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.stop();
    }
    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach((track) => {
        track.stop();
      });
    }
  };
  // ----------------------------------------  //

  const addAudioElement = (blob) => {
    setSelectedFile(blob);
  };

  const convertBlobToAudioFile = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result;
        const audioFile = dataURLToBlob(dataUrl, "audio/mp3");
        resolve(audioFile);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
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

    if (selectedFile !== null) {
      const audioFile = await convertBlobToAudioFile(selectedFile);

      const formdata = new FormData();
      formdata.append(
        "name_of_patient",
        selectedPatient ? selectedPatient.label : ""
      );
      formdata.append("provider_id", provider.azz_id);
      formdata.append("audio_file", audioFile);
      formdata.append("text", "");
      formdata.append("comments", comments);
    }

    // const data = await sendDictation(formData)
    // console.log("Data in DictationNote: ", data);
  };

  const handlePatientChange = (e) => {
    setSelectedPatient(e.target.value);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <h2 className="text-xl font-bold text-[#1E328F]">Dictation Note</h2>
      <Select
        value={selectedPatient}
        onChange={handlePatientChange}
        options={patientNames}
        placeholder="Select Patient"
        styles={{
          control: "w-full h-14 border-1 bg-white rounded-lg",
        }}
      />
      <textarea
        rows={7}
        className=" bg-white text-gray-500 rounded-xl resize-none focus:outline-none border p-4"
        placeholder="Comment here..."
      />
      <div className="flex items-center justify-between relative rounded-full border-2 bg-white py-2 px-[20px] mx-20 my-5">
        <button
          className="flex items-center justify-between hover:text-blue-900 font-semibold gap-2"
          onClick={stopRecording}
        >
          <RxCross2 size={20} className="text-black" />
          <span>CANCEL</span>
        </button>
        <button
          className="absolute left-[113px] p-5 bg-blue-900 rounded-full transition-transform transform hover:scale-110 hover:shadow-lg"
          onClick={startRecording}
        >
          <AiFillAudio className="text-white" size={40} />
        </button>
        <button className="flex items-center justify-between hover:text-blue-900 font-semibold gap-2">
          <span className="">SEND</span>
          <IoMdSend size={22} className="text-black" />
        </button>
      </div>
      {audioUrl && <audio controls src={recordedUrl} className="mt-4" />}
    </div>
  );
};

export default DictationNote;
