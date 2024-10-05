import React, {useContext} from 'react';
import {AdminReportContext} from "../AdminReportContext";
import TableView from "./TableView.tsx";

const ReportTable = () => {
    const context = useContext(AdminReportContext)
    const {myData} = context;
    return (
        <div className={"w-fit flex flex-wrap justify-start gap-2 py-2"}>
            {myData.detailsData?.map((row, index) => <TableView
                key={index}
                index={index}
                {...row}
            />)}

        </div>
    );
};

export default ReportTable;
