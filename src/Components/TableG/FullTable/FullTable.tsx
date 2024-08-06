import React, {useContext} from 'react';
import {ReportBillContext} from "../../../ReportBill/ReportBillContext.tsx";
import {TableGContext} from "../TableGContext.tsx";
import Pagination from "./Pagination.tsx";
import TableShowData from "./TableShowData/TableShowData.tsx";

const FullTable = () => {
    const context = useContext(TableGContext);
    const { myData, setMyData } = context;
    if (!context) {
        return <div>Error: Context is undefined</div>;
    }


    return (
        <div>
            <TableShowData />
            <Pagination />
        </div>
    );
};

export default FullTable;
