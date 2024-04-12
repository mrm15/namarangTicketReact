import React, {useEffect, useState} from 'react';
import Select from 'react-select'
import {string} from "yup";

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
    indicatorSeparator: () => ({display: 'none'}), // Hide the indicator separator
    indicatorsContainer: () => ({display: 'none'}), // Hide the dropdown indicators
};

const DepartmentList = ({myKey, setSelectedData, myOptions}) => {
    const [selectedOption, setSelectedOption] = useState({value: '', label: 'انتخاب کنید'}); // State to store the selected option

    console.log(myOptions)

    let options  = [{label: '', value: ''}]
    options = myOptions?.map((item: { name: any; id: any; }) => {
        return {label: item.name, value: item.id}
    })
    options?.unshift({value: '', label: 'انتخاب کنید'})

    useEffect(() => {
        setSelectedOption({value: '', label: 'انتخاب کنید'})
    }, [myOptions]);


    const handleChange = (mySelectedOption) => {
        setSelectedOption(mySelectedOption); // Update the selected option state
        setSelectedData({[myKey]: mySelectedOption.value})
    };


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
    )
    // try {
    //     return (
    //         <div>
    //             <Select
    //                 placeholder={'یک کاربر انتخاب کنید'}
    //                 options={options}
    //                 styles={customStyles}    // Apply custom styles
    //                 onChange={handleChange} // Handle option selection
    //                 value={selectedOption} // Set the selected option
    //             />
    //
    //             <div className={'h-6'}>مورد انتخابی: [{myKey}] {selectedOption.label}</div>
    //         </div>
    //     )
    // } catch (error) {
    //     console.log(error)
    //
    //     return <div>{error.toString()}</div>
    // }
};

export default DepartmentList;
