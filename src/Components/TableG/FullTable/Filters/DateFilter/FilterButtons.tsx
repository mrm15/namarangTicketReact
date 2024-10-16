import React, {useContext, useMemo, useState} from 'react';
import HoverMenuFilter from "./HoverMenuFilter.tsx";
import FilterTextInTable from "../FilterTextInTable.tsx";
import {TableGContext} from "../../../TableGContext.tsx";
import removeItemFromFilterArray from "./removeItemFromFilterArray.tsx";


const FilterButtons = ({property, uniqueId}) => {

    const context = useContext(TableGContext);
    const {myData, setMyData} = context;
    const defaultSelected = {textForFilter: "=", text: "مساوی", sign: "==",}
    const [selectedOption, setSelectedOption] = useState<any>(defaultSelected)
    const clickHandler = (row: any) => {
        if (row.textForFilter === "removeFilter") {
            setSelectedOption(defaultSelected)
            removeItemFromFilterArray({property, myData, setMyData})
        } else {
            setSelectedOption(row);
        }
    }


    const filterSigns = useMemo(() => {
        return [
            {textForFilter: "=", onClick: clickHandler, text: "مساوی", sign: "==",}, // میشه فقط اپریتور رو تغییر میده
            {textForFilter: "!=", onClick: clickHandler, text: " نامساوی", sign: "!=",}, //  میشه فقط اپریتور رو تغییر میده
            {textForFilter: ">", onClick: clickHandler, text: "بزرگتر", sign: <>&gt;</>,},
            {textForFilter: ">=", onClick: clickHandler, text: "بزرگتر مساوی", sign: <>&#8805;</>,},
            {textForFilter: "<", onClick: clickHandler, text: "کوچیکتر", sign: <>&lt;</>,},
            {textForFilter: "<=", onClick: clickHandler, text: "کوچیکتر مساوی", sign: <>&#8804;</>,},
            {textForFilter: "between", onClick: clickHandler, text: "بین", sign: <>&#119081;</>,}, // فیلتر رو حذف میکنه و دوتا مقدار میده بیشتر و کمتر که باید پر بشه
            {textForFilter: "removeFilter", onClick: clickHandler, text: "حذف فیلتر", sign: <>&#215;</>,}, // فیلتر رو حذف میکنه
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
                      operator={">="}
                    />
                    <FilterTextInTable
                      uniqueId={uniqueId + 2}

                      property={property}
                      filterType={"date"}
                      operator={"<="}
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
