import { useState} from "react";
import {useNavigate} from "react-router-dom";
import {PAGES} from "../../Pages/Route-string.tsx";
import TableG from "../TableG/TableG";
import useAuth from "../../hooks/useAuth.tsx";
import {IoPersonAddSharp} from "react-icons/io5";
import {ROLES} from "../../Pages/ROLES";
import {FaHashtag} from "react-icons/fa6";

interface ColumnDef {
    headerName: string;
    field: string;
    minWidth?: number;
    hide?: boolean;
    cellRenderer?: (params: any) => JSX.Element;
}


function ListMessageTagG() {


    const [isLoading, setIsLoading] = useState(true)
    const [reload, setReload] = useState(1)
    const navigateTo = useNavigate()
    const {auth} = useAuth();
    const roleAccessList = auth.userInfo?.roleAccessList;
    const showAddButton = roleAccessList?.includes(ROLES.messageTagCollection[0])

    try {
        return (
            <div>
                {showAddButton && <button
                    onClick={() => navigateTo(PAGES.messageTag_add_edit)}
                    className={"btn-white-border-mir my-2"}
                >
                   <div className={"flex gap-2 items-center"}>
                       <FaHashtag size={20} />
                       <span> افزودن تگ پیام</span>
                   </div>
                </button>}
                <TableG
                    url={"/messageTag/read"}
                />
            </div>
        );
    } catch (error) {
        return <>{error.toString()}</>
    }
}

export default ListMessageTagG;