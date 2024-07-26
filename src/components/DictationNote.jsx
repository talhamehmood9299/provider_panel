import { useState } from "react";
import Select from "./Select";
import { AiFillAudio } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { IoMdSend } from "react-icons/io";

const DictationNote = () => {
  const [selectedFile, setSelectedFile] = useState(null);

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
    <div className="flex flex-col gap-6 w-full">
      <h2 className="text-xl font-bold text-[#1E328F]">Dictation Note</h2>
      <Select
        value={"hello"}
        onChange={() => console.log("selecint")}
        options={dropdownOptions}
        placeholder="Select Provider"
        styles={{
          control: "w-full h-14 border-1 bg-white rounded-lg",
        }}
      />
      <div className="h-[30%] bg-white rounded-xl border p-4">
        Comment here...
      </div>
      <div className="flex items-center justify-between relative rounded-full border-2 py-2 px-[20px] mx-10 my-5">
        <button className="flex items-center justify-between gap-2">
          <RxCross2 />
          <span>CANCEL</span>
        </button>
        <button className="absolute left-[159px] p-4 bg-blue-900 rounded-full">
          <AiFillAudio className="text-white" size={30} />
        </button>
        <button className="flex items-center justify-between gap-2">
          <span className="">SEND</span>
          <IoMdSend />
        </button>
      </div>
    </div>
  );
};

export default DictationNote;
