import React from "react";
import "../sass/filterItemDiv.scss";

function FilterItemDiv(props) {
  const { data, onCheckboxChange, selectedIndustries } = props;

  const handleCheckboxChange = (id, checked) => {
    onCheckboxChange(id, checked);
  };

  return (
    <div className="filterItemContainer">
      <div className="filterItemInnerDiv">
        {data.length > 0 ? (
          <>
            <div className="industryName">
              <input
                type="checkbox"
                id="selectAll"
                checked={selectedIndustries.length === data.length}
                onChange={(e) =>
                  handleCheckboxChange("selectAll", e.target.checked)
                }
              />
              <label htmlFor="selectAll">Select All</label>
            </div>

            {data.map((element) => (
              <div key={element.id} className="industryName">
                <input
                  type="checkbox"
                  id={element.id}
                  checked={selectedIndustries.includes(element.id)}
                  onChange={(e) =>
                    handleCheckboxChange(element.id, e.target.checked)
                  }
                />
                <label htmlFor={element.id}>{element.label}</label>
              </div>
            ))}
          </>
        ) : (
          <div className="no-results">No results found</div>
        )}
      </div>
    </div>
  );
}

export default FilterItemDiv;
