import React, {useState} from 'react';
import {FaShareSquare} from "react-icons/fa";
import ForwardModalTable from "../ForwardModalticketTable/ForwardModalTable.tsx";
import {randomNumberGenerator} from "../../../../../utils/utilsFunction.tsx";

const ForwardTicketSection = ({row, setMyData}) => {


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
                  setReload={() => setMyData({reload: randomNumberGenerator(),checkedItems:[]})}
                />
              </>
            }
            <button
                onClick={() => {
                    // setCurrentParams(params)
                    // console.log(params)
                    openModal()
                }}
                title={"ارجاع سفارش"}

                className={'mx-1 flex items-center gap-1 p-2 justify-center border border-1 rounded '}
            >
                <FaShareSquare/>
                {/*<span>ارجاع به کاربر</span>*/}
            </button>
        </div>
    );
};

export default ForwardTicketSection;