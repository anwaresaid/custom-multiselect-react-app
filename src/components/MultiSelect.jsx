import React, { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_DATA_QUERY } from "./Request";
import TextHighlighter from "./TextHighlighter";

function MultiSelect({ placeholder }) {
  const [inputValue, setInputValue] = React.useState("");
  const [selectedOptions, setSelectedOptions] = React.useState([]);
  const [isVisible, setIsvisible] = React.useState(false);

  const inputRef = React.useRef(null);
  const dropdownRef = React.useRef(null);

  const [executeSearch, { loading, data, error }] =
    useLazyQuery(GET_DATA_QUERY);

  //close dropdown list if clicked outside of it
  useEffect(() => {
    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup function
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible]);

  //fetching data
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue) {
        executeSearch({ variables: { name: inputValue } });
      }
    }, 1000); // 1 second delay

    return () => clearTimeout(timer);
  }, [inputValue, executeSearch]);

  //detecting textfield input and sending request accordingly
  const handleInputChange = (event) => {
    const newInputValue = event.target.value;
    setInputValue(newInputValue);
    setIsvisible(true);
  };

  //adding or removing clicked item from the dropdown list
  const handleOptionClick = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions?.filter((o) => o !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };
  //open dropdown menu
  const handleOpenMenu = () => {
    if (data) setIsvisible(true);
  };

  //rendering list item
  const renderOption = (option) => (
    <div
      key={option.name}
      className={`multi-select-option ${
        selectedOptions.includes(option) ? "selected" : ""
      }`}
      onClick={() => handleOptionClick(option)}
    >
      <div className="option-container">
        <img
          className="multi-select-img"
          src={option.image}
          alt={option.name}
        />
        <div className="option-text-container">
          <TextHighlighter text={option.name} word={inputValue} />
          <span style={{ color: "rgb(22, 22, 53,0.5)" }}>
            {option.episode.length} Episodes
          </span>
        </div>
      </div>
    </div>
  );

  //render selected options from dropdown as tags
  const renderSelectedOptions = () => (
    <>
      {selectedOptions.map((option, index) => (
        <div key={option.value} className="tag-item">
          {option.name}
          <span className="close" onClick={() => removeTag(index)}>
            &times;
          </span>
        </div>
      ))}
    </>
  );

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsvisible(false);
    }
  };

  //remove a selected item
  const removeTag = (index) => {
    setSelectedOptions(selectedOptions.filter((_, i) => i !== index));
  };

  //focus on the textbox
  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div
      className="multi-select-autocomplete"
      ref={dropdownRef}
      onClick={focusInput}
    >
      {selectedOptions?.length > 0 && renderSelectedOptions()}
      <input
        type="text"
        ref={inputRef}
        placeholder={placeholder}
        onChange={handleInputChange}
        onFocus={handleOpenMenu}
      />

      <div
        className="dropdown-menu"
        style={{ display: isVisible ? "block" : "none" }}
      >
        {data?.characters.results?.map(renderOption)}
      </div>
    </div>
  );
}

export default MultiSelect;
