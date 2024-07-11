import React, { useState, ChangeEvent } from 'react';
import '../sass/filterDiv.scss';
import FilterItemDiv from './FilterItemDiv';

interface IndustryType {
  label: string;
  id: string;
}

const FilterDiv: React.FC = () => {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const industryType: IndustryType[] = [
    { label: 'Management Consulting', id: '1' },
    { label: 'Online Media', id: '2' },
    { label: 'Government Administration', id: '3' },
    { label: 'Venture Capital', id: '4' },
    { label: 'HealthCare', id: '5' },
    { label: 'Education Industry', id: '6' },
    { label: 'Finance', id: '7' },
    { label: 'Retail', id: '8' },
    { label: 'Manufacturing', id: '9' },
    { label: 'Information Technology', id: '10' },
    { label: 'Hospitality and Tourism', id: '11' },
    { label: 'Transportation and Logistics', id: '12' },
    { label: 'Energy and Utilities', id: '13' },
    { label: 'Media and Entertainment', id: '14' },
    { label: 'Real Estate', id: '15' },
  ];

  const filteredIndustries = industryType.filter((industry) =>
    industry.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCheckboxChange = (id: string, checked: boolean) => {
    if (id === 'selectAll') {
      if (checked) {
        setSelectedIndustries(filteredIndustries.map((industry) => industry.id));
      } else {
        setSelectedIndustries([]);
      }
    } else {
      if (checked) {
        setSelectedIndustries([...selectedIndustries, id]);
      } else {
        setSelectedIndustries(selectedIndustries.filter((item) => item !== id));
      }
    }
  };

  const handleDelete = (id: string) => {
    setSelectedIndustries(selectedIndustries.filter((item) => item !== id));
  };

  const handleClearAll = () => {
    setSelectedIndustries([]);
  };

  const containerHeight =
    selectedIndustries.length > 0
      ? `${160 + selectedIndustries.length * 30}px`
      : '160px';

  return (
    <div className="container" style={{ height: containerHeight }}>
      <div className="headerDiv">
        <span className="MuiBadge-root filter-icon-badge css-1rzb3uu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            className="filter-icon-svg"
          >
            <g clipPath="url(#fi-rs-building_svg__a)">
              <path
                fill="#3E545C"
                d="M2.667 8.667h2V10h-2zM6 10h2V8.667H6zm-3.333 2.667h2v-1.334h-2zm3.333 0h2v-1.334H6zm-3.333-8h2V3.333h-2zm3.333 0h2V3.333H6zM2.667 7.333h2V6h-2zm3.333 0h2V6H6zm10-2V16H0V2a2 2 0 0 1 2-2h6.667a2 2 0 0 1 2 2v1.333H14a2 2 0 0 1 2 2M9.333 2a.667.667 0 0 0-.666-.667H2A.667.667 0 0 0 1.333 2v12.667h8zm5.334 3.333A.667.667 0 0 0 14 4.667h-3.333v10h4zM12 10h1.333V8.667H12zm0 2.667h1.333v-1.334H12zm0-5.334h1.333V6H12z"
              ></path>
            </g>
            <defs>
              <clipPath id="fi-rs-building_svg__a">
                <path fill="#fff" d="M0 0h16v16H0z"></path>
              </clipPath>
            </defs>
          </svg>
          <span className="MuiBadge-badge MuiBadge-dot MuiBadge-anchorOriginTopRight MuiBadge-anchorOriginTopRightRectangular MuiBadge-overlapRectangular MuiBadge-colorSuccess css-1veqbpl"></span>
          Industry
        </span>

        {selectedIndustries.length > 0 && (
          <span id="numberOfIndus" onClick={handleClearAll}>
            {selectedIndustries.length} x
          </span>
        )}
      </div>

      <br />
      <div className="input-container">
        <input
          type="text"
          className="input-with-dropdown"
          placeholder="Choose.."
          value={searchQuery}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          onFocus={() => setDropdown(true)}
        />
        <button
          className="dropdown-button"
          onClick={() => setDropdown(!dropdown)}
        >
          &#9660;
        </button>
      </div>
      {dropdown && (
        <FilterItemDiv
          data={filteredIndustries}
          onCheckboxChange={handleCheckboxChange}
          selectedIndustries={selectedIndustries}
        />
      )}
      {!dropdown && (
        <div className="selectedIndustry">
          <ul>
            {selectedIndustries.length > 0 && (
              <button onClick={handleClearAll} id="clearAllBtn">
                Clear all
              </button>
            )}
            <br />
            {industryType
              .filter((industry) => selectedIndustries.includes(industry.id))
              .map((industry) => (
                <span key={industry.id} className="industryName">
                  {industry.label}
                  <button
                    onClick={() => handleDelete(industry.id)}
                    id="deleteBtn"
                  >
                    X
                  </button>
                </span>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterDiv;
