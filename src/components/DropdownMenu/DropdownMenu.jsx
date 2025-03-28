import { useState } from "react";
import "./DropdownMenu.scss";

export const DropdownMenu = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);  // Callback pour mettre à jour la sélection dans le parent
  };

  return (
    <div className="dropdown">
      <div className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
        {selectedOption ? selectedOption : "Select an option"}
      </div>
      {isOpen && (
        <ul className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
          {options.map((option, optionIndex) => (
            <li
              key={`${option}${optionIndex}`}
              className="dropdown-item"
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
