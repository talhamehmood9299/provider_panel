const TextArea = ({ label, placeholder, value, onChange, name }) => (
  <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 ">
    <label className="w-full sm:w-32 font-semibold text-black text-center sm:text-left ">{label}</label>
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      className="textarea bg-white textarea-bordered text-black textarea-lg w-full"
    />
  </div>
);

export default TextArea;
