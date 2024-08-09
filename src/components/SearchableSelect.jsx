import { useState, useRef, useEffect } from "react";
import clsx from "clsx";

const SearchableSelect = ({
  value,
  onChange,
  options,
  required,
  placeholder,
  styles,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOptionSelect = (option) => {
    setSearchTerm(option.label);
    onChange(option.value);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <input
        type="text"
        value={searchTerm}
        required={required}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setIsDropdownOpen(true);
        }}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        placeholder={placeholder}
        className={clsx(
          "shadow-lg appearance-none border rounded-lg py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline w-full",
          styles.control
        )}
      />
      {/* Dropdown Icon */}
      <div
        className="cursor-pointer absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <svg
          className="h-6 w-6 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.354a.75.75 0 111.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {isDropdownOpen && (
        <div className="absolute z-10 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                onClick={() => handleOptionSelect(option)}
                className={clsx(
                  "py-2 px-3 cursor-pointer hover:bg-blue-500 hover:text-white",
                  {
                    "bg-blue-500 text-white": value === option.value,
                    "bg-white text-gray-800": value !== option.value,
                  },
                  styles.option
                )}
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className="py-2 px-3 text-gray-500">No options found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;
