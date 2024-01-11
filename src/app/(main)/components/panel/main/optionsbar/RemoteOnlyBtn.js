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
    <div className="flex flex-row flex-none items-center space-x-2 border rounded-xl outline-none p-2">
      <span>Remote Only</span>
      <Switch onChange={handleChange} isChecked={isEnabled} />
    </div>
  );
};

export default RemoteOnlyBtn;
