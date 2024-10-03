import React from 'react';

const PlusIcon = (props) => {
    return (
        <svg
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M9 12h6M12 9v6"
                stroke="#323232"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M3 12c0-7.412 1.588-9 9-9s9 1.588 9 9-1.588 9-9 9-9-1.588-9-9z"
                stroke="#323232"
                strokeWidth={2}
            />
        </svg>
    );
};

export default PlusIcon;