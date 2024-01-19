"use client";

import { useState } from "react";
import { Switch } from "@chakra-ui/react";

const RemoteOnlyBtn = ({ setFilteringOptions }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const handleChange = () => {
    setIsEnabled(!isEnabled);
    setFilteringOptions((prevState) => {
      return { ...prevState, remoteOnly: !isEnabled };
    });
  };

  return (
    <div className="flex items-center space-x-4 p-2 flex-none border rounded-xl false">
      <span>Remote Only</span>
      <Switch onChange={handleChange} isChecked={isEnabled} />
    </div>
  );
};

export default RemoteOnlyBtn;
