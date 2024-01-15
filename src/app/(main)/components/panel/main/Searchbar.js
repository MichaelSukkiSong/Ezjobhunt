"use client";

import { useState } from "react";
import { SearchIcon } from "../../../icons";

const Searchbar = ({ setFilteringOptions }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setFilteringOptions((prev) => {
      return { ...prev, searchTerm: event.target.value };
    });
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="flex items-center bg-white pr-2 rounded-md border border-gray-300 focus-within:border-black ">
        <button className="bg-gray-100 text-gray-800 p-2 rounded-l ">
          <SearchIcon />
        </button>
        <input
          className="pl-3 grow outline-none placeholder:text-sm placeholder:md:text-base"
          placeholder="Job Title / Requirements / Tech..."
          onChange={handleSearch}
          value={searchTerm}
        />
      </div>
    </div>
  );
};

export default Searchbar;
