import React from 'react';
import {timestampToTimeFromHesabfa} from "../../../../utils/utilsFunction";

const DateShowTimeStampToDateLtr = ({info}) => {
    let value = info.getValue();

    value = timestampToTimeFromHesabfa(value)


    return (
        <div className={"ltr"}>
            {value}
        </div>
    );
};

export default DateShowTimeStampToDateLtr;
