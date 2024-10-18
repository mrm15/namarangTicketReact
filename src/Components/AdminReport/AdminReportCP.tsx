import React, {useEffect} from 'react';
import useObjectDataHolder from "../../hooks/UseObjectDataHolder.tsx";
import {AdminReportContext} from "./AdminReportContext.jsx";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.tsx";
import {getDataFromHesabfaBasedOnFilterState} from "../../ReportBill/functions.tsx";
import AdminReport from "./AdminReport.tsx";
import {AdminReportContextType, ImyDataAdminReport} from "./myTypes.tsx";
import {dateObjectToIso8601, formatDateForBackend} from "../../utils/utilsFunction.tsx";
import {useQuery} from "@tanstack/react-query";
import {DateObject} from "react-multi-date-picker";
import {toast} from "react-toastify";

const AdminReportCP = () => {
    const todayDateObject = new DateObject();
    todayDateObject.setHour(0);
    todayDateObject.setMinute(0);
    todayDateObject.setSecond(0);
    todayDateObject.setMillisecond(0);
    const todayFormatted = dateObjectToIso8601(todayDateObject)


    const [myData, setMyData] = useObjectDataHolder<ImyDataAdminReport>({
        tableView: [],
        reload: "",
        filterItems: [
            {
                Property: 'Date',
                Operator: '=',
                Value: todayFormatted,
            },
        ],
        isLoading: true,
        reFetch: "",
        treeView: [],
        resultOfUseQuery:null

    })
    const url = 'reports/adminReport';

    const myAxios = useAxiosPrivate();

    const queryFn = () => {
        const dataForSend = {filterItems: myData.filterItems};
        return myAxios.post(url, dataForSend)
    }

    const resultOfUseQuery =
        useQuery({
            queryKey: [myData.reload],
            // url: string, myAxios: any, page: number, pageSize: number, filters: any
            queryFn,
            staleTime: 86400000,  // === 60*60*24*1000
            enabled: true,
        })

    useEffect(() => {
        const temp = {
            titleData: resultOfUseQuery?.data?.data?.titleData || [],
            detailsData: resultOfUseQuery?.data?.data?.detailsData || [],
            treeView: resultOfUseQuery?.data?.data?.treeView || [],
            tableView: resultOfUseQuery?.data?.data?.tableView || [],
            resultOfUseQuery:resultOfUseQuery,
        }
        const hasError = resultOfUseQuery.error
        if (!hasError) {
            setMyData({isLoading: false, ...temp})
        }
    }, [resultOfUseQuery?.data, resultOfUseQuery.error, setMyData, myData.filterItems]);
    // const {data, error, refetch} = resultOfUseQuery;

    // useEffect(() => {
    //     const getData = async () => {
    //         try {
    //             setMyData({isLoading: true,});
    //             const data = {filterItems: myData.filterItems};
    //             const result = await myAxios.post(url, data);
    //             const temp = result.data;
    //
    //             setMyData({isLoading: false, ...temp});
    //         } catch (error: any) {
    //             setMyData({isLoading: false,});
    //
    //             console.log(error);
    //         }
    //     };
    //
    //     // void getData();
    // }, [myData?.reload]);



    return (<div className={"relative"}>
        <AdminReportContext.Provider
            value={{myData, setMyData}}
        >
            <AdminReport/>
        </AdminReportContext.Provider>
    </div>)
};

export default AdminReportCP;
