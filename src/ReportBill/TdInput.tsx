import React, {useContext, useEffect, useState} from 'react';
import {ReportBillContext} from "./ReportBillContext";
import {useDebounce} from "../hooks/useDebounce";
import MyDatePicker from "../Components/MyDatePicker";
import {
    HesabfaTimeStampWithTToPersianTime,
    persianDateToTimestamp,
    timestampToFormattedDateToSendHesabfa
} from "../utils/utilsFunction.tsx";

const TdInput = ({
                     placeholder = "وارد کنید", myKey = "billNumber", operator = "*",
                 }) => {

    const t = useContext(ReportBillContext);
    const {awesomeData, setAwesomeData} = t

    const [query, setQuery] = useState('');
    const debouncedQuery = useDebounce(query, 1000); // 500ms debounce delay

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    // Use effect to trigger API call when debounced query changes
    interface FilterItem {
        property: string;
        operator: string;
        value: any;
    }

    useEffect(() => {
        let updatedFilterItems: FilterItem[] = awesomeData.filterItems;

        // Create a copy of the existing filterItems array
        if (debouncedQuery.length === 0) {
            updatedFilterItems = updatedFilterItems.filter(item => item.property !== myKey);
            if (updatedFilterItems.length !== 0) {
                setAwesomeData({
                    ...awesomeData,
                    filterItems: updatedFilterItems
                });
            }

        } else {
            updatedFilterItems = [...awesomeData.filterItems];

            // Find the index of the existing object with the same property key
            const existingIndex = updatedFilterItems.findIndex((item: any) => item.property === myKey);

            if (existingIndex !== -1) {
                // If the object exists, replace its value
                updatedFilterItems[existingIndex].value = debouncedQuery;
            } else {
                // If the object doesn't exist, add a new one
                updatedFilterItems.push({
                    property: myKey,
                    operator: operator,
                    value: debouncedQuery
                });
            }

            // Update the state with the modified filterItems array
            if (updatedFilterItems.length !== 0) {
                setAwesomeData({
                    ...awesomeData,
                    filterItems: updatedFilterItems
                })
            }
        }

    }, [debouncedQuery]);


    const removeFilter = () => {
        // const filteredArray = awesomeData.filterItems.filter(obj => !(myKey in obj));
        setQuery("")
        // setAwesomeData({filterItems: [...filteredArray]});
    }

    if (myKey === "Date") {

        let rr = query
        if (rr !== "") {
            rr = HesabfaTimeStampWithTToPersianTime(query + "")
        }

        return <div className={'flex'}>
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
                    handleChange(temp4)


                }}
            />
            <div
                onClick={removeFilter}
                className={'px-2 bg-red-50 cursor-pointer'}>&times;</div>
        </div>
    }

    return (
        <div
            className={'w-fit flex '}
        >
            <input
                className={'w-full'}
                placeholder={placeholder}
                onChange={handleChange}
                value={query}

            />
            <div
                onClick={removeFilter}
                className={'px-2 bg-red-50 cursor-pointer'}>&times;</div>
        </div>
    );
}

export default TdInput;
