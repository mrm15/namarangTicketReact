import React from 'react';

const ContactNumber = ({info}) => {

    const cellValue = info?.row?.original?.Contact?.Mobile

    return (
        <div className={"ltr text-blue-700"}>
           <a href={`tel:${cellValue}`} > {cellValue}</a>
        </div>
    )
};

export default ContactNumber;
