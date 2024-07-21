// MyTable.tsx
import React from 'react';
import {
    useReactTable,
    ColumnDef,
    getCoreRowModel,
    flexRender,
} from '@tanstack/react-table';
import { data, columns } from './SampleTableData.tsx';
import useWindowSize from "../../hooks/useWindowSize.tsx";

const MyTable: React.FC = () => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const myWindowsSize = useWindowSize()
    return (
        <div  style={{
            width: myWindowsSize.widthWindowSize-100,
            overflowX:"scroll",

        }}
        className={'border-2 border-black'}
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

export default MyTable;
