"use client";

import { useState } from "react";
import { Select } from "@chakra-ui/react";

const TypeBtn = ({ setFilteringOptions }) => {
  const [selectedType, setSelectedType] = useState("");

  const handleChange = (event) => {
    setSelectedType(event.target.value);
    setFilteringOptions((prevState) => {
      return { ...prevState, type: event.target.value };
    });
  };

  return (
    <Select placeholder="Any Type" value={selectedType} onChange={handleChange}>
      <option value="Full Time">Full Time</option>
      <option value="Part Time">Part Time</option>
      <option value="Contract">Contract</option>
      <option value="Internship">Internship</option>
      <option value="Other">Other</option>
    </Select>
  );
};

export default TypeBtn;
