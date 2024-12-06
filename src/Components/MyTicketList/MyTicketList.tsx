import React from 'react';
import TableG from "../TableG/TableG.tsx";

const MyTicketList = () => {

    console.log("MyTicketList is Here")
    const boldRowCondition = (row?: any) => {
        const readStatus = row?.original?.readStatus
        return readStatus === false;
        //return !(row?.original?.readStatus)
        // return false
    }
    return (
        <div>
            <TableG
                url={"/ticket/myTicketList"}
                boldRowCondition={boldRowCondition}
                />
        </div>
    );
};

export default MyTicketList;