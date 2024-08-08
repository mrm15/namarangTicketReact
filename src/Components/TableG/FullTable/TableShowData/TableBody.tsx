import React from 'react';
import {flexRender} from "@tanstack/react-table";

const TableBody = ({table}) => {
    return table.getRowModel().rows.map((row, index) => {

        const isEven = index % 2 === 0
        return <tr key={row.id}
                   className={`${isEven ? " bg-gray-50 border-b " : " bg-gray-100 border-gray-700"}`}
        >
            {row.getVisibleCells().map((cell,index) => {
                const { columnDef } = cell.column;
                return (
                    <td
                        key={index}
                        style={{
                            padding: '8px',
                            width: cell.column.getSize(), // Use column size
                            minWidth: columnDef.minWidth, // Use column minSize
                            maxWidth: columnDef.maxWidth, // Use column maxSize
                            textAlign: 'center',
                            overflow: 'hidden',
                        }}
                    >
                        {flexRender(columnDef.cell, cell.getContext())}
                    </td>
                );
            })}
        </tr>
    })


};

export default TableBody;
