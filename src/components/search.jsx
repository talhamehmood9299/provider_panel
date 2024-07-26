import React, { useState } from "react";

const SearchBox = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-sm mx-auto">
      <div className="flex items-center border-b-2 border-[#1E328F] py-2">
        <input
          className="appearance-none bg-transparent border-none w-full text-[#1E328F] mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="Search"
          aria-label="Search"
          value={query}
          onChange={handleInputChange}
        />
        <button
          className="flex-shrink-0 bg-[#1E328F] hover:bg-[#1E328F] border-[#1E328F] hover:border-[#1E328F] text-sm border-4 text-white py-1 px-2 rounded"
          type="submit"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBox;
