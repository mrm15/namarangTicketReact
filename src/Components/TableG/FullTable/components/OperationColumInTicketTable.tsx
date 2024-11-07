import React, {useState} from 'react';
import EditButton from "../../../../assets/icons/EditButton.tsx";
import DeleteButton from "../../../../assets/icons/DeleteButton.tsx";
import {PAGES} from "../../../../Pages/Route-string.tsx";
import useAuth from "../../../../hooks/useAuth.tsx";
import {toast} from "react-toastify";
import {randomNumberGenerator} from "../../../../utils/utilsFunction.tsx";
import {FaShareSquare} from "react-icons/fa";
import ForwardModal from "../../../Ticket/ForwardModal/ForwardModal.tsx";
import ForwardModalTable from "./ForwardModalticketTable/ForwardModalTable.tsx";
import useChangeTicketReadStatus from "../../../../hooks/useChangeTicketReadStatus.tsx";
import openTicketActions from "./openTicketActions.tsx";

const OperationColumInTicketTable = ({
                                         row,
                                         url,
                                         navigateTo,
                                         myAxios,
                                         setMyData,
                                         myData,
                                         uniqId,
                                         ticketIdKey,
                                     }) => {

    // اگه کاربر من توی صفحه ی صندوق ورودی خودش بود یا اینکه توی صفحه ی صندوق ورودی دپارتمان بود پس باید بعد از اینکه روی گزینه ی مشاهده کلیک کرد. باید یه تابع رو اجرا کنم.


    const [openForwardModal, setOpenForwardModal] = useState(false)
    const openModal = () => setOpenForwardModal(true)
    const closeModal = () => setOpenForwardModal(false)

    const myUniqId = row?.original[uniqId]
    const myTicketId = row?.original?._id
    const ticketTitle = row?.original?.title


    const {auth} = useAuth();
    const hasAccessToDelete = auth?.userInfo?.roleAccessList?.includes('ticketDelete')
    const hasAccessToForward = auth?.userInfo?.roleAccessList?.includes('forwardTickets')
    //console.log(row,url,navigateTo,myAxios,setMyData,myData)
    const changeReadStatus = useChangeTicketReadStatus()
    const openTicketHandler = async () => {

        await openTicketActions({row, changeReadStatus})
        navigateTo(PAGES.ticket_chat_list, {state: {id: myTicketId}})
    }

    const deleteRequest = "/ticket/delete/";
    const handleDeleteTicket = async (id: any) => {
        const url = `${deleteRequest}${id}`

        try {
            const response = await myAxios.delete(url)
            if (response?.data) {

                toast.success(response?.data?.message)
                setMyData({reload: randomNumberGenerator()})
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deleteButtonHandler = async () => {


        const message = `آیا مطمئنی که میخوای سفارش  با نام
        ${ticketTitle}
        به صورت کامل برای همیشه از لیست سفارش  ها حذف کنی؟
        `
        const confirmResult1 = confirm(message)
        if (confirmResult1) {
            const message = ` برای بار دوم  عرض میکنم.  این فرآیند قابل برگشت نیست.
            آیا مطمئنی که میخوای سفارش  با نام
        ${ticketTitle}
        به صورت کامل برای همیشه از لیست سفارش  ها حذف کنی؟
        `
            const confirmResult2 = confirm(message)
            if (confirmResult2) {
                await handleDeleteTicket(myUniqId)
            }
        }
    }


    try {
        return (<>
                {openForwardModal &&
                  <>

                    <ForwardModalTable
                        // currentParams={currentParams}
                      selectedItems={[row?.original]}
                      closeModal={closeModal}
                      title={'ارجاع تیکت'}
                      setReload={() => setMyData({reload: randomNumberGenerator()})}
                    />
                  </>
                }
                <div className={"flex "}>
                    <div className={'flex gap-1 items-center justify-center'}>
                        <button
                            onClick={openTicketHandler}
                            className={'btn-white-border-mir'}
                        >مشاهده
                        </button>
                        {/*{auth.userInfo?.roleAccessList?.includes('ticketDelete') &&*/}

                        {hasAccessToDelete &&< button
                            onClick={deleteButtonHandler}

                            className={'text-red-600'}>

                            <DeleteButton/>
                            </button>}
                        {/*}*/}
                    </div>
                    {hasAccessToForward && <div>
                        <button
                            onClick={() => {
                                // setCurrentParams(params)
                                // console.log(params)
                                openModal()
                            }}
                            className={'mx-1 flex items-center gap-1 p-2 justify-center border border-1 rounded '}
                        >
                            <FaShareSquare/>
                            {/*<span>ارجاع به کاربر</span>*/}
                        </button>
                    </div>}
                </div>
            </>
        )
    } catch (error) {
        return <>{error?.toString()}</>
    }
};

export default OperationColumInTicketTable;
