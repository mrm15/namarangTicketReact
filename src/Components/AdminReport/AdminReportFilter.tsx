import React, {useContext, useState} from 'react';
import MyDatePicker from "../MyDatePicker";
import {
    formatDateForBackend, getCurrentDate, persianDateToTimestamp,
    randomNumberGenerator,
    timestampToFormattedDateToSendHesabfa,
    timestampToTimeFromHesabfa
} from "../../utils/utilsFunction.tsx";
import {AdminReportContext} from "./AdminReportContext.tsx";
import useObjectDataHolder from "../../hooks/UseObjectDataHolder.tsx";

const AdminReportFilter = () => {

    const context = useContext(AdminReportContext);
    const {myData, setMyData} = context;
    const getTodayReport = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayFormatted = formatDateForBackend(today);
        setMyData({
            filterItems:
                [
                    {
                        Property: 'Date',
                        Operator: '=',
                        Value: todayFormatted,
                    },
                ],
            reload: randomNumberGenerator(),
        })
    }
    const [filterDateDate, setFilterDateDate] = useObjectDataHolder({
        singleDate: getCurrentDate(),
        startDate: "",
        endDate: "",
    })
    const changeSingleDate = (selectedDate) => {

        console.log(timestampToTimeFromHesabfa)
        console.log(timestampToFormattedDateToSendHesabfa)
        console.log(persianDateToTimestamp)
        // changeDateHandler(selectedDate, 'Date')
        debugger
        setFilterDateDate({singleDate: selectedDate})

        const todayFormatted = formatDateForBackend(selectedDate);
        setMyData({
            filterItems:
                [
                    {
                        Property: 'Date',
                        Operator: '=',
                        Value: selectedDate,
                    },
                ],
            reload: randomNumberGenerator(),
        })


    }


    try {
        return (
            <div className={"flex flex-wrap gap-1"}>

                <button

                    onClick={getTodayReport}
                > امروز
                </button>


                <div className={'div__group__input_select'}>
                    <label htmlFor=""> تاریخ </label>
                    {/*<input className={'ltr'} type="text" value={timestampToTimeFromHesabfa(invoice.Date)} disabled={true}/>*/}

                    <MyDatePicker
                        value={(filterDateDate.singleDate)}
                        onChange={(selectedDate) => {

                            setFilterDateDate({singleDate: selectedDate})

                            // changeDateHandler(selectedDate, 'singleDate')
                        }}

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
