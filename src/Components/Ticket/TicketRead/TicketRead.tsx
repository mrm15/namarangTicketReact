import {PAGES} from "../../../Pages/Route-string";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import {toast} from "react-toastify";
import EditButton from "../../../assets/icons/EditButton";
import DeleteButton from "../../../assets/icons/DeleteButton";
import Loader from "../../Loader";
import AggridDataShow from "../../AgGridDataShow/AgGridDataShow";
import useAuth from "../../../hooks/useAuth.tsx";
import {object} from "yup";

interface ColumnDefinition {
    minWidth: number;
    headerName: string;
    field: string;
    cellStyle?: (params: any) => any; // Define cellStyle as an optional function
}

export function TicketRead() {
    const requestUrl = 'ticket/read'
    const navigateEditPage = PAGES.ticket_chat_list;
    const deleteRequest = 'status/delete/'

    const CheckboxRenderer = (params) => {
        const handleCheckboxClick = (e) => {
            e.stopPropagation();
            console.log("Checkbox clicked:", params.data);
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
    const openTicketHandler = (params) => {

        const data = params.data;
        navigateTo(navigateEditPage, {state: {id: data?._id}})
    }

    const myAxiosPrivate = useAxiosPrivate()

    const handleDeleteUser = async (id: any) => {
        const url = `${deleteRequest}${id}`

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

        const data = params?.data;


        const message = `آیا مطمئنی که میخوای سفارش  با نام
        ${data?.name}
        به صورت کامل برای همیشه از لیست سفارش  ها حذف کنی؟
        `
        const confirmResult1 = confirm(message)
        if (confirmResult1) {
            const message = ` برای بار دوم  عرض میکنم.  این فرآیند قابل برگشت نیست.
            آیا مطمئنی که میخوای سفارش  با نام
        ${data?.name}
        به صورت کامل برای همیشه از لیست سفارش  ها حذف کنی؟
        `
            const confirmResult2 = confirm(message)
            if (confirmResult2) {

                await handleDeleteUser(data.id)
            }
        }
    }


    const [myTableData, setMyTableData] = useState({

        columnDefs: [],
        rowData: []
    });
    // @ts-ignore
    const {auth} = useAuth();

    const addCustomColumn = (myHeaderArray: []) => {

        const headerArray = [...myHeaderArray]

        // @ts-ignore
        headerArray.unshift({
            headerName: "عملیات", cellRenderer: (params) => (
                <div className={'flex gap-1 items-center justify-center'}>
                    <button
                        onClick={() => openTicketHandler(params)}
                        className={'btn-into-aggrid'}
                    >مشاهده</button>
                    {auth.userInfo?.roleAccessList?.includes('ticketDelete') &&

                      <button
                        onClick={() => deleteButtonHandler(params)}

                        className={'text-red-600'}>

                        <DeleteButton/>
                      </button>
                    }
                </div>
            ),
            cellStyle: () => ({
                 // minWidth:'300px',
                 // maxWidth:'300px',
                 // width:'300px',
                // display: 'flex',
                // alignItems: 'center',
                // justifyContent: 'center',
            }),
        });

        const styleFunction = () => ({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            direction: 'ltr'
        })


// Define the type for the style function
        type StyleFunction = (params: any) => any;

// Assuming styleFunction is a function that accepts params and returns a style object

// Map over headerArray and apply cellStyle to specific columns
        const headerArray1: ColumnDefinition[] = headerArray.map((r: ColumnDefinition) => {
            const row: ColumnDefinition = {...r}; // Shallow copy of the original object

            // Check if the field is 'dateCreate' or 'lastChangeDate'
            if (row.field === 'dateCreate' || row.field === 'lastChangeDate') {
                // Assign the styleFunction to the cellStyle property
                row.cellStyle = styleFunction as StyleFunction; // Assert styleFunction to StyleFunction type
            }

            return row;
        });

        return headerArray1
    }


    useEffect(() => {


        const getList = async () => {
            const res = await myAxiosPrivate.get(requestUrl)
            if (res.data) {


                const tableData = res.data.list;

                tableData.columnDefs = addCustomColumn(tableData.columnDefs)


                // mohammad mrm


                console.log(res.data)
                setMyTableData(tableData)
                setIsLoading(false)
            }
        }

        void getList()


    }, [reload]);

    const onCellClicked = (params) => {
        console.log(params.data)
    }
    try {
        return (
            <div>
                <div className={'font-bold my-3 '}>
                    <div
                        className={'bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3'}
                    >
                        <div> لیست سفارش</div>
                        <div
                            className={'flex flex-wrap justify-center items-center mx-2'}
                        >
                        </div>
                    </div>
                </div>


                {isLoading ? <Loader/> :
                    <div>
                        <AggridDataShow
                            columnDefs={myTableData.columnDefs}
                            rowData={myTableData.rowData}
                            // onCellClicked={onCellClicked}
                        />
                    </div>}
            </div>
        );
    } catch (error) {
        return <>{error.toString()}</>
    }
}