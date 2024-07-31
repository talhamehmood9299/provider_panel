const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
}) => (
  <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
    <label className="w-full sm:w-32 font-semibold text-black text-center sm:text-left">{label}</label>
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
