import React from 'react';
import {useNavigate} from "react-router-dom";

import {toast} from "react-toastify";
import {ROLES} from "../../../../Pages/ROLES.tsx";
import {PAGES} from "../../../../Pages/Route-string.tsx";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate.tsx";
import {deleteBill, getBillData} from "../../../../config/api.tsx";
import useAuth from "../../../../hooks/useAuth.tsx";
import {AiOutlineEye} from "react-icons/ai";
import {FaCamera} from "react-icons/fa";
import {IoCopy} from "react-icons/io5";
import {BASE_URL} from "../../../../api/axios.tsx";

const BillDataButtonInChatList = ({billData, setReload}) => {

    const {billNumber, billStatus, id, type} = billData;
    const navigateTo = useNavigate()
    // کاربر در صورتی میتونه فاکتور ویرایش کنه اولا دسترسی به این بخش داشته باشه و دوما  این چت لیست هیچ فاکتور تاییده شده ای نداشته باشه
    const {auth} = useAuth();
    const roleAccessList = auth.userInfo?.roleAccessList;
    const accessToEditBill = roleAccessList.includes(ROLES.editBillInChatList[0])
    const accessToDeleteBill = roleAccessList.includes(ROLES.deleteBill[0])
    const accessToScreenshot = roleAccessList.includes(ROLES.screenShotBills[0])

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
                if (res.status === 200) {
                    toast.success(res.data?.message)
                    // setReload({value: randomNumberGenerator()})
                }
            }
        }
    }

    const getBillInvoiceToShot = async (billNumberHere: number) => {

        // اینجا میریم و اطلاعات فاکتور رو میگیرم که بفرستیم واسه شات
        let tId;

        try {
            tId = toast.loading("در حال دریافت اطلاعات اسکرین شات...")
            const result = await myAxios.get(getBillData + billNumberHere);

            if (result.status === 200) {
                navigateTo(PAGES.screenshot, {state: {data: {bill: result?.data?.data}}})
            } else {
                toast.error(result?.data?.message)
            }

        } catch (error) {
            toast.error(error.toString)
        } finally {
            toast.dismiss(tId)
        }

    }

    const billUrl = PAGES.showBill + "/" + billNumber;

    const copyBillUrl = async () => {
        const siteUrl = window.location.origin; // دریافت دامنه سایت
        try {
            await window.navigator.clipboard.writeText(siteUrl  +billUrl)
            toast.success("لینک فاکتور کپی شد")
        } catch (error) {
            toast.error(error?.toString)
        }

    }
    return (
        <div className={'mt-3 flex flex-wrap gap-2'}>
            <div onClick={copyBillUrl}
            className={"cursor-pointer"}
            >
                <IoCopy size={24}/>
            </div>
            <button
                className={` flex items-center rounded outline outline-white px-2 py-2 ${billStatus === 1 ? 'bg-green-400' : 'bg-red-300'}`}
                onClick={() => {
                    // navigateTo(url, { replace: true }); // Optional: use `navigate` for URL building
                    window.open(billUrl, '_blank', 'noopener,noreferrer');
                }}
            >
                <div>مشاهده فاکتور :</div>
                <div>{billStatus === 0 ? <> پیش نویس</> : (billStatus === 1 ? <>تایید شده</> : <></>)}</div>
                <div><AiOutlineEye size={25}/></div>
            </button>
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
            {accessToScreenshot && billStatus === 1 &&
              <button
                onClick={() => getBillInvoiceToShot(billNumber)}
                className={'bg-green-400 text-white rounded p-2 items-center border-green-800  flex gap-1'}
              >
                <div><FaCamera size={20}/></div>
                <div>
                  اسکرین شات فاکتور
                </div>
                <small className={''}>{billNumber}</small>
              </button>}

        </div>
    );
};

export default BillDataButtonInChatList;
