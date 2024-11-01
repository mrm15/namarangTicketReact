import React from 'react';
import {useAccountingReportsContext} from "../AccountingReportsContext.tsx";
import ReportFilters from "./ReportFilters.tsx";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.tsx";
import {useQuery} from "@tanstack/react-query";
import FetchingAdminReport from "../../AdminReport/FetchingAdminReport.tsx";
import ShowBillUsersReport from "./ShowBillUsersReport.tsx";

const AccountingComponent = () => {
    const axiosPrivate = useAxiosPrivate()

    const {data, setData} = useAccountingReportsContext()
    // const handleGetData = async () => {
    //     const result = await axiosPrivate.post("/reports/billUsers", {filterItems: data.filters})
    //     setData({data: result.data.data})
    //
    // }
    const queryFn = () => {
        return axiosPrivate.post("/reports/billUsers" , {filterItems: data.filters})
    }

    const resultOfUseQuery =
        useQuery({
            queryKey: [data.filters],
            // url: string, myAxios: any, page: number, pageSize: number, filters: any
            queryFn,
            staleTime: 86400000,  // === 60*60*24*1000
            enabled: true,
        })

    console.log(resultOfUseQuery)
    return (
        <div>
            <ReportFilters/>
            {/*<button*/}
            {/*    className={"btn-submit-mir"}*/}
            {/*    onClick={handleGetData}>*/}
            {/*    دریافت گزارش*/}
            {/*</button>*/}


            {(resultOfUseQuery.isLoading) &&
              <FetchingAdminReport/>
            }
            {resultOfUseQuery.isFetched && <ShowBillUsersReport data={resultOfUseQuery.data.data.data}/>}
        </div>
    );
};

export default AccountingComponent;
