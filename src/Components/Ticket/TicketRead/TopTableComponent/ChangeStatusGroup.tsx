import React, {useContext, useState} from 'react';
import ForwardModalTable from "../../../TableG/FullTable/components/ForwardModalticketTable/ForwardModalTable.tsx";
import {TableGContext} from "../../../TableG/TableGContext.tsx";
import {randomNumberGenerator} from "../../../../utils/utilsFunction.tsx";
import ChangeTicketStatusModal
    from "../../../TableG/FullTable/components/ChangeTicketStatusModal/ChangeTicketStatusModal.tsx";

const ChangeStatusGroup = () => {
    const context = useContext(TableGContext);
    const {myData, setMyData} = context;
    const [isOpen, setIsOpen] = useState(false)
    const closeModal = () => setIsOpen(false)
    const openModal = () => setIsOpen(true)
    const setReload = () => {
        setMyData({reload: randomNumberGenerator()})
    }

    return (
        <>
            <button
                onClick={openModal}
                disabled={myData.checkedItems.length === 0}
                className={"btn-small-show"}
            >
                تغییر وضعیت چندتایی
            </button>
            {isOpen && <ChangeTicketStatusModal
              closeModal={closeModal}
              currentParams={""}
              selectedItems={myData.checkedItems}
              setReload={setReload}
              title={"تغییر وضعیت گروهی"}


            />}
        </>
    );
};

export default ChangeStatusGroup;