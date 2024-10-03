import React, {useEffect} from 'react';
import useObjectDataHolder from "../../hooks/UseObjectDataHolder.tsx";
import {AdminReportContext} from "./AdminReportContext.jsx";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.tsx";
import {getDataFromHesabfaBasedOnFilterState} from "../../ReportBill/functions.tsx";
import AdminReport from "./AdminReport.tsx";
import {AdminReportContextType, ImyDataAdminReport} from "./myTypes.tsx";
import {formatDateForBackend} from "../../utils/utilsFunction.tsx";
import {useQuery} from "@tanstack/react-query";

const AdminReportCP = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayFormatted = formatDateForBackend(today);

    const [myData, setMyData] = useObjectDataHolder<ImyDataAdminReport>({
        titleData: [],
        detailsData: [],
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
    })
    const url = 'reports/adminReport';

    const myAxios = useAxiosPrivate();

    const queryFn = () => {
        const dataForSend = {filterItems: myData.filterItems};
        return myAxios.post(url, dataForSend)
    }

    const resultOfUseQuery =
        useQuery({
            queryKey: [myData.filterItems],
            // url: string, myAxios: any, page: number, pageSize: number, filters: any
            queryFn,
            staleTime: 86400000,  // === 60*60*24*1000
            enabled: true,
        })

    useEffect(() => {
        const temp = {
            titleData: resultOfUseQuery?.data?.data?.titleData || [],
            detailsData: resultOfUseQuery?.data?.data?.detailsData || [],
        }
        const hasError = resultOfUseQuery.error
        if(!hasError){
            setMyData({isLoading:false , ...temp})
        }
    }, [resultOfUseQuery?.data, resultOfUseQuery.error, setMyData,myData.filterItems]);
    // const {data, error, refetch} = resultOfUseQuery;

    useEffect(() => {
        const getData = async () => {
            try {
                setMyData({isLoading: true,});
                const data = {filterItems: myData.filterItems};
                const result = await myAxios.post(url, data);
                const temp = result.data;

                setMyData({isLoading: false, ...temp});
            } catch (error: any) {
                setMyData({isLoading: false,});

                console.log(error);
            }
        };

        // void getData();
    }, [myData?.reload]);


    return (<div>
        <AdminReportContext.Provider
            value={{myData, setMyData}}
        >
            <div>
                {resultOfUseQuery.isFetching && <> در حال بارگیری گزارش...</>}
            </div>
            <AdminReport/>
        </AdminReportContext.Provider>
    </div>)
};

export default AdminReportCP;
