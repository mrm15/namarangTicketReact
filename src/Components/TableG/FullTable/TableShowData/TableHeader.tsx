import React from 'react';
import {flexRender} from "@tanstack/react-table";

const TableHeader = ({table}) => {
    return table.getHeaderGroups()
        .map((headerGroup) => {
            return (
                <tr
                    key={headerGroup.id}
                    className={"bg-gray-300"}

                >
                    {headerGroup.headers.map((header: any, index: React.Key) => (
                        <th
                            key={index}
                            style={{
                                padding: '0 3px',
                                textAlign: "center",
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
            )
        })
};

export default TableHeader
