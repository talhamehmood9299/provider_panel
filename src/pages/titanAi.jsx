import { useState } from "react";
import { MdCancel } from "react-icons/md";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import Select from "../components/Select";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import SearchBox from "../components/search";
import { IoMdSend } from "react-icons/io";

const TitanAi = () => {
  const [isTranscriptVisible, setIsTranscriptVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const toggleTranscript = () => {
    setIsTranscriptVisible(!isTranscriptVisible);
  };

  const dropdownOptions = [
    { value: "red", label: "Red" },
    { value: "blue", label: "Blue" },
    { value: "green", label: "Green" },
    { value: "yellow", label: "Yellow" },
  ];
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
      formdata.append("name_of_patient", patient);
      formdata.append("provider", provider);
      formdata.append("audio_file", audioFile);
      formdata.append("text", "");
      formdata.append("comments", comments);
      formdata.append("status", "pending");
    }
  };

  return (
    <div className="flex space-x-12">
      <div className="bg-white shadow-lg p-6 rounded-lg border border-gray-200 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-[#1E328F] flex items-center">
          <div className="mask mask-squircle w-24 mr-4">
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              alt="Profile"
            />
          </div>
          <SearchBox />
        </h2>
        <div className="overflow-y-auto h-[650px] scrollbar-thin scrollbar-thumb-scrollbar scrollbar-track-scrollbar-track scrollbar-thumb-hover">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="mb-6 border border-gray-300 p-4 rounded-lg shadow-lg bg-gray-50"
            >
              <p className="font-semibold text-[#1E328F]">
                Date: Mon, Jul 1, 2024, 7:54 PM
              </p>
              <p className="font-semibold text-[#1E328F]">
                Patient Name: Kenneth Glenn
              </p>
              <audio controls className="mt-3 rounded-lg bg-gray-100">
                <div className="mb-2"></div>
              </audio>
              <div
                onClick={toggleTranscript}
                className="flex items-center cursor-pointer mt-3"
              >
                <p className="font-medium text-gray-600">Transcript</p>
                <FontAwesomeIcon
                  icon={isTranscriptVisible ? faChevronUp : faChevronDown}
                  className="ml-2 text-[#1E328F]"
                />
              </div>
              {isTranscriptVisible && (
                <div className="mt-3">
                  <p className="text-sm text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Dictation Note */}
      <div className="bg-white shadow-lg p-4 rounded-lg border border-gray-200 w-[400px] h-[450px] mt-24">
        <h2 className="text-xl font-bold mb-4 text-[#1E328F]">
          Dictation Note
        </h2>
        <Select
          value={"hello"}
          onChange={() => console.log("selecint")}
          options={dropdownOptions}
          placeholder="Select Provider"
          styles={{
            control:
              "w-[370px] h-12 border-1 border-blue-500 bg-white rounded-lg",
          }}
        />
        <div className="mt-24 p-2 rounded-lg border border-gray-300 bg-gray-50 h-[200px] flex flex-col items-center justify-center">
          <p className="text-gray-600 text-center">
            Recording transcript goes here when an audio file is uploaded...
          </p>
          <span className="mt-4 flex items-center justify-center"></span>
        </div>
        <div className="flex justify-center items-center pt-14">
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center space-y-6 max-w-md w-full">
            <h2 className="text-3xl font-semibold text-[#1E328F] mb-4">
              Record Your Audio
            </h2>
            <div className="flex items-center space-x-4">
              <MdCancel className="text-red-500 text-2xl cursor-pointer hover:text-red-600 transition ease-in-out duration-300" />
              <div className="flex-1">
                <AudioRecorder
                  showVisualizer={true}
                  onRecordingComplete={addAudioElement}
                  audioTrackConstraints={{
                    noiseSuppression: true,
                    echoCancellation: false,
                  }}
                  downloadOnSavePress={false}
                  downloadFileExtension="mp3"
                  className="w-full text-blue-600"
                />
              </div>
              <IoMdSend className="text-blue-500 text-2xl cursor-pointer hover:text-blue-600 transition ease-in-out duration-300" />
            </div>
            <p className="text-sm text-gray-500 text-center mt-4">
              Click the button to start recording
            </p>
          </div>
        </div>
      </div>
      {/* New Transcript Card */}
      <div className="card bg-base-100 w-[400px] h-[600px] shadow-xl mt-24">
        <div className="card-body p-4">
          <h2 className="text-2xl font-bold mb-4 text-[#1E328F]">Transcript</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
        </div>
      </div>
    </div>
  );
};

export default TitanAi;
