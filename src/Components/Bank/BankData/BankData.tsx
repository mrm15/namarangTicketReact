import {useEffect, useMemo} from "react";
import {useParams} from "react-router-dom";
import {nanoid} from "@reduxjs/toolkit";
import {useQuery} from "@tanstack/react-query";
import {TfiReload} from "react-icons/tfi";

import {useBankContext} from "../bankContext";
import ReportFilters from "../../AccountingReports/components/ReportFilters";
import ShowTableData from "./ShowTableData.tsx";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.tsx";
import {PAGES} from "../../../Pages/Route-string.tsx";
import {ROLES} from "../../../Pages/ROLES.tsx";
import toast from "react-hot-toast";

const BankData = () => {
    const {data, setData} = useBankContext();
    const params = useParams();
    const urlParams = params["*"];
    const axiosPrivate = useAxiosPrivate(1);

    // Build request URL based on `urlParams`


    const findRequestUrl = () => {
        const myBankKey = PAGES.myBank.split("/")[1];
        const myBankDepartmentKey = PAGES.myBankDepartment.split("/")[1];
        const allBanksKey = PAGES.allBanks.split("/")[1];
        const detailsBankKey = PAGES.myDetailsBank.split("/")[1];

        if (urlParams === myBankKey) {
            return `banking/${ROLES.myBankFirstUserId}`;
        }

        if (urlParams === myBankDepartmentKey) {
            return `banking/${ROLES.myBankDepartment}`;
        }
        if(urlParams === allBanksKey){
            return `banking/${ROLES.allBanksFirstUserId}`;
        }
        if(urlParams === detailsBankKey){
            return `banking/detailsBank`;

        }

        return ""

    };

    // Update context state when `requestUrl` changes
    useEffect(() => {



        setData({
            tableData: [],
            requestUrl:findRequestUrl(),
            reload: nanoid(5),
        });
    }, [urlParams, setData]);

    // Query function for fetching data
    const fetchData = async () => {
        const filters = data.filters;

        const response = await axiosPrivate.post(data.requestUrl, {filterItems: filters});
        if (!response || !response.data) {
            // throw new Error("API response is undefined.");
            return []
        }

        console.log("API Response:", response.data); // Debugging the response
        toast.success(response?.data?.message)
        return response.data;
    };

    // Use React Query to fetch data
    const {data: queryResultData, refetch, isError, error, isFetching} = useQuery({
        queryKey: [data.requestUrl, data.filters, data.reload], // Include `requestUrl` directly in the key
        queryFn: fetchData,
        staleTime: 86400000, // Cache for 24 hours
        enabled: !!data.requestUrl, // Only fetch when `requestUrl` is defined
    });

    if (isError) {
        return <div className="text-red-500">Error: {error?.message || "Something went wrong!"}</div>;
    }

    return (
        <div>
            {/* Actions Section */}
            <div className="flex items-center gap-4 mb-4">
                <button
                    onClick={() => refetch()}
                    title="به روز رسانی"
                    className="flex items-center p-2 rounded border hover:bg-gray-100"
                    disabled={isFetching}
                >
                    <TfiReload className={`transition-transform ${isFetching ? "animate-spin" : ""}`}/>
                    <span className="ml-2">Refresh</span>
                </button>
                <ReportFilters data={data} setData={setData}/>
            </div>

            {/* Table Data */}
            <ShowTableData data={queryResultData}/>
        </div>
    );
};

export default BankData;
