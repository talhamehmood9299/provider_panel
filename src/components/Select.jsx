import clsx from "clsx";

const Select = ({ value, onChange, options, placeholder, styles }) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className={clsx(
          "shadow-lg appearance-none border rounded-lg py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline",
          styles.control
        )}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className={clsx(
              "py-4 px-4",
              {
                "bg-blue-500 text-white": value === option.value,
                "bg-white text-gray-800": value !== option.value,
              },
              styles.option // Add additional styles from props
            )}
          >
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="h-4 w-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM16.293 7.293a1 1 0 0 0-1.414-1.414L10 10.586 5.121 5.707a1 1 0 1 0-1.414 1.414l5.95 5.95a1 1 0 0 0 1.414 0l5.95-5.95a1 1 0 0 0 0-1.414Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default Select;
