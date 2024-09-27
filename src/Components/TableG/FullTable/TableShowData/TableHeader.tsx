import React, {useContext, useState} from 'react';
import {flexRender} from "@tanstack/react-table";
import {TableGContext} from "../../TableGContext.tsx";
import {randomNumberGenerator} from "../../../../utils/utilsFunction.tsx";

const TableHeader = ({table}) => {
    const context = useContext(TableGContext);
    const {myData, setMyData} = context;



    return table.getHeaderGroups()
        .map((headerGroup) => {
            return (
                <ul
                    key={headerGroup.id}
                    className={"bg-gray-300 header__ul table-row-g select-none"}

                >
                    {headerGroup.headers.map((header: any, index: React.Key) => {

                        if (header.column.columnDef.hidden) {
                            return null
                        }


                        const handleMouseDown = (e, header) => {
                            const startX = e.clientX;
                            const startWidth = header.column.getSize();

                            const isRTL=true
                            const handleMouseMove = (e) => {
                                // const newWidth = startWidth + (e.clientX - startX);
                                const deltaX = isRTL ? (startX - e.clientX) : (e.clientX - startX); // Reverse for RTL
                                const newWidth = startWidth + deltaX;
                                console.log(newWidth)
                                header.column.size=newWidth
                                header.column.columnDef.minSize=newWidth
                                header.column.columnDef.maxSize=newWidth
                                // header.column.setSize(newWidth);
                                setMyData({reOrderTableAfterChangeColumnWidth:randomNumberGenerator()})
                            };

                            const handleMouseUp = () => {
                                document.removeEventListener('mousemove', handleMouseMove);
                                document.removeEventListener('mouseup', handleMouseUp);
                            };

                            document.addEventListener('mousemove', handleMouseMove);
                            document.addEventListener('mouseup', handleMouseUp);
                        };
                        return (
                            <li
                                key={index}
                                style={{
                                    padding: '5px 3px',
                                    textAlign: "center",
                                    // overflowX: "hidden",
                                    // overflowY:"visible",
                                    width: header.column.getSize() + "px", // Use column size
                                    minWidth: header.column.columnDef.minSize + "px", // Use column minSize
                                    maxWidth: header.column.columnDef.maxSize + "px", // Use column maxSize
                                }}
                                className={"whitespace-nowrap table-cell-g  relative"}
                            >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    <div
                                        className={"resizer"}

                                        onMouseDown={(e) => handleMouseDown(e, header)}
                                    />

                            </li>
                        )
                    })}
                </ul>
            )
        })
};

export default TableHeader


