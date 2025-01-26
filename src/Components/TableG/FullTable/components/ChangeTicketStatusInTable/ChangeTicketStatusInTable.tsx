import React, {useState} from 'react';
import ForwardModalTable from "../ForwardModalticketTable/ForwardModalTable.tsx";
import {randomNumberGenerator} from "../../../../../utils/utilsFunction.tsx";
import {FiCheckSquare} from "react-icons/fi";
import ChangeTicketStatusModal from "../ChangeTicketStatusModal/ChangeTicketStatusModal.tsx";

const ChangeTicketStatusInTable = ({row,setMyData}) => {


    const [openForwardModal, setOpenForwardModal] = useState(false)
    const openModal = () => setOpenForwardModal(true)
    const closeModal = () => setOpenForwardModal(false)
    return (
        <div>
            {openForwardModal &&
              <>
                <ChangeTicketStatusModal
                    // currentParams={currentParams}
                  selectedItems={[row?.original]}
                  closeModal={closeModal}
                  title={'ارجاع تیکت'}
                  setReload={() => setMyData({reload: randomNumberGenerator() , checkedItems:[]})}
                />
              </>
            }
            <button
                onClick={() => {
                    // setCurrentParams(params)
                    // console.log(params)
                    openModal()
                }}
                className={'mx-1 flex items-center gap-1 p-2 justify-center border border-1 rounded '}
                title={"تغییر وضعیت"}
            >
                <FiCheckSquare />
            </button>
        </div>
    );
}

export default ChangeTicketStatusInTable;

