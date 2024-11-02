import React, {useEffect} from 'react';
import useAxiosPrivate from "../../hooks/useAxiosPrivate.tsx";
import {useQuery} from "@tanstack/react-query";
import ReportFilters from "./components/ReportFilters.tsx";
import {AccountingReportsProvider, useAccountingReportsContext} from "./AccountingReportsContext.tsx";
import AccountingComponent from "./components/AccountingComponent.tsx";
import {dateObjectToIso8601} from "../../utils/utilsFunction.tsx";
import  {DateObject} from "react-multi-date-picker";


const AccountingReports = () => {


    const currentDate = new Date();
    const hesabfaFormatDate = dateObjectToIso8601(new DateObject())

    const tomorrowJsDate = new Date(currentDate);
    tomorrowJsDate.setDate(currentDate.getDate() + 1);
    const hesabfaFormatTomorrow = dateObjectToIso8601(new DateObject({ date: tomorrowJsDate }));

    const initialData11 = {
        data: [],
        filters: [
            {uniqId: "startDate", Property: "Date", Operator: "<=", Value: hesabfaFormatDate, showValue: currentDate},
            {uniqId: "endDate", Property: "Date", Operator: ">", Value: hesabfaFormatTomorrow, showValue: tomorrowJsDate},
        ]
    }


    return (
        <AccountingReportsProvider initialData={initialData11}>
            <AccountingComponent/>


        </AccountingReportsProvider>
    );
};

export default AccountingReports;
