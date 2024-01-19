"use client";

import { Suspense, useState } from "react";
import Searchbar from "./panel/main/Searchbar";
import Optionsbar from "./panel/main/Optionsbar";
import Bannersbar from "./panel/main/Bannersbar";
import JDgrid from "./panel/main/JDgrid";

const MainPanel = () => {
  const [filteringOptions, setFilteringOptions] = useState({
    searchTerm: "",
    locations: [],
    remoteOnly: false,
    role: "",
    type: "",
    experience: [],
    transparentSalaries: false,
  });

  return (
    <div
      className="md:h-screen overflow-x-hidden w-full"
      id="infiniteJobsScrollDiv"
    >
      <div className="md:px-2">
        {/* TESTING */}
        {/* <div>{filteringOptions.remoteOnly === true ? "true" : "false"}</div>
        <div>{filteringOptions.role}</div>
        <div>{filteringOptions.type}</div>
        <div>
          {filteringOptions.transparentSalaries === true ? "true" : "false"}
        </div>
        <div>{filteringOptions.searchTerm}</div>
        <div>{filteringOptions.locations.length}</div>
        <div>{filteringOptions.experience.length}</div> */}
        <div className="flex flex-col">
          <Searchbar setFilteringOptions={setFilteringOptions} />
          <Optionsbar setFilteringOptions={setFilteringOptions} />
          <Bannersbar />
          <Suspense fallback={<p>Loading</p>}>
            <JDgrid filteringOptions={filteringOptions} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default MainPanel;
