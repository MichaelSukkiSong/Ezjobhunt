"use client";

import { useState } from "react";
import { Select } from "@chakra-ui/react";

const RoleBtn = ({ setFilteringOptions }) => {
  const [selectedRole, setSelectedRole] = useState("");

  const handleChange = (event) => {
    setSelectedRole(event.target.value);
    setFilteringOptions((prevState) => {
      return { ...prevState, role: event.target.value };
    });
  };

  return (
    <Select placeholder="Any Role" value={selectedRole} onChange={handleChange}>
      <option value="Software Engineering">Software Engineering</option>
      <option value="Engineering">Engineering</option>
      <option value="Sales">Sales</option>
      <option value="Marketing">Marketing</option>
      <option value="Design">Design</option>
      <option value="Product">Product</option>
      <option value="Project Management">Project Management</option>
      <option value="Finance">Finance</option>
      <option value="Data Science">Data Science</option>
      <option value="Recruiting & HR">Recruiting & HR</option>
      <option value="Legal">Legal</option>
      <option value="Customer Support">Customer Support</option>
      <option value="Business Operations">Business Operations</option>
    </Select>
  );
};

export default RoleBtn;
