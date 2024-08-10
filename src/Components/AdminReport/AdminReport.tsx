import React, { useContext, useEffect, useState } from 'react';
import { AdminReportContext } from './AdminReportContext.tsx';
import useAxiosPrivate from '../../hooks/useAxiosPrivate.tsx';
import SummaryReport from './SummaryReport.tsx';
import ReportTable from './ReportTable/ReportTable.tsx';

const AdminReport = () => {
    const url = 'reports/adminReport';

    const context = useContext(AdminReportContext);
    const { myData, setMyData } = context;

    const myAxios = useAxiosPrivate();

    const [showReportTable, setShowReportTable] = useState(true); // State to manage the visibility of ReportTable

    useEffect(() => {
        const getData = async () => {
            try {
                const data = {};
                const result = await myAxios.post(url, data);
                const temp = result.data;

                setMyData({ isLoading: false, ...temp });
            } catch (error: any) {
                console.log(error);
            }
        };

        void getData();
    }, [myData?.reload]);

    if (!myData || !setMyData) {
        return <></>;
    }

    return (
        <div>
            {/*<FilterReport />*/}
            <SummaryReport />
            <hr />
            <button
                onClick={() => setShowReportTable(!showReportTable)}
                className="  text-right text-blue-500 hover:text-blue-700 font-semibold p-5 mb-2 border-2 rounded"
            >
                {showReportTable ? '▲ پنهان کردن جزئیات' : '▼ مشاهده جزئیات'}
            </button>
            {showReportTable && <ReportTable />}
        </div>
    );
};

export default AdminReport;
