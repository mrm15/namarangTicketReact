import React from 'react';
import {PAGES} from "../../../Pages/Route-string";
import {useNavigate} from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.tsx";
import {deleteBill} from "../../../config/api.tsx";
import {ROLES} from "../../../Pages/ROLES.tsx";
import useAuth from "../../../hooks/useAuth.tsx";

const BillDataButtonInChatList = ({billData}) => {
    console.log(billData);
    const {billNumber, billStatus, id, type} = billData;
    const navigateTo = useNavigate()
    // کاربر در صورتی میتونه فاکتور ویرایش کنه اولا دسترسی به این بخش داشته باشه و دوما  این چت لیست هیچ فاکتور تاییده شده ای نداشته باشه
// @ts-ignore
    const {auth} = useAuth();
    const roleAccessList = auth.userInfo?.roleAccessList;
    const accessToEditBill = roleAccessList.includes(ROLES.editBillInChatList[0])
    const accessToDeleteBill = roleAccessList.includes(ROLES.deleteBill[0])

    const editHandler = () => {
        console.log(billData);
        navigateTo(PAGES.submit_bill, {
            state: {
                data: {
                    billNumber,
                    backUrl: PAGES.ticket_own_sent,
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
            }
        }
    }

    return (
        <div className={'mt-3 flex flex-wrap gap-2'}>
            <a
                href={PAGES.showBill + "/" + billNumber}
                target={'_blank'}
                className={`bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow ${billStatus === 1 ? 'bg-emerald-800' : ''}`}
            >
                <span>مشاهده فاکتور :</span>
                <span>{billStatus === 0 ? <> پیش نویس</> : (billStatus === 1 ? <>تایید شده</> : <></>)}</span>
            </a>
            {accessToEditBill && <button
              className={'bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'}
              onClick={editHandler}
            > &nbsp;
              ویرایش فاکتور
              <small className={'font-serif'}>{billNumber}</small>
            </button>}
            {accessToDeleteBill && <button
              className={'bg-red-500 hover:bg-red-900 text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow'}
              onClick={deleteHandler}
            > &nbsp;
              حذف فاکتور
              <small className={'font-serif'}>{billNumber}</small>
            </button>}

        </div>
    );
};

export default BillDataButtonInChatList;
