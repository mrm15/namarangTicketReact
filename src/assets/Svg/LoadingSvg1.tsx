import React from 'react';

const LoadingSvg1 = (props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
            width={20}
            height={20}
            style={{
                background: "0 0"
            }}
            display="block"
            {...props}
        >
            <circle
                strokeLinecap="round"
                fill="none"
                strokeDasharray="50.26548245743669 50.26548245743669"
                stroke="#fe718d"
                strokeWidth={6}
                r={32}
                cy={50}
                cx={50}
            >
                <animateTransform
                    values="0 50 50;360 50 50"
                    keyTimes="0;1"
                    dur="1.1764705882352942s"
                    repeatCount="indefinite"
                    type="rotate"
                    attributeName="transform"
                />
            </circle>
        </svg>
    )
};

export default LoadingSvg1;
