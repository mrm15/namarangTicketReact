import React, {useMemo, useState} from 'react';


const FilterButtons = () => {
    const filterSigns = useMemo(() => {
        return [
            {text: "مساوی", sign: "=",}, // میشه فقط اپریتور رو تغییر میده
            {text: " نامساوی", sign: "!=",}, //  میشه فقط اپریتور رو تغییر میده
            {text: "بزرگتر", sign: <>&gt;</>,},
            {text: "بزرگتر مساوی", sign: <>&#8805;</>,},
            {text: "کوچیکتر", sign: <>&lt;</>,},
            {text: "کوچیکتر مساوی", sign: <>&#8804;</>,},
            {text: "بین", sign: <>&#119081;</>,}, // فیلتر رو حذف میکنه و دوتا مقدار میده بیشتر و کمتر که باید پر بشه
            {text: "حذف فیلتر", sign: <>&#215;</>,}, // فیلتر رو حذف میکنه
        ]
    }, [])

    const [showOptions, setShowOptions] = useState(false)
    const [selectedOption, setSelectedOption] = useState(filterSigns[0])
    return (
        <div
            onMouseLeave={() => setShowOptions(false)}
        >
            <input
                placeholder={"تاریخ"}
                className={" rounded p-2 outline-0 w-full"}
                type="text"/>
            <div className={"float-right py-1 px-2 rounded bg-white"}

                 onMouseOver={() => setShowOptions(true)}>
                <div

                >=
                </div>
            </div>

            {showOptions &&
              <div
                className={"absolute rounded shadow-2xl  overflow-hidden bg-white block w-fit border-white border-2 text-right"}>
                  {filterSigns.map((row, index) => <ul key={index}
                                                       className={"flex justify-between px-3 py-1 hover:bg-gray-200"}>
                      <li>{row.text}</li>
                      <li>{row.sign}</li>
                  </ul>)
                  }
              </div>
            }


        </div>
    )
        ;
};

export default FilterButtons;
