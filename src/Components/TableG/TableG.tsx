import React, { useEffect } from 'react';
import useObjectDataHolder from "../../hooks/UseObjectDataHolder.tsx";
import { TableGContext } from "./TableGContext.tsx";
import FullTable from "./FullTable/FullTable.tsx";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.tsx";
import {IMyData} from "./myTableGTypes.tsx";
import {useQuery} from "@tanstack/react-query";
import {fetchTableData} from "./fetchTableData.tsx";
import {toast} from "react-toastify";

const TableG = ({ url = "/user/read" }) => {
    const [myData, setMyData] = useObjectDataHolder<IMyData>({
        url: url,
        pageNumber: 1,
        currentPage: 1,
        numberOfRows: 5,
        columns: [],
        tableData: [],
        filters: [],
        totalRows: 75,
        reload: "",
        isLoading: false,
        errorMessage: "",
    });

    const myAxios = useAxiosPrivate();

    const {data, isLoading, error, refetch} =
        useQuery({
            queryKey: [url, myData.pageNumber, myData.numberOfRows, myData.filters],
            // url: string, myAxios: any, page: number, pageSize: number, filters: any
            queryFn: () => fetchTableData(url, myAxios, myData.pageNumber, myData.numberOfRows, myData.filters),
            staleTime: 86400000,  // === 60*60*24*1000
            enabled: true,
        })


    useEffect(() => {
        setMyData({isLoading})
    }, [isLoading, setMyData]);

    useEffect(() => {
        if (error) {
            setMyData({errorMessage: "Error Data Try Again!!!", isLoading: false});
        }
    }, [error]);


    useEffect(() => {
        setMyData({url});
    }, [setMyData, url]);

    useEffect(() => {
        const updateData = async () => {
            if (myData.isLoading) return;

            setMyData({ isLoading: true });
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
                totalRows: data.totalDocuments,
                tableData: data.results,
                pageNumber: data.currentPage,
                isLoading: false,
            });
        }
    }, [data]);

    useEffect(() => {
        void refetch()
    }, [myAxios, myData.filters, myData.isLoading, myData.numberOfRows, myData.pageNumber, myData.reload, setMyData, url]);


    const loaderHandle = () => {
        setMyData({ isLoading: !myData.isLoading });
    };

    return (
        <TableGContext.Provider value={{ myData, setMyData }}>
            <div>
                <button onClick={loaderHandle}>loader</button>
                {myData.errorMessage ? <>
                    <button
                        onClick={() => refetch()}
                    >{myData.errorMessage}</button>
                    {isLoading ? "در حال دریافت اطلاعات" : ""}
                </> : ""}

                <FullTable />
            </div>
        </TableGContext.Provider>
    );
};

export default TableG;
