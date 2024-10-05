import React, {useContext} from 'react';
import {AdminReportContext} from "./AdminReportContext.tsx";
import {formattedNumber} from "../../utils/utilsFunction.tsx";
import SummaryTable from "./SummaryTable/SummaryTable.tsx";

const SummaryReport = () => {
    const context = useContext(AdminReportContext)
    const {myData} = context;
    // let sumTotalPrice = 0




    try {
        return (
            <div>
                <div className={"flex flex-wrap gap-1"}>
                    <SummaryTable />
                </div>

            </div>
        );
    } catch (error) {
        return <div>{error.toString()}</div>
    }
};

export default SummaryReport;
