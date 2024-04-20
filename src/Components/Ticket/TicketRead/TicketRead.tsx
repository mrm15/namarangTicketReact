import {PAGES} from "../../../Pages/Route-string";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import {toast} from "react-toastify";
import EditButton from "../../../assets/icons/EditButton";
import DeleteButton from "../../../assets/icons/DeleteButton";
import Loader from "../../Loader";
import AggridDataShow from "../../AgGridDataShow/AgGridDataShow";
import useAuth from "../../../hooks/useAuth.tsx";
import {FaArrowRight, FaShareSquare} from "react-icons/fa";
import ForwardModal from "../ForwardModal/ForwardModal.tsx";
import {useQuery} from "@tanstack/react-query";


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
    readMyInboxTickets: 'صندوق ورودی من',
    readMyAllTickets: 'همه ی تیکت های من',
    readDepartmentTickets: 'تیکت های دپارتمان',
}

export function TicketRead({view}) {


    const requestUrl = `ticket/${view}`
    const navigateEditPage = PAGES.ticket_chat_list;
    const deleteRequest = 'status/delete/'
    // @ts-ignore
    const {auth} = useAuth();

    const isEnableForwarding = auth.userInfo.roleAccessList.includes('forwardTickets')

    const [currentParams, setCurrentParams] = useState({})
    const [openForwardToUserModal, setOpenForwardToUserModal] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [reload, setReload] = useState(1)
    const [myTableData, setMyTableData] = useState({
        columnDefs: [],
        rowData: []
    });
    const [selectedItems, setSelectedItems] = useState([]);


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




    const onCellClicked = (params) => {
        console.log(params)
    }


    const addCustomColumn = (myHeaderArray: []) => {

        const headerArray: any = [...myHeaderArray]
        // بعدا میگم اگه  کاربر دسترسی به  ارجارع به کاربر داشت اینو ادد کن
        const small = 11
        const result = small === 11
        if (result) {
            headerArray.unshift({
                floatingFilter: false,
                minWidth: 250,
                headerName: "ارجاع به کاربر", cellRenderer: (params) => (
                    <div className={''}>
                        <button
                            onClick={() => {
                                setCurrentParams(params)
                                console.log(params)
                                setOpenForwardToUserModal(true)
                            }}
                            className={'mx-1 flex items-center gap-1 items-center justify-center'}
                        ><FaShareSquare/>
                            <span>ارجاع به کاربر</span>
                        </button>


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
        }

        // بعدا میگم اگه اینجا صندوق ورودی بود و کاربر دسترسی به  ارجارع به کاربر داشت اینو ادد کن


        headerArray.unshift({
            floatingFilter: false,
            headerName: "عملیات", cellRenderer: (params) => (
                <div className={'flex gap-1 items-center justify-center'}>
                    <button
                        onClick={() => openTicketHandler(params)}
                        className={'btn-into-aggrid'}
                    >مشاهده
                    </button>
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


        // headerArray.unshift({
        //     headerName: "انتخاب همه",
        //     field: "headerCheckbox",
        //
        //     // cellRenderer: 'agCheckboxCellRenderer',
        //     // cellEditor: 'agCheckboxCellEditor',
        //     // checkboxSelection: true,
        //     // headerCheckboxSelection: true,
        //     // headerCheckboxSelectionFilteredOnly: true,
        //     minWidth: 150,
        //     checkboxSelection: true,
        //     headerCheckboxSelection: true,
        //     floatingFilter: false,
        // });


        const AllCheckboxRenderer = () => {
            const handleCheckboxChange = (e) => {
                const isChecked = e.target.checked;
                const allIds = myTableData.rowData.map(row => row.id);
                setSelectedItems(isChecked ? allIds : []);
            };

            return (
                <>
                    <input
                        type="checkbox"
                        checked={selectedItems.length === myTableData.rowData.length}
                        onChange={handleCheckboxChange}
                    /></>
            );
        };

        const selectAll = {
            floatingFilter: false,
            headerName: "انتخاب همه",
            field: "selectAll",
            headerCheckboxSelection: true,
            checkboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            headerComponentFramework: AllCheckboxRenderer,
            minWidth: 150,
        }

        headerArray.unshift(selectAll)

        const styleFunction = () => ({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            direction: 'ltr'
        })
        // Define the type for the style function
        type StyleFunction = (params: any) => any;

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

    const queryFn = () => {
        return myAxiosPrivate.get('/forward/getConfig/')
    }

    const query = useQuery({
        queryKey: ['forwardConfig'],
        queryFn,

        staleTime: 86400000,  // === 60*60*24*1000
        enabled: isEnableForwarding,
    })


    useEffect(() => {


        const getList = async () => {

            const res = await myAxiosPrivate.get(requestUrl)
            if (res.data) {


                const tableData = res.data.list;

                if (isEnableForwarding) {
                    tableData.columnDefs = addCustomColumn(tableData.columnDefs);
                }


                // mohammad mrm


                console.log(res.data)
                setMyTableData(tableData)
                setIsLoading(false)
            }
        }

        void getList()


    }, [reload]);


    const [myGridRefState, setMyGridRefState] = useState<MyStateType>()

    const handleOnSelectionChanged = (params) => {
        const selectedRows = params.api.getSelectedRows();
        console.log("Selected Rows:", selectedRows);
        setSelectedItems(selectedRows)
        console.log("selectedItems")
        console.log(selectedItems)

    }


    try {
        return (
            <div>
                {openForwardToUserModal && <ForwardModal
                  currentParams={currentParams}
                  selectedItems={selectedItems}
                  closeModal={() => setOpenForwardToUserModal(false)}
                  title={'ارجاع تیکت'}
                  setReload={setReload}

                />}
                <div className={'font-bold my-3 '}>
                    <div
                        className={'bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3'}
                    >
                        <div> {title[view]}</div>
                        <div
                            className={'flex flex-wrap justify-center items-center mx-2'}
                        >
                        </div>
                    </div>
                </div>


                {isLoading ? <Loader/> :
                    <div>
                        <button
                            className={'btn-submit-mir'}
                            onClick={() => {
                                if (selectedItems.length === 0) {
                                    toast('حداقل یک مورد را انتخاب کنید')
                                    return
                                }
                                setOpenForwardToUserModal(true)
                            }}


                        > ارجاع چندتایی
                        </button>
                        <br/>
                        <AggridDataShow
                            setMyGridRefState={setMyGridRefState}
                            columnDefs={myTableData.columnDefs}
                            rowData={myTableData.rowData}
                            // onCellClicked={onCellClicked}
                            onSelectionChanged={handleOnSelectionChanged}
                        />
                    </div>}
            </div>
        );
    } catch (error) {
        return <>{error.toString()}</>
    }
}