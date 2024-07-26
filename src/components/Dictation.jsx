import { useState } from "react";
import SearchBox from "./Search";
import { FaChevronCircleDown } from "react-icons/fa";

const Dictation = () => {
  const [isTranscriptVisible, setIsTranscriptVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const toggleTranscript = () => {
    setIsTranscriptVisible(!isTranscriptVisible);
  };

  return (
    <div className="bg-white shadow-lg p-6 rounded-lg border border-gray-200 w-full max-w-md">
      <div className="text-xl font-bold mb-6 text-[#1E328F] flex items-center">
        <div className="mask mask-circle w-20 mr-4">
          <img
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            alt="Profile"
          />
        </div>
        <SearchBox />
      </div>
      <div className="overflow-y-auto h-[550px] scrollbar-thin scrollbar-thumb-scrollbar scrollbar-track-scrollbar-track scrollbar-thumb-hover">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="mb-6 border border-gray-300 p-4 rounded-lg shadow-lg bg-gray-50"
          >
            <p className="font-semibold text-[#1E328F]">
              Date:{" "}
              <span className="text-gray-600">Mon, Jul 1, 2024, 7:54 PM</span>
            </p>
            <p className="font-semibold text-[#1E328F]">
              Patient Name: <span className="text-gray-600">Kenneth Glenn</span>
            </p>
            <audio controls className="mt-3"></audio>
            <div
              onClick={toggleTranscript}
              className="flex items-center cursor-pointer mt-3"
            >
              <span className="text-gray-800 mr-2"> Transcript</span>
              <FaChevronCircleDown className="text-[#1E328F]" />
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
  );
};

export default Dictation;
