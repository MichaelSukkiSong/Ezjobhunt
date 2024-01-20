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
    <div className="md:p-6 min-h-full">
      <div className="flex flex-col">
        <Searchbar setFilteringOptions={setFilteringOptions} />
        <Optionsbar setFilteringOptions={setFilteringOptions} />
        <Bannersbar />
        <Suspense fallback={<p>Loading</p>}>
          <JDgrid filteringOptions={filteringOptions} />
        </Suspense>
      </div>
    </div>
  );
};

export default MainPanel;
