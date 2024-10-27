import {PAGES} from "../../../Pages/Route-string";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import {toast} from "react-toastify";
import DeleteButton from "../../../assets/icons/DeleteButton";
import Loader from "../../Loader";
import AggridDataShow from "../../AgGridDataShow/AgGridDataShow";
import useAuth from "../../../hooks/useAuth.tsx";
import {FaShareSquare} from "react-icons/fa";
import ForwardModal from "../ForwardModal/ForwardModal.tsx";
import {useQuery} from "@tanstack/react-query";
import TableG from "../../TableG/TableG.tsx";
import TopTableComponent from "./TopTableComponent/TopTableComponent.tsx";


interface ColumnDefinition {
    minWidth: number;
    headerName: string;
    field: string;
    cellStyle?: (params: any) => any; // Define cellStyle as an optional function
}

// interface TicketReadProps {
//     view?: string;
//     [key: any]: any;
//
// }

type MyStateType = {
    [key: string]: any;
};

const title = {
    readSentTickets: 'لیست پیام های ارسالی',
    read: 'همه ی تیکت های موجود در سیستم',
    readMyAllTickets: 'همه ی تیکت های من',
    readDepartmentTickets: 'تیکت های دپارتمان',
}

function TicketRead({view}) {
    const {auth} = useAuth();
    const isEnableForwarding = auth.userInfo.roleAccessList.includes('forwardTickets')
    const myAxiosPrivate = useAxiosPrivate()

    const queryFn = () => {
        return myAxiosPrivate.get('/forward/getConfig/')
    }

    // اینو اینجا میگیرم و توی حافظه میمونه تا بعدا موقع باز کردن فروارد مودال استفاده میشه
    const query = useQuery({
        queryKey: ['forwardConfig'],
        queryFn,
        staleTime: 86400000,  // === 60*60*24*1000
        enabled: isEnableForwarding,
    })

    try {

        const boldRowCondition = (row?: any) => {
            return !(row?.original?.readStatus)
            // return false
        }

        return <>
            <TableG
                url={`/ticket/${view}`}
                TopTableComponent={TopTableComponent}
                boldRowCondition={boldRowCondition}
            />
        </>

    } catch (error) {
        return <>{error.toString()}</>
    }
}

export default TicketRead