const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
}) => (
  <div className="flex items-center space-x-4">
    <label className="w-32 font-semibold text-black">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      className="input input-bordered text-black bg-white w-full"
    />
  </div>
);

export default Input;
