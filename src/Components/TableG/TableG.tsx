import React, {useEffect} from 'react';
import useObjectDataHolder from "../../hooks/UseObjectDataHolder.tsx";
import {TableGContext} from "./TableGContext.tsx";
import FullTable from "./FullTable/FullTable.tsx";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.tsx";
import {IMyData} from "./myTableGTypes.tsx";
import {useQuery} from "@tanstack/react-query";
import {fetchTableData} from "./fetchTableData.tsx";
import {randomNumberGenerator} from "../../utils/utilsFunction.tsx";

const TableG = ({
                    url = "/user/read", TopTableComponent = undefined, boldRowCondition = () => false,
                    filters = [],rowUniqId="_id"
                }) => {
    const [myData, setMyData] = useObjectDataHolder<IMyData>({
        url: url,
        rowUniqId:rowUniqId,
        boldRowCondition: boldRowCondition,
        pageNumber: 1,
        numberOfRows: 20,
        columns: [],
        tableData: [],
        filters: filters,
        totalRows: 75,
        reload: "",
        isLoading: false,
        errorMessage: "",
        queryData: "",
        reOrderTableAfterChangeColumnWidth: "",
        checkedItems: []
    });

    const myAxios = useAxiosPrivate();


    const resultOfUseQuery =
        useQuery({
            queryKey: [myData.url, myData.pageNumber, myData.numberOfRows, myData.filters , myData.reload],
            // url: string, myAxios: any, page: number, pageSize: number, filters: any
            queryFn: () => fetchTableData(url, myAxios, myData.pageNumber, myData.numberOfRows, myData.filters),
            staleTime: 86400000,  // === 60*60*24*1000
            enabled: true,
        })
    const {data, error, refetch} = resultOfUseQuery;
    useEffect(() => {
        setMyData({queryData: resultOfUseQuery})
    }, [resultOfUseQuery.isLoading, resultOfUseQuery.data, resultOfUseQuery.isFetching, resultOfUseQuery.isFetched, resultOfUseQuery.error]);

    useEffect(() => {
        if (error) {
            console.log(error)
            setMyData({errorMessage: "Error Data Try Again!!!" + " - " + (error?.toString()), isLoading: false});
        }
    }, [error]);


    useEffect(() => {
        setMyData({url});
    }, [setMyData, url]);

    useEffect(() => {
        const updateData = async () => {
            if (myData.isLoading) return;

            setMyData({isLoading: true});
            const data = {
                page: myData.pageNumber,
                pageSize: myData.numberOfRows,
                filters: myData.filters,
            };

            try {
                const res = await myAxios.post(url, data);
                if (res.status === 200) {
                    const responseObject = res.data;
                    setMyData({
                        errorMessage: "",
                        totalRows: responseObject.totalDocuments,
                        tableData: responseObject.results,
                        pageNumber: responseObject.currentPage,
                        isLoading: false,
                    });
                } else {
                    setMyData({errorMessage: "Error Data Try Again!!!"});
                }
            } catch (error) {
                setMyData({errorMessage: "Error Data Try Again!!!", isLoading: false});
            }
        };

        //void updateData();
    }, [myAxios, myData.reload, setMyData, url]);

    useEffect(() => {
        if (data) {
            setMyData({
                errorMessage: "",
                totalRows: data.totalDocuments || 0,
                tableData: data?.results || [],
                pageNumber: data.currentPage, // از بک به اسم "کارنت پیج" میاد
            });
        }
    }, [data, setMyData, myData.reOrderTableAfterChangeColumnWidth]);

    useEffect(() => {
        // اینجا کامپوننت بعضی وقتا دو بار رندر میشد و دوبار موقع باز کردن صفحه به بک اند درخواست میزد با این کار که تایم اوت گذاشتم جلوشو گرفتم
        const timeoutId = setTimeout(() => {
            if (!resultOfUseQuery.isFetching && !resultOfUseQuery.isLoading) {
                // void refetch();

            }
        },); // Delay for 100 ms
        return () => {

            return clearTimeout(timeoutId); // Cleanup previous timeout
        }
    }, [myData.filters, myData.numberOfRows, myData.pageNumber, myData.reload, url, refetch]);

    try {

        return (
            <TableGContext.Provider value={{myData, setMyData}}>
                {/*<br/>*/}
                {/*{resultOfUseQuery.isLoading && "در حال بارگزاری داده ها"}*/}
                {/*<br/>*/}
                {/*{resultOfUseQuery.isFetching && "در حال فچ کردن داده ها"}*/}
                {/*<br/>*/}
                {/*{resultOfUseQuery.isFetched && "فچ شدن و تمام"}*/}
                {/*<br/>*/}
                <div>
                    {/*<div>{"عنوان"}</div>*/}

                    {TopTableComponent && <TopTableComponent/>}
                    <FullTable/>
                </div>
                <div className={"m-5"}>
                    {myData.queryData.isLoading ?
                        <span
                            className={"badge-bg-blue-text-white"}
                        >
                            در حال دریافت اطلاعات
                        </span> : ""}
                    {myData.queryData.error ?
                        <span

                            onClick={() => setMyData({reload: randomNumberGenerator()})}
                            className={"badge-bg-red-text-red cursor-pointer "}>
                        تلاش مجدد
                    </span> : ""}
                </div>
            </TableGContext.Provider>
        );
    } catch (error) {
        return <>{error?.toString()}</>
    }
};

export default TableG;
