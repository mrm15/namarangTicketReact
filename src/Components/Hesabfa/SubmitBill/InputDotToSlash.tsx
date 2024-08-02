import React, {useState} from 'react';

interface CustomInputDotToSlashProps {
    value: string;
    onChange: (value: string) => void;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLInputElement>;
    type?: string;
}

const InputDotToSlash: React.FC<CustomInputDotToSlashProps> = ({
                                                                   value,
                                                                   onChange,
                                                                   className,
                                                                   onClick,
                                                                   type = 'text'
                                                               }) => {
    // Display value with dots converted to slashes

    const displayValue = (value+ "")?.replace(/\./g, '/');

    const customOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value;
        // Allow only numbers and slashes
        if (!/^[0-9/]*$/.test(inputValue)) {
            return;
        }

        // // نزار کاربر دات رو بزنه
        if (inputValue.includes('.')) {
            return
        }


        //  اگه اولش اسلش زد باید تبدیل بشه به 0.
        if (inputValue.includes('/') && inputValue.indexOf('/') === 0) {
            inputValue = "0/"
        }
        // نزار دوتا اسلش پشت سر هم بزنه
        if (inputValue.includes('//')) {
            return;
        }

        // Convert slashes to dots
        const transformedValue = inputValue.replace(/\//g, '.');

        // Prevent user from inputting dots if a dot or slash is already present




        onChange(transformedValue);
    };

try{
    return (
        <input
            onChange={customOnChange}
            type={type}
            value={displayValue}
            onClick={onClick}
            className={className + " ltr"}
        />
    );
}catch (error){
    return <>{error.toString()}</>
}
};

export default InputDotToSlash;
