import React from 'react';
import {PAGES} from "../../../Pages/Route-string";
import {useNavigate} from "react-router-dom";

const BillDataButtonInChatList = ({billData}) => {
    console.log(billData);
    const {billNumber, billStatus} = billData;
    const navigateTo = useNavigate()
    // کاربر در صورتی میتونه فاکتور ویرایش کنه اولا دسترسی به این بخش داشته باشه و دوما  این چت لیست هیچ فاکتور تاییده شده ای نداشته باشه


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
            <button
                className={'class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'}
                onClick={editHandler}
            > &nbsp;
                ویرایش فاکتور
                <small className={'font-serif'}>{billNumber}</small>
            </button>

        </div>
    );
};

export default BillDataButtonInChatList;
