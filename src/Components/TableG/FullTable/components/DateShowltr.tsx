import React from 'react';
import {date} from "yup";
import {p2e} from "../../../../utils/NumericFunction.tsx";

const DateShowLtr = ({ info }) => {
    let value = info.getValue();
    if (typeof value === "string" && !isNaN(Date.parse(value))) {
        try {
            value = new Date(value).toLocaleString("fa-IR");
            value = p2e(value);
        } catch (error) {
            // مدیریت خطا در صورت بروز مشکل
        }
    }
    return (
        <div className={"ltr"}>
            {value}
        </div>
    );
};
export default DateShowLtr;
