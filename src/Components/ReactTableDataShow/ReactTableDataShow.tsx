// MyTable.tsx
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
    TableFilterSection?:any
}

const ReactTableDataShow: React.FC<MyProps> = ({data, columns , TableFilterSection}) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const myWindowsSize = useWindowSize()
    return (
        <div style={{
            width: myWindowsSize.widthWindowSize - 250,
            overflowX: "scroll",
            opacity:"hidden",

        }}
             className={' shadow shadow-black '}
        >
            <table style={{width: '100%', borderCollapse: 'collapse'}} className={'m-1'}>
                <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th
                                key={header.id}
                                style={{border: '1px solid black', padding: '8px'}}
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
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td
                                key={cell.id}
                                style={{border: '1px solid black', padding: '8px'}}
                            >
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReactTableDataShow;
