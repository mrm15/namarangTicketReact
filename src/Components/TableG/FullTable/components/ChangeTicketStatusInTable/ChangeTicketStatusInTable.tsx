import React, {useState} from 'react';
import ForwardModalTable from "../ForwardModalticketTable/ForwardModalTable.tsx";
import {randomNumberGenerator} from "../../../../../utils/utilsFunction.tsx";
import {FiCheckSquare} from "react-icons/fi";

const ChangeTicketStatusInTable = ({row,setMyData}) => {


    const [openForwardModal, setOpenForwardModal] = useState(false)
    const openModal = () => setOpenForwardModal(true)
    const closeModal = () => setOpenForwardModal(false)
    return (
        <div>
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

                {/*<span>ارجاع به کاربر</span>*/}
            </button>
        </div>
    );
}

export default ChangeTicketStatusInTable;

