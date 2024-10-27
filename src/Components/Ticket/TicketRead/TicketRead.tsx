import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth.tsx";
import {useQuery} from "@tanstack/react-query";
import TableG from "../../TableG/TableG.tsx";
import TopTableComponent from "./TopTableComponent/TopTableComponent.tsx";


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