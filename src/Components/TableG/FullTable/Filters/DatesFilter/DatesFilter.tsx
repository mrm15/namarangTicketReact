import React, {useContext, useMemo, useState} from 'react';
import {TableGContext} from "../../../TableGContext";
import {useDebounce} from "../../../../../hooks/useDebounce";
import useMyFilterHook from "../filterHook/useMyFilterHook";
import findValueInFilterObject from "../filterHook/findValueInFilterObject";
import removeItemFromFilterArray from "../DateFilter/removeItemFromFilterArray";
import FilterTextInTable from "../FilterTextInTable";
import MyDatePicker2 from "../../../../myDatePicker2/MyDatePicker2";
import HoverMenuFilter from "../DateFilter/HoverMenuFilter";

const op = {
    equal: "=",
    notEqual: "!=",
    greaterThan: ">",
    greaterThanOrEqual: ">=",
    lowerThan: "<",
    lowerThanOrEqual: "<=",
    between: "between",
    remove: "remove",

}
// تاریخ uniqId نمیخواد
//  تاریخ operator نمیخواد
const DatesFilter = ({
                         property,
                         model = "advanced",
                         dateFormatValue = "jsDate"
                     }) => {

    const context = useContext(TableGContext);
    const {myData, setMyData} = context;

    const defaultSelected = {textForFilter: "=", text: "مساوی", sign: "==",}
    const [selectedOption, setSelectedOption] = useState<any>(defaultSelected)

    const [operator1, setOperator1] = useState("=")

    const defaultValue1 = {value: "", showValue: ""}
    const defaultValue2 = {value: "", showValue: ""}
    const [query, setQuery] = useState<{ value: any, showValue: any }>(defaultValue1);
    const [query2, setQuery2] = useState<{ value: any, showValue: any }>(defaultValue2);
    const debouncedQuery1 = useDebounce(query, 1000); // 500ms debounce delay
    const debouncedQuery2 = useDebounce(query2, 1000); // 500ms debounce delay

    useMyFilterHook({
        myData,
        setMyData,
        uniqueId: property + 1,
        operator: operator1,
        property,
        debouncedQuery: debouncedQuery1
    })
    useMyFilterHook({
        myData,
        setMyData,
        uniqueId: property + 2,
        operator: "<=",
        property,
        debouncedQuery: debouncedQuery2
    })

    const temp1 = findValueInFilterObject({myData, uniqueId: property + 1})
    const temp2 = findValueInFilterObject({myData, uniqueId: property + 2})
    console.log(selectedOption.textForFilter)

    const actionMap: any = {
        [op.equal]: (row: any) => {

            setOperator1(op.equal)
        },
        [op.notEqual]: (row: any) => setOperator1(op.notEqual),
        [op.greaterThan]: (row: any) => setOperator1(op.greaterThan),
        [op.greaterThanOrEqual]: (row: any) => setOperator1(op.greaterThanOrEqual),
        [op.lowerThan]: (row: any) => setOperator1(op.lowerThan),
        [op.lowerThanOrEqual]: (row: any) => setOperator1(op.lowerThanOrEqual),
        [op.between]: (row: any) => {
            setOperator1(op.greaterThanOrEqual)
            //removeItemFromFilterArray({property, myData, setMyData});
        },
        [op.remove]: (row: any) => {
            setQuery({value: "", showValue: ""})
            // if  selectedOption.textForFilter===op.between   it means  there are two fileds need to reset
            if (selectedOption.textForFilter === op.between) {
                setQuery2({value: "", showValue: ""})
            }
            setOperator1(op.equal)
        },
    }

    const clickHandler = (row) => {
        const action = actionMap[row.textForFilter];
        if (action) {
            action(row)
        }
        if (row.textForFilter !== op.remove) {
            setSelectedOption(row)
        }
        if (row.textForFilter === op.remove) {
            setSelectedOption(defaultSelected)

        }
    }

    const filterSigns = useMemo(() => {
        return [
            {textForFilter: op.equal, onClick: clickHandler, text: "مساوی", sign: "==",}, // میشه فقط اپریتور رو تغییر میده
            {textForFilter: op.notEqual, onClick: clickHandler, text: " نامساوی", sign: "!=",}, //  میشه فقط اپریتور رو تغییر میده
            {textForFilter: op.greaterThan, onClick: clickHandler, text: "بزرگتر", sign: <>&gt;</>,},
            {textForFilter: op.greaterThanOrEqual, onClick: clickHandler, text: "بزرگتر مساوی", sign: <>&#8805;</>,},
            {textForFilter: op.lowerThan, onClick: clickHandler, text: "کوچیکتر", sign: <>&lt;</>,},
            {textForFilter: op.lowerThanOrEqual, onClick: clickHandler, text: "کوچیکتر مساوی", sign: <>&#8804;</>,},
            {textForFilter: op.between, onClick: clickHandler, text: "بین", sign: <>&#119081;</>,}, //
            // {textForFilter: op.remove, onClick: clickHandler, text: "حذف", sign: <>&#119081;</>,}, ///
        ]
    }, [])


    console.log(query)
    if (model !== "advanced") {
        return <MyDatePicker2
            onChange={(singleDate) => {
                const showValue = singleDate.jsDate === null ? "" : singleDate.jsDate
                const value0 = dateFormatValue === "hesabfa" ? singleDate.hesabfaFormatDate : singleDate.jsDate;
                const value = (value0 === null) ? "" : value0
                setQuery({value, showValue})
            }}
            value={query.value==="" ? null : query.value}
        />
    } else {
        const content = <>
            <MyDatePicker2
                onChange={(singleDate) => {
                    const showValue = singleDate.jsDate === null ? "" : singleDate.jsDate
                    const value0 = dateFormatValue === "hesabfa" ? singleDate.hesabfaFormatDate : singleDate.jsDate;
                    const value = (value0 === null) ? "" : value0
                    setQuery({value, showValue})
                }}
                value={query.value==="" ? null : query.value}
            />
            {(selectedOption.textForFilter === "between") && <>
                <MyDatePicker2

                    onChange={(singleDate) => {
                        const showValue = singleDate.jsDate === null ? "" : singleDate.jsDate
                        const value0 = dateFormatValue === "hesabfa" ? singleDate.hesabfaFormatDate : singleDate.jsDate;
                        const value = (value0 === null) ? "" : value0
                        setQuery2({value, showValue})
                    }}
                    value={query2.value==="" ? null : query2.value}
                />
            </>}
        </>


        return (
            <div>
                {content}
                <HoverMenuFilter filterSigns={filterSigns}>
                    <div className={"flex gap-2"}>
                        <div>{selectedOption.textForFilter}</div>
                        <div>{selectedOption.text}</div>
                    </div>
                </HoverMenuFilter>
            </div>
        )
    }

};

export default DatesFilter;
