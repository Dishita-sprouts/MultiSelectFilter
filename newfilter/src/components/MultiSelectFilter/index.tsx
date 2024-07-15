import React, { useState, useEffect, useRef } from "react";
import "../../sass/Index.scss";
import industryIcon from "../../assets/industryIcon.png";
import dropdown from "../../assets/dropdown.png";
import cross from "../../assets/cross.png";
import upper from "../../assets/upper.png";
import removeElement from "../../assets/removeElement.png";
import search from '../../assets/search.png';
import DropDown from "./DropDown";
import useFilters, { FilterType } from "../hooks/useFilters";

function Index() {
  const [selectedItems, setSelectedItems] = useState<FilterType[]>([]);
  const [filters, loading, fetchFilters] = useFilters();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const word = event.target.value;
    setSearchTerm(word);

    if (word) {
      fetchFilters(word);
      setDropdownVisible(true);
    } else {
      setDropdownVisible(false);
    }
  };

  const handleClearInput = () => {
    setSearchTerm("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleItemSelect = (item: FilterType) => {
    const index = selectedItems.findIndex(
      (selectedItem) => selectedItem.id === item.id
    );

    if (index === -1) {
      setSelectedItems((prevItems) => [...prevItems, item]);
    } else {
      setSelectedItems((prevItems) =>
        prevItems.filter((prevItem) => prevItem.id !== item.id)
      );
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.length === filters.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems([...filters]);
    }
  };

  const handleRemoveItem = (item: FilterType) => {
    setSelectedItems((prevItems) =>
      prevItems.filter((prevItem) => prevItem.id !== item.id)
    );
  };

  const clearAllElement = () => {
    setSelectedItems([]);
  };

  const toggleDropdown = () => {
    setDropdownVisible((prevState) => !prevState);
  };

  useEffect(() => {
    fetchFilters("");
  }, []);

 
  const containerHeight =
    selectedItems.length > 0 ? `${40 + selectedItems.length * 40}px` : "172px";

  return (
    <div className="container" style={{ height: containerHeight }}>
      <div className="titleDiv">
        <div id="Icon">
          <img src={industryIcon} alt="Industry Icon" />
          <span>Industry</span>
        </div>
        {selectedItems.length > 0 && (
          <div id="SelectedItemsCount">
            <p id="count">
              {selectedItems.length}{" "}
              <button onClick={() => setSelectedItems([])}>x</button>
            </p>
            <img src={upper} alt="upperArrow" />
          </div>
        )}
      </div>

      <div className="inputDiv">
        <div className="innerInputDiv">
          
          <div className="inputAndButton">
            <input
              type="text"
              onChange={handleSearch}
              ref={inputRef}
              value={searchTerm}
            />
            <div className="crossAndDropdown">
              <img src={cross} alt="cross-button" onClick={handleClearInput} />
              <img
                src={dropdown}
                alt=""
                className="dropdown-icon"
                onClick={toggleDropdown}
              />
            </div>
          </div>
          {dropdownVisible && (
            <DropDown
              filters={filters}
              onItemSelect={handleItemSelect}
              selectedItems={selectedItems}
              onSelectAll={handleSelectAll}
            />
          )}
        </div>
        {!dropdownVisible && (
          <div className="selectedItems">
            {selectedItems.length > 0 && (
              <button onClick={clearAllElement} id="clearAllBtn">
                Clear all
              </button>
            )}
            <ul>
              {selectedItems.map((item) => (
                <li key={item.id}>
                  {item.login}{" "}
                  <img
                    src={removeElement}
                    alt="remove-element"
                    onClick={() => handleRemoveItem(item)}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Index;
