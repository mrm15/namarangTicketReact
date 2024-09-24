import React, {useEffect, useState} from 'react';
import {useDebounce} from "../../../../hooks/useDebounce.tsx";
import {
    HesabfaTimeStampWithTToPersianTime,
    persianDateToTimestamp,
    randomNumberGenerator,
    timestampToFormattedDateToSendHesabfa
} from "../../../../utils/utilsFunction.tsx";
import MyDatePicker from "../../../MyDatePicker";

const FilterTextInTable = ({myData, setMyData, filterKey , operator="*" , filterType="",
                           optionsForSelectOption=[{key:"تایید شده",value:"1",}],
                               placeHolder="",
                           }) => {

    const [query, setQuery] = useState('');
    const debouncedQuery = useDebounce(query, 1000); // 500ms debounce delay
    const handleChangeFilter = (e: any) => {

        const value = e.target.value;
        const filterArray = myData.filters;
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

        console.log(newFilterArray)
        setMyData({
            filters: newFilterArray,
            reload: randomNumberGenerator()
        })

    }, [debouncedQuery]);

    const removeFilter = () => {
        setQuery("")
    }

    if(filterType ==="date") {

        let rr = query
        if (rr !== "") {
            rr = HesabfaTimeStampWithTToPersianTime(query + "")
        }

        return <div className={'flex font-normal overflow-visible'}>
            <MyDatePicker
                value={rr}
                onChange={(selectedDate) => {
                    if (selectedDate === '') {
                        return
                    }

                    const temp = persianDateToTimestamp(selectedDate)
                    const temp2 = (timestampToFormattedDateToSendHesabfa(temp))
                    const temp3 = temp2.replace(" ", "T");
                    const temp4 = {target: {value: temp3}}
                    handleChangeFilter(temp4)


                }}
            />
            <div
                onClick={removeFilter}
                className={'px-2 bg-red-50 cursor-pointer'}>&times;</div>
        </div>

    }
    if(filterType==="select") {
        return <div className={" m-1"}>

            <select
            onChange={handleChangeFilter}
            value={query}
            >
                <option value="">انتخاب کنید</option>
                {optionsForSelectOption.map((row,index)=><option key={index} value={row.value}>{row.key}</option>)}
            </select>

        </div>
    }

    return (
        <div className={" m-1"}>
            <input
                placeholder={placeHolder}
                className={" rounded p-2 outline-0 w-full"}
                type={"text"}
                onChange={handleChangeFilter}
                value={query}

            />
        </div>
    );
};

export default FilterTextInTable;
