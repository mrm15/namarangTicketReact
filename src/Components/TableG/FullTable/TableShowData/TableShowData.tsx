import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { TableGContext } from '../../TableGContext';
import useWindowSize from "../../../../hooks/useWindowSize.tsx";
import TableHeader from "./TableHeader.tsx";
import TableBody from "./TableBody.tsx";
import LoadInTable from "./LoadInTable.tsx";
import { useNavigate } from "react-router-dom";
import { findTableColumns } from "../findTableColumns/findTableColumns.tsx";

const TableShowData = () => {
    const context = useContext(TableGContext);
    const { myData } = context;

    const navigateTo = useNavigate();

    // Memoize columns to only change when URL changes
    const columns = useMemo(() => {
        return findTableColumns({
            url: myData.url,
            navigateTo,
        });
    }, [myData.url]);

    const tbodyRef = useRef(null);
    const [loadingSection, setLoadingSection] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        if (tbodyRef.current) {
            const { height, width } = tbodyRef.current.getBoundingClientRect();
            setLoadingSection({ height, width });
        }
    }, [tbodyRef, myData.tableData]);

    // Memoize data to only change when tableData changes
    const data = useMemo(() => myData?.tableData || [], [myData?.tableData]);

    // Define the table instance
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const myWindowsSize = useWindowSize();
    const parentTableWidth = myWindowsSize.widthWindowSize - 150;

    try {
        return (
            <div
                style={{
                    width: parentTableWidth,
                    overflowX: "scroll",
                }}
                className={"relative overflow-x-auto shadow-md sm:rounded-lg my-3 fontSize8"}
            >
                <table className={"w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"}>
                    <thead className={"text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"}>
                    <TableHeader table={table} />
                    </thead>
                    <tbody ref={tbodyRef}>
                    {myData.isLoading && (
                        <LoadInTable
                            columnsLength={columns.length}
                            loadingSection={loadingSection}
                            parentTableWidth={parentTableWidth}
                            table={table}
                        />
                    )}
                    {!myData.isLoading && <TableBody table={table} />}
                    </tbody>
                </table>
            </div>
        );
    } catch (e) {
        return <>{e.toString()}</>;
    }
};

export default TableShowData;
