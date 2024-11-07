import React, {useState} from 'react';
import ForwardModalTable from "../../../TableG/FullTable/components/ForwardModalticketTable/ForwardModalTable.tsx";
import {randomNumberGenerator} from "../../../../utils/utilsFunction.tsx";
import {FaShareSquare} from "react-icons/fa";
import useAuth from "../../../../hooks/useAuth.tsx";

const ForwardTicketFromChatList = ({data}) => {
    const {auth} = useAuth()
    const hasAccessToForward = auth?.userInfo?.roleAccessList?.includes('forwardTickets')
    const [openForwardModal, setOpenForwardModal] = useState(false)

    const openModalPlease = () => setOpenForwardModal(true)
    const closeModalPlease = () => setOpenForwardModal(false)
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
            <div title={"ارجاع سفارش"}
                 onClick={openModalPlease}
            >
                <FaShareSquare size={24}/>

            </div>
            {openForwardModal &&
              <>

                <ForwardModalTable
                  selectedItems={selectedItems}
                  closeModal={closeModalPlease}
                  title={'ارجاع سفارش'}
                  setReload={() => {
                      console.log("reload!!!")
                  }}
                />
              </>
            }
        </>
    );
};

export default ForwardTicketFromChatList;
