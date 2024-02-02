"use client";

import { Suspense } from "react";
import LocationBtn from "./optionsbar/LocationBtn";
import RemoteOnlyBtn from "./optionsbar/RemoteOnlyBtn";
import RoleBtn from "./optionsbar/RoleBtn";
import TypeBtn from "./optionsbar/TypeBtn";
import ExperienceBtn from "./optionsbar/ExperienceBtn";
import TransparentSalariesBtn from "./optionsbar/TransparentSalariesBtn";

const Optionsbar = ({ setFilteringOptions }) => {
  return (
    <div className="mt-4 mb-2">
      <div className="flex justify-center">
        <div className="flex flex-col w-full flex-auto xl:flex-none xl:flex-row xl:items-center space-y-2 xl:space-y-0 xl:space-x-2 text-sm font-medium">
          <div className="flex flex-row items-center space-x-2 grow">
            <Suspense fallback={<p>Loading Location bar...</p>}>
              <LocationBtn setFilteringOptions={setFilteringOptions} />
            </Suspense>
            <RemoteOnlyBtn setFilteringOptions={setFilteringOptions} />
          </div>
          <div className="flex flex-row items-center space-x-2 grow shrink-0">
            <RoleBtn setFilteringOptions={setFilteringOptions} />
            <TypeBtn setFilteringOptions={setFilteringOptions} />
          </div>
          <div className="flex flex-row items-center space-x-2">
            <ExperienceBtn setFilteringOptions={setFilteringOptions} />
            <TransparentSalariesBtn setFilteringOptions={setFilteringOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Optionsbar;
