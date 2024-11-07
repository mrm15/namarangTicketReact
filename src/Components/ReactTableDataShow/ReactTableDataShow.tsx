import React from 'react';
import {
    useReactTable,
    ColumnDef,
    getCoreRowModel,
    flexRender,
} from '@tanstack/react-table';
import useWindowSize from "../../hooks/useWindowSize.tsx";
import TableFilterSection from "../../ReportBill/TableFilterSection.tsx";

interface MyProps {
    data: { [key: string]: any }[],
    columns: ColumnDef<{ [key: string]: any }>[] // Correctly typing columns as an array of ColumnDef
    TableFilterSection?: any
}

const ReactTableDataShow: React.FC<MyProps> = ({ data, columns, TableFilterSection }) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const myWindowsSize = useWindowSize()
    return (
        <div style={{
            // width: myWindowsSize.widthWindowSize - 250,
            overflowX: "scroll",
            opacity: "hidden",
        }}
             className={' shadow shadow-black fontSize12  myResponsiveWidthMenuOpen'}
        >
            <table style={{ width: '100%', borderCollapse: 'collapse' }} className={'m-1'}>
                <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th
                                key={header.id}
                                style={{
                                    border: '1px solid black',
                                    padding: '8px',
                                    width: header.column.getSize(), // Use column size
                                    minWidth: header.column.columnDef.minSize, // Use column minSize
                                    maxWidth: header.column.columnDef.maxSize, // Use column maxSize
                                }}
                            >
                                {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody>
                {TableFilterSection && <TableFilterSection />}
                {data.length!==0 && table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row?.getVisibleCells()?.map(cell => (
                            <td
                                key={cell.id}
                                style={{
                                    border: '1px solid black',
                                    padding: '8px',
                                    width: cell.column.getSize(), // Use column size
                                    minWidth: cell.column.columnDef.minSize, // Use column minSize
                                    maxWidth: cell.column.columnDef.maxSize, // Use column maxSize
                                }}
                            >
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
            {data.length===0 && <>
              <div className={"text-center p-5 w-full"}>
                اطلاعاتی جهت نمایش وجود ندارد ☹️
              </div>
            </>}
        </div>
    );
};

export default ReactTableDataShow;
