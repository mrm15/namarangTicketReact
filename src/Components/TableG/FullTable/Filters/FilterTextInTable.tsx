import React, {useContext, useEffect, useState} from 'react';
import {useDebounce} from "../../../../hooks/useDebounce.tsx";
import {
    HesabfaTimeStampWithTToPersianTime,
    persianDateToTimestamp,
    randomNumberGenerator,
    timestampToFormattedDateToSendHesabfa
} from "../../../../utils/utilsFunction.tsx";
import MyDatePicker from "../../../MyDatePicker";
import {TableGContext} from "../../TableGContext.tsx";

interface propType {
    filterKey: string;
    operator?: "*" | "in" | "=" | "includes" | "nin" | "regex" | '!=' | '<' | '<=' | '>' | '>=' | any;
    filterType?: "date" | "select" | "number" | string,
    optionsForSelectOption?: { [key: string]: string }[];
    placeHolder?: string;
}

const FilterTextInTable = ({
                               filterKey, operator = "*", filterType,
                               optionsForSelectOption = [{key: "تایید شده", value: "1",}],
                               placeHolder = "",
                           }: propType) => {

    const context = useContext(TableGContext);
    const {myData, setMyData} = context;
    //console.log(myData.tableData)

    const defaultValue = myData.filters.find(row => row.property === filterKey && row.operator === operator) || ""
    const [query, setQuery] = useState('');
    const debouncedQuery = useDebounce(query, 1000); // 500ms debounce delay
    const handleChangeFilter = (e: any) => {

        const value = e.target.value;
        const filterArray = myData.filters;
        console.log(value)
        setQuery(value)
    }
    const handleChangeFilterDate = (value: any) => {
        const filterArray = myData.filters;
        console.log(filterArray)
        console.log(value)
        setQuery(value)
    }

    const handleChangeFilterSetNumber = (e: any) => {

        let value = (e.target.value);
        if (value !== "") {
            value = +value
        }
        console.log(value)
        setQuery(value)
    }

    useEffect(() => {
        const filters = myData.filters;
        let newFilterArray = [...filters]; // Create a copy of the existing filters array

        if (debouncedQuery.length === 0) {
            // Remove the filter if the query is empty
            newFilterArray = filters.filter(item => item.property !== filterKey);
        } else {
            // Find the existing filter object by key
            const existingIndex = newFilterArray.findIndex((item: any) => item.property === filterKey);

            if (existingIndex !== -1) {
                // Update the value of the existing filter object
                newFilterArray[existingIndex].value = debouncedQuery;
                newFilterArray[existingIndex].operator = operator;
            } else {
                // Add a new filter object
                newFilterArray.push({
                    property: filterKey,
                    operator: operator,
                    value: debouncedQuery
                })
            }
        }

        // Update the myData state with the new filters array

        console.table(newFilterArray)
        setMyData({
            filters: newFilterArray,
            // reload: randomNumberGenerator()
        })

    }, [debouncedQuery, operator]);

    const removeFilter = () => {
        setQuery("")
    }

    if (filterType === "date") {

        let rr = query
        if (rr !== "") {
            rr = HesabfaTimeStampWithTToPersianTime(query + "")
        }

        return <div className={'flex font-normal overflow-visible relative w-9 overflow-hidden'}>
            <MyDatePicker
                value={rr}

                onChange={(selectedDate) => {
                    if (selectedDate === '') {
                        console.log(selectedDate)
                        handleChangeFilterDate(selectedDate)
                        return
                    }

                    const temp = persianDateToTimestamp(selectedDate)
                    const temp2 = (timestampToFormattedDateToSendHesabfa(temp))
                    const temp3 = temp2.replace(" ", "T")
                    handleChangeFilterDate(temp3)


                }}
            />
            {/*<div*/}
            {/*    onClick={removeFilter}*/}
            {/*    className={'px-2 bg-red-50 cursor-pointer'}>&times;</div>*/}
        </div>

    }
    if (filterType === "select") {
        return <div className={" m-1"}>

            <select
                onChange={handleChangeFilter}
                value={query}
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
                    value={query}

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
                value={query}
                defaultValue={defaultValue}

            />
        </div>
    );
};

export default FilterTextInTable;
