import React, {useContext, useState} from 'react';
import useMyFilterHook from "../filterHook/useMyFilterHook";
import {TableGContext} from "../../../TableGContext";
import findValueInFilterObject from "../filterHook/findValueInFilterObject";
import {useDebounce} from "../../../../../hooks/useDebounce.tsx";

interface propType {
    uniqueId: string,
    operator: string,
    property: string,
    placeHolder: string,
}

const StringFilter = ({
                          uniqueId,
                          operator,
                          property,
                          placeHolder = "",
                      }: propType) => {

    const context = useContext(TableGContext);
    const {myData, setMyData} = context;


    const defaultValue = {value: "", showValue: ""}
    const [query, setQuery] = useState<{ value: any, showValue: any }>(defaultValue);
    const debouncedQuery = useDebounce(query, 500); // 500ms debounce delay

    useMyFilterHook({myData, setMyData, uniqueId, operator, property, debouncedQuery})

    const temp = findValueInFilterObject({myData, uniqueId})

    const handleChange = e => {
        const v = e.target.value
        setQuery({value: v, showValue: v})
    }
    return (

        <div className={" m-1"}>
            <input
                placeholder={placeHolder}
                className={" rounded p-2 outline-0 w-full"}
                type={"text"}
                onChange={handleChange}
                value={query.showValue}

            />
        </div>
    );
};

export default StringFilter;
