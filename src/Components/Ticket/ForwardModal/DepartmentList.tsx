import React, {useState} from 'react';
import Select from 'react-select'

const options = [
    { value: 'chocolate', label: 'محمد میرعرب' },
    { value: 'strawberry', label: 'علی بای ' },
    { value: 'vanilla', label: 'امیر حسین ' },
    { value: 'vanilla1', label: 'کاربر جدید ' },
];

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        // backgroundColor: state.isFocused ? '#f0f0f0' : '#e0e0e0', // Change background color when focused or unfocused
        borderColor: state.isFocused ? '#999' : '#ccc', // Change border color when focused or unfocused
        '&:hover': {
            borderColor: '#999', // Change border color on hover
        },
        boxShadow: 'none', // Remove box shadow
        minHeight: '40px', // Adjust the height of the control
        borderRadius: '8px', // Adjust border radius
    }),
    menu: (provided, state) => ({
        ...provided,
        backgroundColor: '#ffffff', // Change background color of the dropdown menu
        borderRadius: '8px', // Adjust border radius
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', // Add box shadow
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#dbdbdb' : '#ffffff', // Change background color of selected or hovered option
        // color: state.isSelected ? '#dbdbdb' : '#333', // Change text color of selected or hovered option
        '&:hover': {
            backgroundColor: '#dbdbdb', // Change background color on hover
            // color: '#ffffff', // Change text color on hover
        },
    }),
    singleValue: (provided, state) => ({
        ...provided,
        color: '#333', // Change text color of the single selected value
    }),
    placeholder: (provided, state) => ({
        ...provided,
        color: '#999', // Change text color of the placeholder
    }),
    indicatorSeparator: () => ({ display: 'none' }), // Hide the indicator separator
    indicatorsContainer: () => ({ display: 'none' }), // Hide the dropdown indicators
};

const DepartmentList = () => {
    const [selectedOption, setSelectedOption] = useState(null); // State to store the selected option

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption); // Update the selected option state
    };

    console.log(selectedOption)
    return (
        <div>
            <Select
                placeholder={'یک کاربر انتخاب کنید'}
                options={options}
                styles={customStyles}    // Apply custom styles
                onChange={handleChange} // Handle option selection
                value={selectedOption} // Set the selected option
            />
        </div>
    );
};

export default DepartmentList;
