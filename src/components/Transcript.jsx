import { useDispatch, useSelector } from "react-redux";
import { clearTranscription } from "../redux/reducers/recordingReducer";

const Transcript = () => {
  const { text } = useSelector((state) => state.recording.transcription);
  const dispatch = useDispatch();

  const handleNewTranscript = () => {
    dispatch(clearTranscription());
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <h2 className="text-xl font-bold text-[#1E328F]">Transcript</h2>

      <div className="h-[40%] text-gray-500 bg-white rounded-xl border p-4">
        {text || "No transcription available."}
      </div>
      <button
        onClick={handleNewTranscript}
        className="mt-4 bg-blue-900 text-white py-2 px-4 rounded"
      >
        Start New Transcript
      </button>
    </div>
  );
};

export default Transcript;
