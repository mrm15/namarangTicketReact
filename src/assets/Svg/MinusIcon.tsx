import React from 'react';

const MinusIcon = (props) => {
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
                opacity={0.5}
                d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12z"
                stroke="#1C274C"
                strokeWidth={1.5}
            />
            <path
                d="M15 12H9"
                stroke="#1C274C"
                strokeWidth={1.5}
                strokeLinecap="round"
            />
        </svg>
    );
};

export default MinusIcon;