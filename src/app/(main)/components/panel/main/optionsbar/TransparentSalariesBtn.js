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
    <div className="flex flex-row flex-none items-center space-x-2 border rounded-xl outline-none p-2">
      <span>Transparent Salaries Only</span>
      <Switch onChange={handleChange} isChecked={isEnabled} />
    </div>
  );
};

export default TransparentSalariesBtn;
