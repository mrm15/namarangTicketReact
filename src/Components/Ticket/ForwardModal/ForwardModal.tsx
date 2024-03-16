import Modal from "../../Modal/Modal.tsx";
import "./style.scss"
import SelectedTicketsInModal from "./SelectedTicketsInModal.tsx";
import DepartmentList from "./DepartmentList.tsx";
import UserList from "./UserList.tsx";

function ForwardModal({currentParams, selectedItems, ...rest}) {
    console.log(currentParams);



    return (
        <div>
            <Modal {...rest}>
                <SelectedTicketsInModal
                    selectedItems={selectedItems}
                />

                <div className={' flex gap-2'}>
                    <div className={'w-full'}>
                        <div>انتخاب دپارتمان</div>
                        <DepartmentList /></div>
                    <div className={'w-full'}>
                       <div> انتخاب کاربر</div>
                        <DepartmentList/></div>
                </div>


            </Modal>
        </div>
    );
}

export default ForwardModal;