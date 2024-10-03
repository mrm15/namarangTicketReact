import React from 'react';

const SingleRowViewOfReport = ({title = " - ", value = " - ", style = {}}) => {
    return (
        <ul
            style={style}
        >
            <li>{title}</li>
            <li>{value}</li>
        </ul>
    );
};

export default SingleRowViewOfReport;