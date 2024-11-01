import React, {useEffect} from 'react';
import useAxiosPrivate from "../../hooks/useAxiosPrivate.tsx";
import {useQuery} from "@tanstack/react-query";
import ReportFilters from "./components/ReportFilters.tsx";
import {AccountingReportsProvider, useAccountingReportsContext} from "./AccountingReportsContext.tsx";
import AccountingComponent from "./components/AccountingComponent.tsx";

const AccountingReports = () => {



    const initialData11 = {
        data: [],
        filters: [
            {uniqId: "startDate", Property: "Date", Operator: "<=", Value: "", showValue: new Date()},
            {uniqId: "endDate", Property: "Date", Operator: ">", Value: "", showValue: new Date()},
        ]
    }


    return (
        <AccountingReportsProvider initialData={initialData11}>
            <AccountingComponent/>


        </AccountingReportsProvider>
    );
};

export default AccountingReports;
