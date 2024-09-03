import React, {useState} from 'react';

interface ToggleProps {
    initialChecked?: boolean;
    onChange?: (checked: boolean) => void;
    checkedText: string;
    unCheckedText: string;
}

const ToggleSwitch: React.FC<ToggleProps> = ({
                                                 initialChecked = false,
                                                 onChange,
                                                 checkedText = "off",
                                                 unCheckedText = "on"
                                             }) => {
    const [isChecked, setIsChecked] = useState(initialChecked);

    const handleToggle = () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
        if (onChange) onChange(newCheckedState);
    };

    return (
        <div
            className={`relative inline-flex items-center cursor-pointer ${isChecked ? 'bg-blue-500' : 'bg-gray-300'} rounded-full w-12 h-6 transition-colors duration-300`}
            onClick={handleToggle}
        >
            <span
                className={`absolute top-0.5 left-0.5 block w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isChecked ? 'translate-x-6' : 'translate-x-0'}`}
            />
            <span
                className={`absolute inset-0 flex items-center justify-center text-xs font-medium  transition-opacity duration-300 text-black ${isChecked ? 'opacity-100' : 'opacity-0'}`}
            >
                {checkedText}
            </span>
            <span
                className={`absolute inset-0 flex items-center justify-center text-xs font-medium text-gray-600 transition-opacity duration-300 ${isChecked ? 'opacity-0' : 'opacity-100'}`}
            >
                                     {unCheckedText}
            </span>
        </div>
    );
};

export default ToggleSwitch;
