import {userListTableColumns} from "./userListTableColumns";
import {toast} from "react-toastify";
import {roleListTableColumns} from "./roleListTableColumns.tsx";
import {departmentListTableColumns} from "./departmentListTableColumns.tsx";
import {BasteBandiErsal} from "./BasteBandiErsal.tsx";

// Define the interface for the input object
export interface IInputObject {
    url: string;
    navigateTo: any; // Replace 'any' with the actual type if known
    myAxios:any;
    setMyData:any
}

// Update the mapping of URLs to functions that accept IInputObject
const tableColumns: { [key: string]: (inputObject: IInputObject) => any } = {
    "/user/read": userListTableColumns,
    "/role/read": roleListTableColumns,
    "/department/read": departmentListTableColumns,
    "/hesabfa/getBillListData": BasteBandiErsal,

}

// Function to find table columns based on the input object
export const findTableColumns = (inputObject: IInputObject) => {
    const {url, navigateTo} = inputObject;
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
