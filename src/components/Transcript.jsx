import { useSelector } from "react-redux";

const Transcript = () => {
  const transcription = useSelector((state) => state.recording.transcription);

  return (
    <div className="flex flex-col gap-6 w-full">
      <h2 className="text-xl font-bold text-[#1E328F]">Transcript</h2>

      <div className="h-[40%] bg-white rounded-xl border p-4">
        {transcription || "No transcription available."}
      </div>
    </div>
  );
};

export default Transcript;
