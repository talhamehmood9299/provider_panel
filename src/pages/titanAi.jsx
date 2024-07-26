import Dictation from "../components/Dictation";
import DictationNote from "../components/DictationNote";
import Transcript from "../components/Transcript";

const TitanAi = () => {
  return (
    <div className="flex gap-20">
      <Dictation />
      <DictationNote />
      <Transcript />
    </div>
  );
};

export default TitanAi;
