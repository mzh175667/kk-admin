import React from "react";
const SearchBar = ({ handleNameInput, name, handleDaysChange, date }) => {
  const DaysOptions = [
    { key: "1", value: "1", showingValue: "1 day" },
    { key: "7", value: "7", showingValue: "1 week" },
    { key: "31", value: "31", showingValue: "1 month" },
    { key: "153", value: "153", showingValue: "6 months" },
    { key: "365", value: "375", showingValue: "1 year" },
  ];
  return (
    <div className="row mt-4">
      <div className="col-md-2 mt-3">Search by</div>
      <div className="col-sm-3 col-md-3 mb-3">
        <select
          className="form-select mt-2"
          value={date}
          onChange={handleDaysChange}
        >
          <option value="">Days...</option>
          {DaysOptions.map((item) => (
            <option value={item.value} key={item.key}>
              {item.showingValue}
            </option>
          ))}
        </select>
      </div>
      <div className="col-md-3 form-group">
        <input
          type="text"
          className="form-control mt-2"
          placeholder="Name"
          value={name}
          onChange={handleNameInput}
        />
      </div>
    </div>
  );
};
export default SearchBar;
