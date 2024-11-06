import React from 'react';
import {useNavigate} from "react-router-dom";

import {toast} from "react-toastify";
import {ROLES} from "../../../../Pages/ROLES.tsx";
import {PAGES} from "../../../../Pages/Route-string.tsx";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate.tsx";
import {deleteBill} from "../../../../config/api.tsx";
import useAuth from "../../../../hooks/useAuth.tsx";

const BillDataButtonInChatList = ({billData,setReload}) => {

    const {billNumber, billStatus, id, type} = billData;
    const navigateTo = useNavigate()
    // کاربر در صورتی میتونه فاکتور ویرایش کنه اولا دسترسی به این بخش داشته باشه و دوما  این چت لیست هیچ فاکتور تاییده شده ای نداشته باشه
    const {auth} = useAuth();
    const roleAccessList = auth.userInfo?.roleAccessList;
    const accessToEditBill = roleAccessList.includes(ROLES.editBillInChatList[0])
    const accessToDeleteBill = roleAccessList.includes(ROLES.deleteBill[0])

    const editHandler = () => {

        navigateTo(PAGES.submit_bill, {
            state: {
                data: {
                    ticketNumber: billData.ticketNumber,
                    billType: billData?.type,
                    id: billData.id,
                    billNumber,
                    ticketId: billData.ticketId,
                    backUrl: PAGES.ticket_created_by_me,
                }
            }
        })
    }
    const myAxios = useAxiosPrivate()
    const deleteHandler = async () => {
        const isItOk1 = confirm("از حذف این فاکتور مطمئنی؟");
        if (isItOk1) {
            const isItOk2 = confirm(`از حذف   فاکتور  ${billNumber}  مطمئنی؟`);
            if (isItOk2) {
                const res = await myAxios.get(deleteBill + billNumber + "/" + type + "/" + id)
                if (res.status===200) {
                    toast.success(res.data?.message)
                    // setReload({value: randomNumberGenerator()})
                }
            }
        }
    }

    return (
        <div className={'mt-3 flex flex-wrap gap-2'}>
            <a
                href={PAGES.showBill + "/" + billNumber}
                target={'_blank'}
                className={`badge-bg-blue-text-white ${billStatus === 1 ? 'bg-emerald-800' : ''}`}
            >
                <>مشاهده فاکتور :</>
                <>{billStatus === 0 ? <> پیش نویس</> : (billStatus === 1 ? <>تایید شده</> : <></>)}</>
            </a>
            {accessToEditBill && <button
              className={'bg-white hover:bg-gray-100 text-gray-800  py-2 px-4 border border-gray-400 rounded shadow'}
              onClick={editHandler}
            > &nbsp;
              ویرایش فاکتور
              <small className={""}>{billNumber}</small>
            </button>}
            {accessToDeleteBill && <button
              className={'badge-bg-red-text-red'}
              onClick={deleteHandler}
            > &nbsp;
              حذف فاکتور
              <small className={''}>{billNumber}</small>
            </button>}

        </div>
    );
};

export default BillDataButtonInChatList;
