import React from 'react';
import TableG from "../TableG/TableG.tsx";

const MyTicketList = () => {

    console.log("MyTicketList is Here")
    return (
        <div>
            <TableG
                url={"/ticket/myTicketList"}
                />
        </div>
    );
};

export default MyTicketList;