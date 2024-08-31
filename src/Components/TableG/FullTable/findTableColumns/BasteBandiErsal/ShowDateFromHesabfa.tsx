import React from 'react';
import {dateFromHesabfaToTimeStamp, HesabfaTimeStampWithTToPersianTime} from "../../../../../utils/utilsFunction.tsx";

const ShowDateFromHesabfa = ({info}) => {

    let cellValue = info.getValue();
    if (cellValue)
        cellValue = HesabfaTimeStampWithTToPersianTime(cellValue)
    return (
        <div
            className={"text-center"}
        >
            {cellValue}
        </div>
    );
};

export default ShowDateFromHesabfa;
