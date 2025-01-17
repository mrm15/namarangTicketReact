import React from 'react';
import TableG from "../TableG/TableG";
import TopTableLogsComponent from "./TopTableLogsComponent.tsx";

const LogTableList = () => {
    return (
        <div>
            <TableG
                url={"/logs/read"}
                TopTableComponent={TopTableLogsComponent}
            />
        </div>
    );
};

export default LogTableList;