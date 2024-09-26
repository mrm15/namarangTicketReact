import React from 'react';

const DateShowLtr = ({info}) => {
    const value = info.getValue()
    return (
        <div className={"ltr"}>
            {value}
        </div>
    );
};

export default DateShowLtr;
