import React, {useContext, useState} from 'react';
import ForwardModal from "../../ForwardModal/ForwardModal.tsx";
import {TableGContext} from "../../../TableG/TableGContext.tsx";
import ForwardModalTable from "../../../TableG/FullTable/components/ForwardModalticketTable/ForwardModalTable.tsx";
import {randomNumberGenerator} from "../../../../utils/utilsFunction.tsx";
import ChangeStatusGroup from "./ChangeStatusGroup.tsx";

const ForwardTicketContainer = () => {

    const context = useContext(TableGContext);
    const {myData, setMyData} = context;
    const [isOpen, setIsOpen] = useState(false)
    const closeModal = () => setIsOpen(false)
    const openModal = () => setIsOpen(true)
    const setReload = () => {
        setMyData({reload: randomNumberGenerator()})
    }

    return (
        <div className={"flex gap-1"}>

            <button
                onClick={openModal}
                disabled={myData.checkedItems.length === 0}
                className={"btn-small-show"}
            >
                ارجاع چندتایی
            </button>
            {isOpen && <ForwardModalTable
              closeModal={closeModal}
              currentParams={""}
              selectedItems={myData.checkedItems}
              setReload={setReload}
              title={"اجاع تیکت ها"}


            />}
            <ChangeStatusGroup />
        </div>
    );
};

export default ForwardTicketContainer;
