import React from "react";
import "../../sass/DropDown.scss";
import { FilterType } from "../hooks/useFilters";

interface DropDownDivProps {
  filters: FilterType[];
  onItemSelect: (item: FilterType) => void;
  selectedItems: FilterType[];
  onSelectAll: () => void;
}

const DropDown: React.FC<DropDownDivProps> = ({
  filters,
  onItemSelect,
  selectedItems,
  onSelectAll,
}) => {
  if (!filters) {
    return null;
  }

  return (
    <div className="dropDownDiv">
      <ul className="list">
        <li className="listItem">
          <div className="checkboxAndElement">
            <input
              type="checkbox"
              onChange={onSelectAll}
              checked={selectedItems.length === filters.length}
            />
            <li key="selectAll">Select all</li>
          </div>
        </li>
        {filters.map((filterItem) => (
          <li key={filterItem.id} className="listItem">
            <div className="checkboxAndElement">
              <input
                type="checkbox"
                checked={selectedItems.some(
                  (selectedItem) => selectedItem.id === filterItem.id
                )}
                onChange={() => onItemSelect(filterItem)}
              />
              {filterItem.login}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDown;
