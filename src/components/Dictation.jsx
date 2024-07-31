import { useEffect, useState } from "react";
import SearchBox from "./Search";
import { FaChevronCircleDown } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";
import { getProviderDictations } from "../api/apiEndpoints";
import { formatDateTime } from "../helpers";

const Dictation = () => {
  const provider = useSelector((state) => state.provider.providers);
  const [isTranscriptVisible, setIsTranscriptVisible] = useState([]);
  const [dictation, setDictation] = useState(null);
  const [filteredDictation, setFilteredDictation] = useState(null);

  const toggleTranscript = (index) => {
    setIsTranscriptVisible((prev) => {
      const newVisibility = [...prev];
      newVisibility[index] = !newVisibility[index];
      return newVisibility;
    });
  };

  const getDictations = async () => {
    const data = await getProviderDictations(provider.azz_id);
    setDictation(data);
    setFilteredDictation(data);
  };

  const handleSearch = (query) => {
    if (!dictation) return;
    const filteredData = dictation.data.filter((item) =>
      item.name_of_patient.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredDictation({ ...dictation, data: filteredData });
  };

  useEffect(() => {
    getDictations();
  }, []);

  return (
    <div className="bg-white shadow-lg px-6 py-2 rounded-lg border border-gray-200 w-full max-w-md">
      <div className="flex items-center text-xl font-bold mb-6 text-[#1E328F]">
        <div className="mask mask-circle w-20 mr-4">
          <img src={provider.profile} alt="Profile" />
        </div>
        <SearchBox onSearch={handleSearch} />
      </div>
      <div className="overflow-y-auto h-[560px] scrollbar-thin scrollbar-thumb-scrollbar scrollbar-track-scrollbar-track scrollbar-thumb-hover">
        {filteredDictation?.data?.map((item, i) => (
          <div
            key={i}
            className="mb-6 border border-gray-300 p-4 rounded-lg shadow-lg bg-gray-50"
          >
            <p className="text-[#1E328F]">
              <span className="font-bold">Date:</span>{" "}
              <span className="text-gray-600">
                {formatDateTime(item.created_at)}
              </span>
            </p>
            <p className="text-[#1E328F]">
              <span className="font-bold">Patient Name:</span>{" "}
              <span className="text-gray-600">{item.name_of_patient}</span>
            </p>
            <audio controls className="custom-audio-player mt-3 w-full">
              <source
                src={`https://azzappointments.com/apis/public/dictations/${item.audio_file
                  .split("/")
                  .pop()}`}
                type="audio/mp3"
              />
              Your browser does not support the audio element.
            </audio>
            <div
              onClick={() => toggleTranscript(i)}
              className="flex items-center justify-center gap-2 cursor-pointer"
            >
              <IoIosArrowDown className="text-[#1E328F]" size={30} />
            </div>
            {isTranscriptVisible[i] && (
              <div className="py-4 px-2 bg-white rounded-md shadow-inner">
                <h3 className="text-lg font-bold text-[#1E328F] mb-2">
                  Transcript
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-700">
                    <span className="font-bold">Text: </span>
                    {item.text}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-bold">Comments: </span>
                    {item.comments}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dictation;
