import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import {useDebounce} from "../../../../hooks/useDebounce.tsx";
import useFilterEffect from "./seFilterEffect.tsx";
import MyDatePicker from "../../../MyDatePicker";
import {TableGContext} from "../../TableGContext.tsx";
import {filterOfDataTypeObject} from "../../myTableGTypes.tsx";
import MyDatePicker2 from "../../../myDatePicker2/MyDatePicker2.tsx";
import {nanoid} from "@reduxjs/toolkit";
import FilterTypeDate from "./DateFilter/FilterTypeDate.tsx";

interface propType {
    uniqueId: string;
    property: string;
    operator?: "*" | "in" | "=" | "includes" | "nin" | "regex" | '!=' | '<' | '<=' | '>' | '>=' | any;
    filterType?: "date" | "select" | "number" | string,
    optionsForSelectOption?: { [key: string]: string }[];
    placeHolder?: string;
    dateTypeShow?: "hesabfa" | "JsDate"; // میخوام بگم اگه این جدول قراره با حسابفا ارتباط بگیره بهتره که این پراپز رو داشته باشیم تا تاریخ به فرمت حسابفا ذخیره بشه
}

const FilterTextInTable = ({
                               uniqueId,
                               property,
                               operator = "*",
                               filterType,
                               optionsForSelectOption = [{key: "تایید شده", value: "1",}],
                               placeHolder = "",
                               dateTypeShow = "JsDate"
                           }: propType) => {

    const context = useContext(TableGContext);
    const {myData, setMyData} = context;
    //console.log(myData.tableData)

    const defaultValue = myData.filters.find((row: filterOfDataTypeObject) => row.uniqueId === uniqueId) || {
        value: "",
        showValue: "",
    }
    const [query, setQuery] = useState<{ value: any, showValue: any }>(defaultValue);
    const debouncedQuery = useDebounce(query, 1000); // 500ms debounce delay
    const handleChangeFilter = (e: any) => {
        const value = e.target.value;
        setQuery({value, showValue: value})
    }

    const handleChangeFilterSetNumber = (e: any) => {

        let value = (e.target.value);
        if (value !== "") {
            value = +value
        }
        console.log(value)
        setQuery({value, showValue: value})
    }

    console.log("123 ", debouncedQuery)
    // Use the custom hook here
    useFilterEffect({
        debouncedQuery,
        operator,
        uniqueId,
        property,
        myData,
        setMyData,
    });

    const removeFilter = () => {
        setQuery({value: "", showValue: ""})
    }

    if (filterType === "date") {
        return <FilterTypeDate
            myData={myData}
            dateTypeShow={dateTypeShow}
            defaultValue={defaultValue}
            query={query}
            setQuery={setQuery}
            uniqueId={uniqueId}
        />

    }
    if (filterType === "select") {
        return <div className={" m-1"}>

            <select
                onChange={handleChangeFilter}
                value={query.showValue}
            >
                <option value="">انتخاب کنید</option>
                {optionsForSelectOption.map((row, index) => <option key={index} value={row.value}>{row.key}</option>)}
            </select>

        </div>
    }
    if (filterType === "number") {
        return (
            <div className={" m-1"}>
                <input
                    placeholder={placeHolder}
                    className={" rounded p-2 outline-0 w-full"}
                    type={"number"}
                    onChange={handleChangeFilterSetNumber}
                    value={query.showValue}

                />
            </div>
        );
    }

    return (
        <div className={" m-1"}>
            <input
                placeholder={placeHolder}
                className={" rounded p-2 outline-0 w-full"}
                type={"text"}
                onChange={handleChangeFilter}
                value={query.value}

            />
        </div>
    );
};

export default FilterTextInTable;
