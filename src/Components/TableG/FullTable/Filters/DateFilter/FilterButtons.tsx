import React, {useContext, useMemo, useState} from 'react';
import HoverMenuFilter from "./HoverMenuFilter.tsx";
import FilterTextInTable from "../FilterTextInTable.tsx";
import {TableGContext} from "../../../TableGContext.tsx";
import removeItemFromFilterArray from "./removeItemFromFilterArray.tsx";

const op = {
    equal: "=",
    notEqual: "!=",
    greaterThan: ">",
    greaterThanOrEqual: ">=",
    lowerThan: "<",
    lowerThanOrEqual: "<=",
    between: "between",
    removeFilter: "removeFilter",
    remove: "remove",
}

const FilterButtons = (props) => {
    const {property, uniqueId, dateTypeShow} = props
    const context = useContext(TableGContext);
    const {myData, setMyData} = context;
    console.log(myData.filters)
    const defaultSelected = {textForFilter: "=", text: "مساوی", sign: "==",}
    const [selectedOption, setSelectedOption] = useState<any>(defaultSelected)
    const actionMap: any = {
        [op.equal]: (row: any) => setSelectedOption(row),
        [op.notEqual]: (row: any) => setSelectedOption(row),
        [op.greaterThan]: (row: any) => setSelectedOption(row),
        [op.greaterThanOrEqual]: (row: any) => setSelectedOption(row),
        [op.lowerThan]: (row: any) => setSelectedOption(row),
        [op.lowerThanOrEqual]: (row: any) => setSelectedOption(row),
        [op.between]: (row: any) => { setSelectedOption(row);removeItemFromFilterArray({property, myData, setMyData});},
        [op.removeFilter]: () => {  removeItemFromFilterArray({property, myData, setMyData});setSelectedOption(defaultSelected); },
        [op.remove]: () => {  removeItemFromFilterArray({property, myData, setMyData}) },
    };

    const clickHandler = (row: any) => {
        const action = actionMap[row.textForFilter];
        if (action) {
            action(row);
        }
    };


    const filterSigns = useMemo(() => {
        return [
            {textForFilter:op.equal, onClick: clickHandler, text: "مساوی", sign: "==",}, // میشه فقط اپریتور رو تغییر میده
            {textForFilter:op.notEqual, onClick: clickHandler, text: " نامساوی", sign: "!=",}, //  میشه فقط اپریتور رو تغییر میده
            {textForFilter:op.greaterThan, onClick: clickHandler, text: "بزرگتر", sign: <>&gt;</>,},
            {textForFilter:op.greaterThanOrEqual, onClick: clickHandler, text: "بزرگتر مساوی", sign: <>&#8805;</>,},
            {textForFilter:op.lowerThan, onClick: clickHandler, text: "کوچیکتر", sign: <>&lt;</>,},
            {textForFilter:op.lowerThanOrEqual, onClick: clickHandler, text: "کوچیکتر مساوی", sign: <>&#8804;</>,},
            {textForFilter:op.between, onClick: clickHandler, text: "بین", sign: <>&#119081;</>,}, // فیلتر رو حذف میکنه و دوتا مقدار میده بیشتر و کمتر که باید پر بشه
            {textForFilter:op.removeFilter, onClick: clickHandler, text: "حذف فیلتر", sign: <>&#215;</>,}, // فیلتر رو حذف میکنه
            {textForFilter:op.remove, onClick: clickHandler, text: "حذف ", sign: <>delete   </>,}, // فیلتر رو حذف میکنه
        ]
    }, [])

    try {
        return (
            <div>
                {
                    selectedOption.textForFilter !== "between"
                    &&
                  <FilterTextInTable
                    uniqueId={uniqueId}
                    property={property}
                    filterType={"date"}
                    operator={selectedOption.textForFilter}
                    dateTypeShow={dateTypeShow}
                  />
                }
                {
                    selectedOption.textForFilter === "between"
                    &&
                  <div>
                    <FilterTextInTable
                      uniqueId={uniqueId + 1}
                      property={property}
                      filterType={"date"}
                      operator={op.greaterThanOrEqual}
                      dateTypeShow={dateTypeShow}
                    />
                    <FilterTextInTable
                      uniqueId={uniqueId + 2}

                      property={property}
                      filterType={"date"}
                      operator={op.lowerThan}
                      dateTypeShow={dateTypeShow}
                    />
                  </div>
                }
                <HoverMenuFilter filterSigns={filterSigns}>
                    <div className={"flex gap-2"}>
                        <div>{selectedOption.textForFilter}</div>
                        <div>{selectedOption.text}</div>

                    </div>
                </HoverMenuFilter>

            </div>
        )
    } catch (error) {
        return <>{error.toString()}</>
    }

};

export default FilterButtons;
