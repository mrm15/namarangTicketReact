import React, {useState} from 'react';
import ForwardModalTable from "../../../TableG/FullTable/components/ForwardModalticketTable/ForwardModalTable.tsx";
import {randomNumberGenerator} from "../../../../utils/utilsFunction.tsx";
import {FaShareSquare} from "react-icons/fa";
import useAuth from "../../../../hooks/useAuth.tsx";
import ChangeTicketStatusModal
    from "../../../TableG/FullTable/components/ChangeTicketStatusModal/ChangeTicketStatusModal.tsx";
import {FiCheckSquare} from "react-icons/fi";

const ChangeTicketStatusInChatList = ({data, setData}) => {
    console.log(data)
    const {auth} = useAuth()
    const hasAccessToForward = auth?.userInfo?.roleAccessList?.includes('forwardTickets')
    const [openModal, setOpenModal] = useState(false)

    const openModalPlease = () => setOpenModal(true)
    const closeModalPlease = () => setOpenModal(false)
    if (!hasAccessToForward) {
        return null
    }

    const selectedItems = [{
        _id: data.ticketId,
        title: data.title,
        ticketNumber: data.ticketNumber,
    }]
    return (
        <>
            <div title={"تغییر وضعیت سفارش"}
                 onClick={openModalPlease}
            >
                <FiCheckSquare size={"24"}/>
            </div>
            {openModal &&
              <ChangeTicketStatusModal
                closeModal={closeModalPlease}
                currentParams={""}
                selectedItems={selectedItems}
                setReload={() => {
                    setData({reload: randomNumberGenerator()})
                }}
                title={"تغییر وضعیت گروهی"}
              />
            }
        </>
    );
};

export default ChangeTicketStatusInChatList;
