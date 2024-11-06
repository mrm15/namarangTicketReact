import React from 'react';

const LittleSpinner = ({scale = 1}) => {
    return (
        <div
            style={{
                transform: `scale(${scale})`
            }}
            className="flex items-center justify-center">
            <div className="animate-spin">&#9696;</div>
        </div>
    )
};

export default LittleSpinner;
