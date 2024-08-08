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


    try {
        return (
            <TableG
                url={"/user/read"}
            />
        );
    } catch (error) {
        return <>{error.toString()}</>
    }
}

export default ListUsers;