import AggridDataShow from "../AgGridDataShow/AgGridDataShow.tsx";
import {useEffect, useState} from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.tsx";
import Loader from "../Loader";
import DeleteButton from "../../assets/icons/DeleteButton.tsx";
import EditButton from "../../assets/icons/EditButton.tsx";
import {useNavigate} from "react-router-dom";
import {PAGES} from "../../Pages/Route-string.tsx";
import {toast} from "react-toastify";
import {HeaderItem} from "../../utils/types/types.ts";
import TableG from "../TableG/TableG";
import useAuth from "../../hooks/useAuth.tsx";
import {IoPersonAddSharp} from "react-icons/io5";

interface ColumnDef {
    headerName: string;
    field: string;
    minWidth?: number;
    hide?: boolean;
    cellRenderer?: (params: any) => JSX.Element;
}

interface TableData {
    columnDefs: ColumnDef[];
    rowData: any[];
}


function ListUsers() {


    const [isLoading, setIsLoading] = useState(true)
    const [reload, setReload] = useState(1)
    // {
    //     name: "افزودن کاربر",
    //     link: PAGES.USER_ADD_EDIT,
    //     icon: IoPersonAddSharp,
    //     showItem: roleAccessList?.includes('userCreate'),
    // },
    const navigateTo = useNavigate()
    const {auth} = useAuth();
    const roleAccessList = auth.userInfo?.roleAccessList;
    const showAddButton = roleAccessList?.includes('userCreate')

    try {
        return (
            <div>
                {showAddButton && <button
                    onClick={() => navigateTo(PAGES.USER_ADD_EDIT)}
                    className={"btn-white-border-mir my-2"}
                >
                   <div className={"flex gap-2 items-center"}>
                       <IoPersonAddSharp size={20} />
                       <span> افزودن کاربر</span>
                   </div>
                </button>}
                <TableG
                    url={"/user/read"}
                />
            </div>
        );
    } catch (error) {
        return <>{error.toString()}</>
    }
}

export default ListUsers;