import React, {useContext, useEffect, useState} from 'react';
import {useDebounce} from "../../../../hooks/useDebounce.tsx";
import {
    convertPersianDateToTimestamp,
    HesabfaTimeStampWithTToPersianTime,
    persianDateToTimestamp,
    randomNumberGenerator,
    timestampToFormattedDateToSendHesabfa
} from "../../../../utils/utilsFunction.tsx";
import MyDatePicker from "../../../MyDatePicker";
import {TableGContext} from "../../TableGContext.tsx";

interface propType {
    uniqueId: string;
    property: string;
    operator?: "*" | "in" | "=" | "includes" | "nin" | "regex" | '!=' | '<' | '<=' | '>' | '>=' | any;
    filterType?: "date" | "select" | "number" | string,
    optionsForSelectOption?: { [key: string]: string }[];
    placeHolder?: string;
}

const FilterTextInTable = ({
                               uniqueId,
                               property,
                               operator = "*",
                               filterType,
                               optionsForSelectOption = [{key: "تایید شده", value: "1",}],
                               placeHolder = "",
                           }: propType) => {

    const context = useContext(TableGContext);
    const {myData, setMyData} = context;
    //console.log(myData.tableData)

    const defaultValue = myData.filters.find(row => row.uniqueId===uniqueId) || {value: "", showValue: "",}
    const [query, setQuery] = useState<{ value: string, showValue: string }>(defaultValue);
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
        // یعنی الان هیچی نداریم توی این آبجکت
        if (debouncedQuery.value.length === 0) {
            // Remove the filter if the query is empty
            newFilterArray = filters.filter(item => item.uniqueId !== uniqueId);
        } else {
            // Find the existing filter object by key
            const existingIndex = newFilterArray.findIndex((item: any) => item.uniqueId === uniqueId);

            if (existingIndex !== -1) {
                // Update the value of the existing filter object
                // newFilterArray[existingIndex].property = property;
                newFilterArray[existingIndex].value = debouncedQuery.value;
                newFilterArray[existingIndex].showValue = debouncedQuery.showValue;
                newFilterArray[existingIndex].operator = operator;
            } else {
                // Add a new filter object
                newFilterArray.push({
                    uniqueId,
                    property,
                    operator: operator,
                    value: debouncedQuery.value,
                    showValue: debouncedQuery.showValue,
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
        setQuery({value:"",showValue:""})
    }

    if (filterType === "date") {


        const rr = defaultValue.showValue
        if (rr !== "") {
            // rr = convertPersianDateToTimestamp(rr)
            // alert(JSON.stringify(rr.value))
            // rr = HesabfaTimeStampWithTToPersianTime(defaultValue + "")
        }

        return <div className={'flex font-normal overflow-visible relative w-9 overflow-hidden '}>
            <MyDatePicker
                className={"fontSize8"}
                value={rr}

                onChange={(selectedDate) => {
                    //alert(JSON.stringify(selectedDate))

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
