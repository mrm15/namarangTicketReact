import {userIsInInboxPageOrInboxDepartmentPage} from "../../../../utils/utilsFunction";
import toast from "react-hot-toast";

const openTicketActions = async ({row, changeReadStatus}) => {
    const data = {
        ticketType: undefined,
        idArray: undefined,
        newStatus: true
    }

    // اول چک میکنیم که آیا توی صفحه های مجاز هستیم که تابع خوادن پیام رو صدا بزنم یا نه
    // بعدش چک میکنیم وضعیت خوانده شدن این پیام چیه؟
    if (userIsInInboxPageOrInboxDepartmentPage()) {
        data.ticketType = "assignment"
        data.idArray = [row.original.ticketAssignedId]
        const currentReadStatus = row.original.readStatus;
        if (currentReadStatus !== true) {
            const tId = toast.loading("در حال بارگزاری...")
            await changeReadStatus(data)
            toast.dismiss(tId)
        }
    }


}
export default openTicketActions