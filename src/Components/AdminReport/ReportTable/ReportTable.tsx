import React, {useContext} from 'react';
import {AdminReportContext} from "../AdminReportContext";
import SingleTableView from "./SingleTableView.tsx";

const ReportTable = () => {
    const context = useContext(AdminReportContext)
    const {myData} = context;
    return (
        <div className={"w-fit flex flex-wrap justify-start gap-2 py-2"}>
            {myData.detailsData?.map((row, index) => <SingleTableView
                key={index}
                index={index}
                {...row}
            />)}

        </div>
    );
};

export default ReportTable;
