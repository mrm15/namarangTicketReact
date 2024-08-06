import React from 'react';
import Loader3 from "../../../Loader/Loader3.tsx";
import {flexRender} from "@tanstack/react-table";

const LoadInTable = ({
                         columnsLength,
                         loadingSection,
                         parentTableWidth,
                         table

                     }) => {

    const singleRow = table.getRowModel().rows[0]

    try {
        return (<>
                <tr
                    className={"bg-gray-100 border-gray-700"}
                >
                    {singleRow.getVisibleCells().map((cell: any, index: React.Key) => (
                        <td
                            key={index}

                        >
                            {/*{flexRender(*/}
                            {/*    header.column.columnDef.header,*/}
                            {/*    header?.getContext()*/}
                            {/*)}*/}
                            {/*{flexRender(cell.column.columnDef.cell, cell.getContext())}*/}
                            <div
                                style={{
                                    padding: '0 3px',
                                    // textAlign: "center",
                                    width: cell.column.getSize(), // Use column size
                                    minWidth: cell?.column?.columnDef?.minSize+""  , // Use column minSize
                                    maxWidth: cell?.column?.columnDef?.maxSize+""  , // Use column maxSize
                                    overflow:"hidden",
                                }}
                            >
                                111111111111111111111111111111111111111111111111111111
                            </div>
                            {/*&nbsp;&nbsp;*/}

                        </td>
                    ))}
                </tr>

                <tr>
                    <td colSpan={columnsLength}
                        className={"border-b"}
                    >
                        <div style={{
                            height: loadingSection.height,
                            width: parentTableWidth + 100
                        }}
                             className={"  overflow-hidden000"}>
                            <Loader3/>
                        </div>
                    </td>
                </tr>
            </>
        )
    } catch (error) {
        return <tr>
            <td>{error.toString()}</td>
        </tr>
    }
};

export default LoadInTable;
