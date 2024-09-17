import React, {useState} from 'react';
import Modal from "../../../../Modal/Modal.tsx";
import { deleteBillFromHesabfa} from "../../../../../config/api.tsx";
import useAuth from "../../../../../hooks/useAuth.tsx";
import {ROLES} from "../../../../../Pages/ROLES.tsx";
import {toast} from "react-toastify";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate.tsx";
import {randomNumberGenerator} from "../../../../../utils/utilsFunction.tsx";

const DeleteBill = ({
                        setMyData,
                        billNumber,
                        info,
                    }) => {

    const {auth} = useAuth();

    const myAxios = useAxiosPrivate()

    const roleAccessList = auth.userInfo?.roleAccessList;
    // const accessToEditBill = roleAccessList.includes(ROLES.editBillInChatList[0])
    const accessToDeleteBill = roleAccessList.includes(ROLES.deleteBill[0])


    const [isOpenModal, setIsOpenModal] = useState(false);
    const closeModal = () => setIsOpenModal(false);
    const openModal = () => setIsOpenModal(true);

    const orderName = info?.row?.original?.ContactTitle;

    const deleteBillHandler = async () => {
        if (!accessToDeleteBill) {
            toast.error("برای حذف فاکتور باید دسترسی حذف فاکتور در چت لیست را داشته باشید.")
            return
        }


        const result = await myAxios.get(deleteBillFromHesabfa + billNumber);

        if (result.status === 200) {
            toast.success(result.data.message)
            closeModal()
            setTimeout(()=>{
                setMyData({reload: randomNumberGenerator()})
            },500)
        }


    }
    return (
        <div>
            {isOpenModal && <Modal
              showButtons={false}
              closeModal={closeModal}
              title={"حذف فاکتور"}
                // onSubmit={submitAddGroupKala}
            >
              <div className={"px-2 py-2 rounded text-white bg-red-500"}>
                با این کار فاکتور از توی حسابفا هم حذف میشه و این عمل قابل بازگشت نیست!
              </div>
              <br/>
              <div className={"border border-red-400 p-2 rounded "}>
                مطمئنی که میخوای فاکتور شماره
                <>
                  &nbsp;&nbsp;
                  <b>
                      {billNumber}
                  </b>
                  &nbsp;&nbsp;
                </>
                با نام
                <>
                  &nbsp;&nbsp;
                  <b>
                      {orderName}
                  </b>
                  &nbsp;&nbsp;
                </>
                رو حذف کنی؟
                <br/>
              </div>

              <br/>
              <div className={"w-full flex justify-center gap-1"}>
                <button className={"btn-submit-mir "} onClick={deleteBillHandler}> حذفش کن</button>
                <button className={"btn-white-border-mir"} onClick={closeModal}> انصراف</button>
              </div>


            </Modal>}

            <div
                onClick={openModal}
                className={"btn-small-delete"}
            >
                حذف
            </div>

        </div>
    );
};

export default DeleteBill;
