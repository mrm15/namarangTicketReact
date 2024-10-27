import React, {useContext} from 'react';
import {TableGContext} from "../../../TableG/TableGContext.tsx";

const MarkAsReadTicketAssignments = () => {
    const context = useContext(TableGContext);
    const {myData, setMyData} = context;
    // myData.tableData
    // myData.checkedItems
    console.log(myData.columns)
    debugger

    return (
        <button className={"btn-white-border-mir"}>
            خوانده شده
        </button>
    );
};

export default MarkAsReadTicketAssignments;
