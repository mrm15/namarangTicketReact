import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import {getCoreRowModel, useReactTable} from '@tanstack/react-table';
import {TableGContext} from '../../TableGContext';
import useWindowSize from "../../../../hooks/useWindowSize.tsx";
import TableHeader from "./TableHeader.tsx";
import TableBody from "./TableBody.tsx";
import LoadInTable from "./LoadInTable.tsx";
import {useNavigate} from "react-router-dom";
import {findTableColumns} from "../findTableColumns/findTableColumns.tsx";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate.tsx";
import "./tableGStyle.scss"

const TableShowData = () => {
    const context = useContext(TableGContext);
    const {myData, setMyData} = context;

    const navigateTo = useNavigate()

    const myAxios = useAxiosPrivate()
    // Memoize columns to only change when URL changes
    const columns = useMemo(() => {
        return findTableColumns({
            url: myData.url,
            navigateTo,
            myAxios,
            setMyData,
            myData

        });
    }, [myData.url]);



    // Memoize data to only change when tableData changes
    const data = useMemo(() => myData?.tableData || [], [myData?.tableData,myData.reload]);

    // Define the table instance
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const myWindowsSize = useWindowSize();
    // const parentTableWidth = myWindowsSize.widthWindowSize - 150;


    try {


        return (
            <div
                className={"shadow-md table-container-g"}
            >
                <div className={"text-left rtl:text-right text-gray-500 dark:text-gray-400 table-g"}>
                    <div

                        className={" text-xs text-gray-700 uppercase bg-gray-50 table-head-g"}>
                        <TableHeader table={table}/>
                    </div>
                    <div
                        className={"table-body-g relative"}
                    >

                            {myData?.queryData?.isLoading && (
                                <LoadInTable/>
                            )}

                        {data.length === 0 && <>
                          <div className={" h-full min-h-screen "}>
                            <div className={"absolute top-0 right-0 w-screen text-center "}>
                              <div className={""}>
                                اطلاعاتی جهت نمایش وجود ندارد ☹️
                              </div>
                            </div>
                          </div>
                        </>}

                        {<TableBody table={table}/>}


                    </div>
                </div>
            </div>
        );
    } catch (e) {
        return <>{e.toString()}</>;
    }
};

export default TableShowData;
