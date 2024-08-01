import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "./Select";
import { AiFillAudio } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { IoMdSend } from "react-icons/io";
import { getPatients, sendDictation } from "../api/apiEndpoints";
import toast from "react-hot-toast";
import { visualizeData } from "../helpers/visualizeData";
import {
  setFormState,
  setTranscription,
} from "../redux/reducers/recordingReducer";

const DictationNote = () => {
  const locationId = useSelector((state) => state.location.selectedLocationId);
  const provider = useSelector((state) => state.provider.providers);
  const dispatch = useDispatch();
  const [patientNames, setPatientNames] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [recordedUrl, setRecordedUrl] = useState(null);
  const audioChunksRef = useRef([]);
  const [formData, setFormData] = useState({
    name_of_patient: "",
    provider_id: provider?.azz_id || "",
    audio_file: null,
    comments: "",
    text: "",
  });

  // Audio visualization setup
  const audioContextRef = useRef(null);
  const analyzerRef = useRef(null);
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const animationControllerRef = useRef(null);
  const mediaRecorderRef = useRef(null);

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
  }, [provider, locationId]);

  const setupAudioContext = () => {
    if (audioContextRef.current) return;
    audioContextRef.current = new AudioContext();
    analyzerRef.current = audioContextRef.current.createAnalyser();
  };

  const startRecording = () => {
    setupAudioContext();
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const recorder = new MediaRecorder(stream);
        mediaRecorderRef.current = recorder;
        const source = audioContextRef.current.createMediaStreamSource(stream);
        source.connect(analyzerRef.current);
        audioChunksRef.current = [];

        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        recorder.onstop = async () => {
          if (audioChunksRef.current.length > 0) {
            const audioBlob = new Blob(audioChunksRef.current, {
              type: "audio/mpeg ",
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
        visualizeData({
          canvasRef,
          audioContextRef,
          analyzerRef,
          barWidth: 3,
          gradientColors: ["#2392f5", "#fe0095", "purple"],
          visualizationType: "bars",
        });
        toast.success("Recording started");
      })
      .catch((error) => console.error("Error accessing microphone:", error));
  };

  const handleFileConversion = async (blob) => {
    try {
      const file = new File([blob], "recording.mp3", { type: "audio/mpeg" });
      setFormData((prev) => ({
        ...prev,
        audio_file: file,
      }));
    } catch (error) {
      console.error("Error converting Blob to File:", error);
    }
  };

  const stopRecording = async () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop()); // Stop all tracks
      mediaRecorderRef.current = null;
      if (animationControllerRef.current) {
        cancelAnimationFrame(animationControllerRef.current);
        animationControllerRef.current = null;
      }
      toast.success("Recording stopped");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.audio_file || !formData.name_of_patient) {
      console.error("Required fields are missing.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name_of_patient", formData.name_of_patient);
    formDataToSend.append("provider_id", formData.provider_id);
    formDataToSend.append("audio_file", formData.audio_file);
    formDataToSend.append("comments", formData.comments);
    formDataToSend.append("text", formData.text || "");

    try {
      const res = await sendDictation(formDataToSend);
      console.log("----------------------", formData);
      dispatch(setTranscription(res.text));
      dispatch(
        setFormState({
          name_of_patient: formData.name_of_patient,
          provider_id: formData?.provider_id,
          audio_file: formData?.audio_file,
          comments: formData.comments,
          text: formData.text,
        })
      );
      toast.success(res.message);
      return res;
    } catch (error) {
      console.error("Error sending dictation:", error);
    }
  };

  const handlePatientChange = (e) => {
    const selectedOptionValue = e.target.value;
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

  useEffect(() => {
    return () => {
      if (animationControllerRef.current) {
        cancelAnimationFrame(animationControllerRef.current);
      }
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stream
          .getTracks()
          .forEach((track) => track.stop()); // Ensure tracks are stopped
        mediaRecorderRef.current = null;
      }
    };
  }, []);

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
          cols={60}
          className="bg-white text-gray-500 rounded-xl resize-none focus:outline-none border p-4 my-5"
          placeholder="Comment here..."
          name="comments"
          value={formData.comments}
          onChange={handleCommentsChange}
        />
        <div className="w-full h-[104px] relative bg-white border rounded-lg mb-10"></div>
        <canvas
          ref={canvasRef}
          width={450}
          className="absolute top-[533px]"
          height={100}
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
            className="absolute left-[127px] p-5 bg-blue-900 rounded-full transition-transform transform hover:scale-110 hover:shadow-lg"
            onClick={startRecording}
          >
            <AiFillAudio className="text-white" size={40} />
          </button>
          <button
            type="submit"
            className="flex items-center justify-between hover:text-blue-900 font-semibold gap-2"
          >
            <span>NOTES</span>
            <IoMdSend size={22} className="text-black" />
          </button>
        </div>
        {recordedUrl && (
          <audio
            ref={audioRef}
            className="custom-audio-player mt-3 w-full"
            controls
            src={recordedUrl}
          />
        )}
      </form>
    </div>
  );
};

export default DictationNote;
