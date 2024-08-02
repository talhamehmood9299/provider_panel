import { useDispatch, useSelector } from "react-redux";
import { sendDictation } from "../api/apiEndpoints";
import {
  resetFormState,
  setFormState,
} from "../redux/reducers/recordingReducer";
import { toast } from "react-hot-toast";

const Transcript = () => {
  const { text } = useSelector((state) => state.recording.transcription);
  const formState = useSelector((state) => state.recording.formState);
  const dispatch = useDispatch();

  const handleSoapNotes = async () => {
    try {
      dispatch(setFormState({ ...formState, text }));

      const formData = new FormData();
      formData.append("audio_file", formState.audio_file);
      formData.append("comments", formState.comments);
      formData.append("name_of_patient", formState.name_of_patient);
      formData.append("provider_id", formState.provider_id);
      formData.append("text", formState.text);

      const data = await sendDictation(formData);
      dispatch(resetFormState());
      toast.success("SOAP notes sent successfully.");
    } catch (error) {
      console.error("Error sending SOAP notes:", error);
      toast.error("Failed to send SOAP notes.");
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full overflow-y-auto">
      <h2 className="text-xl font-bold text-[#1E328F]">SOAP Notes</h2>
      <div className="h-full text-gray-500 bg-white rounded-xl border p-4">
        {text || "No transcription available."}
      </div>
      <button
        type="button"
        onClick={handleSoapNotes}
        className="mt-4 bg-blue-900 text-white py-2 px-4 rounded"
      >
        Send to Assistant
      </button>
    </div>
  );
};

export default Transcript;
