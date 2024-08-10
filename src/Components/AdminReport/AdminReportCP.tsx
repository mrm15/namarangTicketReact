import React, {useEffect} from 'react';
import useObjectDataHolder from "../../hooks/UseObjectDataHolder.tsx";
import {AdminReportContext} from "./AdminReportContext.jsx";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.tsx";
import {getDataFromHesabfaBasedOnFilterState} from "../../ReportBill/functions.tsx";
import AdminReport from "./AdminReport.tsx";
import {AdminReportContextType, ImyDataAdminReport} from "./myTypes.tsx";

const AdminReportCP = () => {


    const [myData, setMyData] = useObjectDataHolder<ImyDataAdminReport>({
        titleData: [],
        detailsData:[],
        reload: "",
        filterItems: undefined,
        isLoading: true,
    })

    return (<div>
        <AdminReportContext.Provider
            value={{myData, setMyData}}
        >
            <AdminReport/>
        </AdminReportContext.Provider>
    </div>)
};

export default AdminReportCP;
