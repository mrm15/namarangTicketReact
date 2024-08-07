import React from 'react';
import {flexRender} from "@tanstack/react-table";

const TableBody = ({table}) => {
    return table.getRowModel().rows.map((row, index) => {

        const isEven = index % 2 === 0
        return <tr key={row.id}
                   className={`${isEven ? " bg-gray-50 border-b " : " bg-gray-100 border-gray-700"}`}
        >
            {row?.getVisibleCells()?.map((cell) => {


                    return <td
                        key={cell.id}
                        style={{
                            // border: '1px solid #ededed',
                            padding: '8px',
                            width: cell.column.getSize(), // Use column size
                            minWidth: cell.column.columnDef.minSize+"", // Use column minSize
                            maxWidth: cell.column.columnDef.maxSize+"", // Use column maxSize
                            textAlign: "center",
                            overflow:"hidden",

                        }}
                    >
                        {flexRender(cell?.column?.columnDef?.cell, cell?.getContext())}
                    </td>
                }
            )}
        </tr>
    })


};

export default TableBody;
