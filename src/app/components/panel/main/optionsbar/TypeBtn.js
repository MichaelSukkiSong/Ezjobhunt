const TypeBtn = () => {
  return (
    <select className="border rounded-xl p-2">
      <option value="Any">Any Type</option>
      <option value="Full Time">Full Time</option>
      <option value="Part Time">Part Time</option>
      <option value="Contract">Contract</option>
      <option value="Internship">Internship</option>
      <option value="Other">Other</option>
    </select>
  );
};

export default TypeBtn;
