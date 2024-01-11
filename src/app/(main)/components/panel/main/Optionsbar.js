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
        <div className="flex text-sm font-medium w-full space-x-2">
          <LocationBtn setFilteringOptions={setFilteringOptions} />
          <RemoteOnlyBtn setFilteringOptions={setFilteringOptions} />
          <RoleBtn setFilteringOptions={setFilteringOptions} />
          <TypeBtn setFilteringOptions={setFilteringOptions} />
          <ExperienceBtn setFilteringOptions={setFilteringOptions} />
          <TransparentSalariesBtn setFilteringOptions={setFilteringOptions} />
        </div>
      </div>
    </div>
  );
};

export default Optionsbar;
