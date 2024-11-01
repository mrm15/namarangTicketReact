import React, {useContext, useState} from 'react';
import MyDatePicker from "../MyDatePicker";
import {
    convertPersianDateToTimestamp,
    formatDateForBackend, getCurrentDate, getCurrentDateWithZeroHours,
    randomNumberGenerator,
    timestampToFormattedDateToSendHesabfa,
} from "../../utils/utilsFunction.tsx";
import {AdminReportContext} from "./AdminReportContext.tsx";
import useObjectDataHolder from "../../hooks/UseObjectDataHolder.tsx";
import MyDatePicker2 from "../myDatePicker2/MyDatePicker2.tsx";
import {DateObject} from "react-multi-date-picker";
import {nanoid} from "@reduxjs/toolkit";

interface IfilterDateAdminReport {
    singleDate: string | null;
    showSingleDate: DateObject | null;
    startDate: string | null;
    showStatDate: DateObject | null;
    endDate: string;
    showEndDate: DateObject | null;
    model: "single" | "multi";
}

const AdminReportFilter = () => {

    const context = useContext(AdminReportContext);
    const {setMyData, myData} = context;
    const [filterDate, setFilterDate] = useObjectDataHolder<IfilterDateAdminReport>({
        singleDate: getCurrentDateWithZeroHours().toString(),
        showSingleDate: getCurrentDateWithZeroHours(),
        startDate: null,
        showStatDate: null,
        endDate: null,
        showEndDate: null,
        model: "single"
    })

    const handleChangeSingleDate = (selectedDate) => {
        setFilterDate({
            singleDate: selectedDate.hesabfaFormatDate,
            showSingleDate:selectedDate.jsDateZeroTime
        })
        setMyData({
            filterItems:
                [
                    {
                        Property: 'Date',
                        Operator: '=',
                        Value: selectedDate.hesabfaFormatDate,
                    },
                ],
            reload: nanoid(20),
        })
    }

    const handleChangeMultiDate = (selectedDate, filterType) => {
        debugger
        const tempFilterDate = {...filterDate}
        if (filterType === "start") {
            tempFilterDate.startDate = selectedDate.hesabfaFormatDate
            tempFilterDate.showSingleDate = selectedDate.jsDate

        } else {
            tempFilterDate.endDate = selectedDate.hesabfaFormatDate
            tempFilterDate.showEndDate = selectedDate.jsDate

        }

        setFilterDate(tempFilterDate)


        if (tempFilterDate.startDate && tempFilterDate.endDate) {
            setMyData({
                filterItems:
                    [
                        {
                            Property: 'Date',
                            Operator: '>=',
                            Value: tempFilterDate.startDate,
                        },
                        {
                            Property: 'Date',
                            Operator: '<',
                            Value: tempFilterDate.endDate,
                        },
                    ],
                reload: nanoid(20),
            })
        }

    }


    const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterDate({
            model: e.target.checked ? "multi" : "single",
            singleDate: null,
            showSingleDate: null,
            startDate: null,
            showStatDate: null,
            endDate: null,
            showEndDate: null,
        })
        setMyData({filterItems: []})
    }


    try {

        const singleFilterView = <div className={'div__group__input_select'}>
            <label htmlFor=""> انتخاب تاریخ </label>
            <MyDatePicker2
                onChange={handleChangeSingleDate}
                value={filterDate.showSingleDate}
            />
        </div>

        const multiFilterView = <div className={"flex flex-wrap gap-2"}>
            <div className={'div__group__input_select'}>
                <label htmlFor=""> انتخاب تاریخ </label>
                <MyDatePicker2
                    onChange={(myDate) => handleChangeMultiDate(myDate, "start")}
                    value={filterDate.showStatDate}
                    placeholder={"تاریخ شروع بزرگتر مساوی"}
                />
            </div>
            <div className={'div__group__input_select'}>
                <label htmlFor=""> انتخاب تاریخ </label>
                <MyDatePicker2
                    onChange={(myDate) => handleChangeMultiDate(myDate, "end")}
                    value={filterDate.showEndDate}
                    placeholder={"تاریخ پایان  کوچیکتر"}
                />
            </div>
        </div>

        return (
            <div className={""}>

                <div className="flex ">
                    <div className={"div__group__input_select"}>
                        <div className="inline-flex items-center select-none">
                            <label className="flex items-center cursor-pointer relative" htmlFor={"multiFilter"}>
                                <input type="checkbox"
                                       onChange={handleCheckBox}
                                       className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
                                       id="multiFilter"/>
                                <span
                                    className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20"
                                   fill="currentColor"
                                   stroke="currentColor" stroke-width="1">
                                <path fill-rule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clip-rule="evenodd"></path>
                              </svg>
                            </span>
                            </label>
                            <label htmlFor={"multiFilter"} className={"mx-1"}>بازه تاریخ </label>
                        </div>
                    </div>
                    <div className={""}>
                        {myData?.resultOfUseQuery?.isFetching && <div
                          className={"badge-bg-green-text-white"}
                        > در حال بارگیری گزارش...</div>}
                    </div>
                </div>
                {filterDate.model === "single" ? singleFilterView : multiFilterView}

            </div>
        )


    } catch (error) {
        return <>{error?.toString()}</>
    }
}

export default AdminReportFilter;
