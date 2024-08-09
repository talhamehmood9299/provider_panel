import { useEffect, useState } from "react";
import SearchBox from "./Search";
import { FaChevronCircleDown } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useSelector } from "react-redux";
import { getProviderDictations } from "../api/apiEndpoints";
import { formatDateTime, formatText } from "../helpers";
import { DateRangePicker } from "./DateRangePicker";

const Dictation = () => {
  const provider = useSelector((state) => state.provider.providers);
  const [isTranscriptVisible, setIsTranscriptVisible] = useState([]);
  const [dictation, setDictation] = useState(null);
  const [filteredDictation, setFilteredDictation] = useState(null);
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const toggleTranscript = (index) => {
    setIsTranscriptVisible((prev) => {
      const newVisibility = [...prev];
      newVisibility[index] = !newVisibility[index];
      return newVisibility;
    });
  };

  const getDictations = async () => {
    const { data } = await getProviderDictations(provider.azz_id);
    const latestData = data.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    setDictation(latestData);
    setFilteredDictation(latestData);
  };

  const handleSearch = (query) => {
    if (!dictation) return;
    const filteredData = dictation.filter((item) =>
      item.name_of_patient.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredDictation(filteredData);
  };

  const handleValueChange = (newValue) => {
    setValue(newValue);

    if (newValue.startDate && newValue.endDate) {
      const filteredData = dictation.filter((item) => {
        const dictationDate = new Date(item.created_at);
        return (
          dictationDate >= new Date(newValue.startDate) &&
          dictationDate <= new Date(newValue.endDate)
        );
      });
      setFilteredDictation(filteredData);
    } else {
      setFilteredDictation(dictation);
    }
  };

  useEffect(() => {
    getDictations();
  }, []);

  return (
    <div className="bg-white shadow-lg p-2 rounded-lg border border-gray-200 w-full max-w-md">
      <div className="flex items-center text-xl font-bold mb-6 text-[#1E328F]">
        <div className="mask mask-circle w-20 mr-4">
          <img src={provider.profile} alt="Profile" />
        </div>
        <SearchBox onSearch={handleSearch} />
      </div>
      <DateRangePicker value={value} onChange={handleValueChange} />
      <div className="overflow-y-auto h-[510px] scrollbar-thin scrollbar-thumb-scrollbar scrollbar-track-scrollbar-track scrollbar-thumb-hover">
        {filteredDictation?.map((item, i) => (
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
              {isTranscriptVisible[i] ? (
                <IoIosArrowUp className="text-[#1E328F]" size={30} />
              ) : (
                <IoIosArrowDown className="text-[#1E328F]" size={30} />
              )}
            </div>
            {isTranscriptVisible[i] && (
              <div className="py-4 px-2 bg-white rounded-md shadow-inner">
                <h3 className="text-lg font-bold text-[#1E328F] mb-2">
                  Transcript
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-700">
                    <span className="font-bold text-blue-900">SOAP: </span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: formatText(item.text),
                      }}
                    />
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-bold text-blue-900">COMMENTS: </span>
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
