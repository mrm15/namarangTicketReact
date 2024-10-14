import {userListTableColumns} from "./userListTableColumns";
import {toast} from "react-toastify";
import {roleListTableColumns} from "./roleListTableColumns.tsx";
import {departmentListTableColumns} from "./departmentListTableColumns.tsx";
import {FullBillData} from "./BasteBandiErsal/FullBillData.tsx";
import {ticketlistColumns} from "./ticketlistColumns/ticketlistColumns.tsx";
import {ticketAssignmentListColumns} from "./ticketAssignmentListColumns/ticketAssignmentListColumns.tsx";

// Define the interface for the input object
export interface IInputObject {
    url: string;
    auth:any;
    navigateTo: any; // Replace 'any' with the actual type if known
    myAxios:any;
    setMyData:any
    myData:any
}

// Update the mapping of URLs to functions that accept IInputObject
const tableColumns: { [key: string]: (inputObject: IInputObject) => any } = {
    "/user/read": userListTableColumns,
    "/role/read": roleListTableColumns,
    "/department/read": departmentListTableColumns,
    "/hesabfa/getBillListData": FullBillData,

    "/ticket/readSentTickets": ticketlistColumns, //ارسالی ها
    "/ticket/read": ticketlistColumns, // همه ی تیکت ها
    // "/ticket/readDepartmentTickets": ticketAssignmentListColumns, // تیکت های دپارتمان
    "/ticket/readMyForwardedTickets": ticketAssignmentListColumns, // تیکت هایی که من فوروارد کردم.
    // "/ticket/readForwardedToMeTickets": ticketlistColumns, // تیکت هایی که ب من فورارد شده
    "/ticket/readAllAssignments": ticketAssignmentListColumns, // کل تیکتا های فروارد شده


}

// Function to find table columns based on the input object
export const findTableColumns = (inputObject: IInputObject) => {
    const {url, navigateTo} = inputObject;
    console.log("////////////////////////////////////////////////////")
    console.log(url)
    // Get the function from tableColumns
    const getColumns = tableColumns[url];
    // Return the result of calling the function with inputObject
    if (getColumns) {
        return getColumns(inputObject);
    } else {
        console.error(`واسه این آدرس ستون تعریف نشده هنوز!: ${url}`);
        toast.error("ستون های این جدول یافت نشد")
        return [];
    }
};
