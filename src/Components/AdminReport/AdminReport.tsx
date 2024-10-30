import React, {useContext, useEffect, useState} from 'react';
import {AdminReportContext} from './AdminReportContext.tsx';
import useAxiosPrivate from '../../hooks/useAxiosPrivate.tsx';
import SummaryReport from './SummaryReport.tsx';
import AdminReportFilter from "./AdminReportFilter.tsx";
import {formatDateForBackend} from "../../utils/utilsFunction.tsx";
import {useQuery} from "@tanstack/react-query";
import SummaryTable from "./SummaryTable/SummaryTable.tsx";
import FetchingAdminReport from "./FetchingAdminReport.tsx";

const AdminReport = () => {

    const context = useContext(AdminReportContext);
    const {myData, setMyData} = context;


    const [showReportTable, setShowReportTable] = useState(true); // State to manage the visibility of ReportTable


    if (!myData || !setMyData) {
        return <> موردی پیش اومده و اطلاعات به درستی دریافت نشد!</>;
    }

    return (
        <div className={"fontSize075rem"}>
            <AdminReportFilter/>
            {myData?.resultOfUseQuery?.isFetching &&
            <FetchingAdminReport/>
            }
            {
                !myData.isLoading ?
                    <>
                        <SummaryReport/>
                        <hr/>
                    </> : <FetchingAdminReport/>
            }
        </div>
    );
};

export default AdminReport;
