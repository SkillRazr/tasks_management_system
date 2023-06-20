'use client'
import React, { useState } from 'react';

const DropdownMenu = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission or other actions
    console.log('Selected option:', selectedOption);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Select an option:
        <select value={selectedOption} onChange={handleOptionChange}>
          <option value="">-- Please choose an option --</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
          <option value="option4">Option 4</option>
        </select>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default DropdownMenu;
