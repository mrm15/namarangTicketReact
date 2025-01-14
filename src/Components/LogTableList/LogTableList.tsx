import React from 'react';
import TableG from "../TableG/TableG";

const LogTableList = () => {
    return (
        <div>
            <TableG
                url={"/logs/read"}
            />
        </div>
    );
};

export default LogTableList;