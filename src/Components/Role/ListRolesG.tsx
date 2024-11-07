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


function ListRoles() {


    const CheckboxRenderer = (params) => {
        const handleCheckboxClick = (e) => {
            e.stopPropagation();

            // Additional logic
        };

        try {
            return (
                <input
                    type="checkbox"
                    checked={params.value}
                    onClick={handleCheckboxClick}
                />
            );
        } catch (error) {
            return <>{error.toString()}</>
        }
    };


    const [isLoading, setIsLoading] = useState(true)
    const [reload, setReload] = useState(1)


    const navigateTo = useNavigate()
    const editButtonHandler = (params) => {

        const data = params.data
        navigateTo(PAGES.ROLE_ADD_EDIT, {state: {data}})
    }

    const myAxiosPrivate = useAxiosPrivate()

    const handleDeleteUser = async (id: any) => {
        const url = 'role/delete/' + id

        try {
            const response = await myAxiosPrivate.delete(url)
            if (response?.data) {

                toast.success(response?.data?.message)
                setReload(ps => ps + 1)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const deleteButtonHandler = async (params) => {

        const data = params.data;

        const message = `آیا مطمئنی که میخوای نقش با شماره
        ${data?.phoneNumber}
        به صورت کامل برای همیشه از لیست نقش ها حذف کنی؟
        `
        const confirmResult1 = confirm(message)
        if (confirmResult1) {
            const message = ` برای بار دوم  عرض میکنم.  این فرآیند قابل برگشت نیست.
            آیا مطمئنی که میخوای نقش با شماره
        ${data?.phoneNumber}
        به صورت کامل برای همیشه از لیست نقش ها حذف کنی؟
        `
            const confirmResult2 = confirm(message)
            if (confirmResult2) {

                await handleDeleteUser(data.id)
            }
        }
    }

    const myColumnDefs = [
        // Add the new column with icon and click handler
        {
            headerName: "عملیات", cellRenderer: (params) => (
                <div className={'flex flex-wrap gap-1 items-center justify-center'}>
                    <button
                        onClick={() => editButtonHandler(params)}
                    >
                        <EditButton/>
                    </button>
                    <button
                        onClick={() => deleteButtonHandler(params)}

                        className={'text-red-600'}>

                        <DeleteButton/>
                    </button>
                </div>
            ),
            cellStyle: () => ({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }),
        },
        /////////////////////
        {headerName: "شماره تماس", field: "phoneNumber", minWidth: 150, hide: false},
        {headerName: "نام", field: "name", minWidth: 150, hide: false},
        {headerName: "دسترسی به مخاطبین", field: "addContactAccess", hide: false, cellRenderer: CheckboxRenderer},
        {
            headerName: "ویرایش مخاطبین",
            field: "editContactAccess",
            minWidth: 150,
            hide: false,
            cellRenderer: CheckboxRenderer
        },
        {headerName: "حذف مخاطبین", field: "deleteContactAccess", hide: false, cellRenderer: CheckboxRenderer},
        {headerName: "مشاهده مخاطبین", field: "listAllContactAccess", hide: false, cellRenderer: CheckboxRenderer},
        {headerName: "مشاهده مخاطبین خودش", field: "listOwnContactAccess", hide: false, cellRenderer: CheckboxRenderer},
        {
            headerName: "خروجی گرفتن از مخاطبین",
            field: "exportContactAccess",
            hide: false,
            cellRenderer: CheckboxRenderer
        },
        {headerName: "افزودن نقش", field: "addUserAccess", hide: false, cellRenderer: CheckboxRenderer},
        {headerName: "حذف نقش", field: "deleteUserAccess", hide: false, cellRenderer: CheckboxRenderer},
        {headerName: "ویرایش نقش", field: "editUserAccess", hide: false, cellRenderer: CheckboxRenderer},
        {headerName: "مشاهده لیست نقش", field: "listUserAccess", hide: false, cellRenderer: CheckboxRenderer},
    ]

    const [myTableData, setMyTableData] = useState({

        columnDefs: [],
        rowData: []
    });

    const addCustomColumn = (myHeaderArray: HeaderItem[]) => {
        const headerArray = [...myHeaderArray];

        headerArray.unshift({
            headerName: "عملیات", cellRenderer: (params) => (
                <div className={'flex flex-wrap gap-1 items-center justify-center'}>
                    <button
                        onClick={() => editButtonHandler(params)}
                    >
                        <EditButton/>
                    </button>
                    <button
                        onClick={() => deleteButtonHandler(params)}

                        className={'text-red-600'}>

                        <DeleteButton/>
                    </button>
                </div>
            ),
            cellStyle: () => ({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }),
        });


        return headerArray


    }


    useEffect(() => {


        const getList = async () => {
            const res = await myAxiosPrivate.get('role/read')
            if (res.data) {


                const tableData = res.data.list;

                // tableData.columnDefs = addCustomColumn(tableData.columnDefs)

                // mohammad mrm



                setMyTableData(tableData)
                setIsLoading(false)
            }
        }

        // void getList()


    }, [reload]);

    const onCellClicked = (params) => {
        //
    }
    // {
    //     name: "افزودن نقش",
    //     link: PAGES.ROLE_ADD_EDIT,
    //     icon: IoShapes,
    //     showItem: roleAccessList?.includes('rolesCreate'),
    // },
    const {auth} = useAuth();
    const roleAccessList = auth.userInfo?.roleAccessList;
    const showAddButton = roleAccessList?.includes('rolesCreate')
    try {
        return (
            <div>
                {showAddButton && <button
                    onClick={() => navigateTo(PAGES.ROLE_ADD_EDIT)}
                    className={"btn-white-border-mir my-2"}
                >
                    افزودن نقش
                </button>}
                <TableG
                    url={"/role/read"}
                />
            </div>
        );
    } catch (error) {
        return <>{error.toString()}</>
    }
}

export default ListRoles;