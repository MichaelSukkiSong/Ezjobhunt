"use client";

import { useState } from "react";
import { Switch } from "@chakra-ui/react";

const TransparentSalariesBtn = ({ setFilteringOptions }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const handleChange = () => {
    setIsEnabled(!isEnabled);
    setFilteringOptions((prevState) => {
      return { ...prevState, transparentSalaries: !isEnabled };
    });
  };

  return (
    <div className="flex flex-col border px-4 py-2 rounded-xl flex-none grow false">
      <div className="flex items-center justify-between space-x-4">
        <span>Transparent Salaries Only</span>
        <Switch onChange={handleChange} isChecked={isEnabled} />
      </div>
    </div>
  );
};

export default TransparentSalariesBtn;
