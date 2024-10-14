import React from 'react';
import {timestampToTimeFromHesabfa} from "../../../../utils/utilsFunction";

const DateShowTimeStampToDateLtr = ({info}) => {
    try {
        let value = info?.getValue();

        if (value) {
            value = timestampToTimeFromHesabfa(value)
        }


        return (
            <div className={"ltr"}>
                {value}
            </div>
        );
    } catch (error) {
        return <></>
    }
};

export default DateShowTimeStampToDateLtr;
