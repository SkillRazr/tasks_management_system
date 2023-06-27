'use client'
import React, { useState } from 'react';
import Dropdown from 'react-dropdown-select';


const DropdownButton = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (selectedOptions) => {
    if (selectedOptions.length > 0) {
      const selectedOption = selectedOptions[0].value;
      setSelectedOption(selectedOption);
    }
  };

  

  const options = [
    { value: 'Apr-Jun 23', label: 'Apr 23-Jun 23' },
    { value: 'Jul 23-Sep 23', label: 'Jul 23-Sep 23' },
    { value: 'Oct 23-Dec 23', label: 'Oct 23-Dec 23' },
  ];

  return (
    <div className="flex items-center">
    <div className="relative">
      <Dropdown
        options={options}
        onChange={handleOptionChange}
        placeholder="Select option"
        className='ml-4 mt-2'
        
      />
    </div>
    </div>
  );
};

export default DropdownButton;
