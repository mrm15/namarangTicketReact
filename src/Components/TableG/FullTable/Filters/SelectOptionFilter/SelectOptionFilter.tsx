import React, {useContext, useState} from 'react';
import {TableGContext} from "../../../TableGContext";
import {useDebounce} from "../../../../../hooks/useDebounce";
import useMyFilterHook from "../filterHook/useMyFilterHook";
import findValueInFilterObject from "../filterHook/findValueInFilterObject";

const SelectOptionFilter = ({
                                optionsForSelectOption,
                                uniqueId,
                                operator,
                                property,
                                placeHolder = "",
                            }) => {

    const context = useContext(TableGContext);
    const {myData, setMyData} = context;

    const defaultValue = {value: "", showValue: ""}
    const [query, setQuery] = useState<{ value: any, showValue: any }>(defaultValue);
    // اینجا نیازی به دیبانس کوئری نداریم و بلافاصله میخوایم مقدار رو بفرستیم
    // const debouncedQuery = useDebounce(query, 500); // 500ms debounce delay

    useMyFilterHook({myData, setMyData, uniqueId, operator, property,debouncedQuery:query})
    const temp = findValueInFilterObject({myData, uniqueId})
    const handleChange = e => {
        const value = e.target.value;
        setQuery({value, showValue: value})
    }
    return (
        <div className={" m-1"}>
            <select
                onChange={handleChange}
                value={query.showValue}
            >
                <option value="">{placeHolder}</option>
                {optionsForSelectOption.map((row, index) => <option key={index} value={row.value}>{row.key}</option>)}
            </select>

        </div>
    );
};

export default SelectOptionFilter;
