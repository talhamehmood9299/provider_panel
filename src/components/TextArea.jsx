const TextArea = ({ label, placeholder, value, onChange, name }) => (
  <div className="flex items-center space-x-4">
    <label className="w-32 font-semibold text-black">{label}</label>
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
