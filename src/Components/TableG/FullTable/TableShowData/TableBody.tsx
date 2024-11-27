import React, {useContext} from 'react';
import {flexRender} from "@tanstack/react-table";
import {TableGContext} from "../../TableGContext.tsx";

const TableBody = ({table}) => {

    const context = useContext(TableGContext);
    const {myData, setMyData} = context;

    return table.getRowModel().rows.map((row, index) => {

        const isEven = index % 2 === 0

        const isRowBold = myData?.boldRowCondition(row)

        return <ul key={row.id}
                   className={` ${isEven ? " bg-gray-50 " : " bg-gray-100"} table-row-g table__row__hover`  }
                   style={{fontWeight: isRowBold ? "bold " : "normal" , backgroundColor: isRowBold && "#ffc4c4"}}
        >
            {row.getVisibleCells().map((cell,index) => {
                const { columnDef } = cell.column;
                if(columnDef.hidden){
                    return null
                }
                return (
                    <li
                        key={index}
                        // style={{
                        //     padding: '8px',
                        //     width: cell.column.getSize(), // Use column size
                        //     minWidth: columnDef.minWidth, // Use column minSize
                        //     maxWidth: columnDef.maxWidth, // Use column maxSize
                        //     // textAlign: 'center',
                        //     textAlign: columnDef.textAlign,
                        //     overflow: 'hidden',
                        // }}
                        className={"table-cell-g"}
                        style={{
                            padding: '5px 3px',
                            // textAlign: "center",
                            width: cell.column.getSize()+"px", // Use column size
                            overflow:"hidden",
                            minWidth: cell.column.columnDef.minSize+"px", // Use column minSize
                            maxWidth: cell.column.columnDef.maxSize+"px", // Use column maxSize
                            // textOverflow:"ellipsis",
                        }}
                    >
                        {flexRender(columnDef.cell, cell.getContext())}
                    </li>
                );
            })}
        </ul>
    })


};

export default TableBody;
