import React, {useEffect, useState} from 'react';
import MyDatePicker2 from "../../../../myDatePicker2/MyDatePicker2";

interface propsType {
    defaultValue: any;
    dateTypeShow: any;
    setQuery: any;
    query: any;
    myData: any;
    uniqueId: any;
}

const FilterTypeDate = ({
                            myData,
                            defaultValue,
                            dateTypeShow,
                            setQuery,
                            query,
                            uniqueId,
                        }: propsType) => {



    return <div className={'flex font-normal relative w-9'}>
        <MyDatePicker2
            className={"fontSize8"}
            value={query.showValue === "" ? null : query.showValue}
            onChange={(selectedDate) => {
                const showValue = selectedDate.jsDate;
                let value: any = "";
                if (dateTypeShow === "hesabfa") {
                    value = selectedDate.hesabfaFormatDate
                } else if (dateTypeShow === "JsDate") {
                    value = selectedDate.jsDate
                }
                setQuery({value, showValue})
            }}
        />
        {/*<div*/}
        {/*    onClick={removeFilter}*/}
        {/*    className={'px-2 bg-red-50 cursor-pointer'}>&times;</div>*/}
    </div>
};

export default FilterTypeDate;
