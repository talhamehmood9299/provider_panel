import { useDispatch, useSelector } from "react-redux";
import { sendDictation } from "../api/apiEndpoints";
import {
  resetFormState,
  setFormState,
} from "../redux/reducers/recordingReducer";
import { toast } from "react-hot-toast";
import { formatText } from "../helpers";

const Transcript = () => {
  const transcription = useSelector((state) => state.recording.transcription);
  const formState = useSelector((state) => state.recording.formState);

  console.log("formState", formState);
  const dispatch = useDispatch();

  const text =
    typeof transcription === "string"
      ? transcription
      : JSON.stringify(transcription);

  const handleSoapNotes = async () => {
    try {
      const updatedFormState = { ...formState, text };
      dispatch(setFormState(updatedFormState));

      const formData = new FormData();
      formData.append("audio_file", updatedFormState.audio_file);
      formData.append("comments", updatedFormState.comments);
      formData.append("name_of_patient", updatedFormState.name_of_patient);
      formData.append("provider_id", updatedFormState.provider_id);
      formData.append("text", updatedFormState.text);

      const data = await sendDictation(formData);
      dispatch(resetFormState());
      toast.success("SOAP notes sent successfully.");
    } catch (error) {
      console.error("Error sending SOAP notes:", error);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full ">
      <h2 className="text-xl font-bold text-[#1E328F]">SOAP Notes</h2>
      <div className="text-gray-500 bg-white rounded-lg border p-4">
        <h2 className="text-sm font-bold border-b text-[#1E328F]">
          Patient Info
        </h2>
        <div className="text-sm justify-between overflow-y-auto pt-2">
          <p className="text-sm font-semibold">
            Name:{" "}
            <span className="font-normal">
              {formState.name_of_patient || "name"}
            </span>
          </p>
          <p className="text-sm font-semibold">
            Comments:{" "}
            <span className="font-normal">
              {formState.comments || "comments"}
            </span>
          </p>
        </div>
      </div>
      <div
        className="h-[46vh] overflow-y-auto text-gray-500 bg-white rounded-xl border p-4"
        dangerouslySetInnerHTML={{
          __html: text ? formatText(text) : "No transcription available.",
        }}
      />
      <button
        type="button"
        onClick={handleSoapNotes}
        className="bg-blue-900 text-white py-2 px-4 rounded"
      >
        Send to Assistant
      </button>
    </div>
  );
};

export default Transcript;
