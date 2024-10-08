import React, {useContext, useState} from 'react';
import MyDatePicker from "../MyDatePicker";
import {
    convertPersianDateToTimestamp,
    formatDateForBackend, getCurrentDate,
    randomNumberGenerator,
    timestampToFormattedDateToSendHesabfa,
} from "../../utils/utilsFunction.tsx";
import {AdminReportContext} from "./AdminReportContext.tsx";
import useObjectDataHolder from "../../hooks/UseObjectDataHolder.tsx";

const AdminReportFilter = () => {

    const context = useContext(AdminReportContext);
    const { setMyData} = context;
    const [filterDateDate, setFilterDateDate] = useObjectDataHolder({
        singleDate: getCurrentDate(),
        startDate: "",
        endDate: "",
    })

    const handleChaneDate =(selectedDate) => {

        setFilterDateDate({singleDate: selectedDate})

        const backEnfFormat = convertPersianDateToTimestamp(selectedDate);

        const temp22= timestampToFormattedDateToSendHesabfa(backEnfFormat)

        setMyData({
            filterItems:
                [
                    {
                        Property: 'Date',
                        Operator: '=',
                        Value: temp22,
                    },
                ],
            // reload: randomNumberGenerator(),
        })
    }


    try {
        return (
            <div className={"flex flex-wrap gap-1"}>

                {/*<button*/}

                {/*    onClick={getTodayReport}*/}
                {/*> امروز*/}
                {/*</button>*/}


                <div className={'div__group__input_select'}>
                    <label htmlFor=""> انتخاب تاریخ </label>
                    {/*<input className={'ltr'} type="text" value={timestampToTimeFromHesabfa(invoice.Date)} disabled={true}/>*/}

                    <MyDatePicker
                        value={(filterDateDate.singleDate)}
                        onChange={handleChaneDate}

                    />
                </div>

                {/*<MyDatePicker value={persianDateToTimestamp(filterDateDate.singleDate)} onChange={changeSingleDate}/>*/}

            </div>
        )
    } catch (error) {
        return <>{error?.toString()}</>
    }
}

export default AdminReportFilter;
