import React, {useMemo, useState} from 'react';

const HoverMenuFilter = ({children, filterSigns}) => {

    const filterOptions = useMemo(() => {
        return filterSigns || [
            {
                onClick: (row) => {
                    console.log(row)
                }, text: "مساوی", sign: "=",
            }, // میشه فقط اپریتور رو تغییر میده
            {
                onClick: (row) => {
                    console.log(row)
                }, text: " نامساوی", sign: "!=",
            }, //  میشه فقط اپریتور رو تغییر میده
            {
                onClick: (row) => {
                    console.log(row)
                }, text: "بزرگتر", sign: <>&gt;</>,
            },
            {
                onClick: (row) => {
                    console.log(row)
                }, text: "بزرگتر مساوی", sign: <>&#8805;</>,
            },
            {
                onClick: (row) => {
                    console.log(row)
                }, text: "کوچیکتر", sign: <>&lt;</>,
            },
            {
                onClick: (row) => {
                    console.log(row)
                }, text: "کوچیکتر مساوی", sign: <>&#8804;</>,
            },
            {
                onClick: (row) => {
                    console.log(row)
                }, text: "بین", sign: <>&#119081;</>,
            }, // فیلتر رو حذف میکنه و دوتا مقدار میده بیشتر و کمتر که باید پر بشه
            {
                onClick: (row) => {
                    console.log(row)
                }, text: "حذف فیلتر", sign: <>&#215;</>,
            }, // فیلتر رو حذف میکنه
        ]
    }, [])
    const [showOptions, setShowOptions] = useState(false)

    return (
        <div
            onMouseLeave={() => setShowOptions(false)}
            className={""}
        >

            <div className={"my-1 float-right py-1 px-2 rounded bg-white"}

                 // onMouseOver={() => setShowOptions(true)}
                 onClick={() => setShowOptions(true)}
            >
                <div
                >{children}
                </div>
            </div>
            {showOptions &&
                <div
                    className={"absolute top-1 rounded shadow-2xl  overflow-hidden bg-white block w-fit border-white border-2 text-right"}
                >
                    {filterOptions.map((row, index) => <ul
                        key={index}
                        className={"flex justify-between px-3 py-1 hover:bg-gray-200"}
                        onClick={() => {
                            row?.onClick(row);
                            setShowOptions(false)

                        }}
                    >
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

export default HoverMenuFilter;