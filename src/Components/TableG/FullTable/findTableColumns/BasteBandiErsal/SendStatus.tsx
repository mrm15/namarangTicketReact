import React from 'react';
import {getCurrentDate, randomNumberGenerator} from "../../../../../utils/utilsFunction.tsx";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate.tsx";
import {makeInvoiceBaseOnHesabfaData} from "../../../../Hesabfa/SubmitBill/functions.tsx";
import useAuth from "../../../../../hooks/useAuth.tsx";
import {ROLES} from "../../../../../Pages/ROLES.tsx";
import {toast} from "react-toastify";
import ErsalInPackSendTable from "./ErsalInPackSendTable.tsx";

const SendStatus = ({
                        info,
                        url,
                        navigateTo, // Replace 'any' with the actual type if known
                        myAxios,
                        setMyData,
                    }) => {


    const myAxiosP = useAxiosPrivate();

    const {auth} = useAuth();

    const cellValue = info.getValue();
    const sendStatus = cellValue || "نامشخص"
    // وضعیت رو با عدد میخوام نشون بدم
    // بسته بندی 8
    // اسال شده 9


    const rnd = randomNumberGenerator().toString()

    const handleChangePack = async (e) => {
        const orderName = info?.row?.original?.ContactTitle;
        let statusNumber: number | string = "";
        let date = getCurrentDate();


        let message = "";
        if (e.target.checked) {
            message = `تغییر وضعیت  ${orderName} به حالت بسته بندی شده `
            statusNumber = 8;

        } else {
            message = `تغییر وضعیت  ${orderName} به حالت بسته بندی  «نشده» `
            statusNumber = 7;
            date = "-"
            // اینجا حالتیه که چک رو برداشته و اگه دسترسی به حالت قبل برگرداندن داره اجاره داره از اینجا ب بعد ادامه پیدا کنه
            // اگه دسترسی نداره همینجا ریترن میکنم
            const hasAccessToUnCheckedSendPackages = auth?.userInfo?.roleAccessList?.includes(ROLES.hasAccessToUnCheckedSendPackages[0])
            if(!hasAccessToUnCheckedSendPackages){
                toast.dismiss()
                toast.error("شما مجوز تغییر سفارش به حالت ارسال نشده را ندارید.")
                return;
            }

        }


        const isConfirm = confirm(message);

        if (isConfirm) {
            const invoice = makeInvoiceBaseOnHesabfaData(info?.row?.original)
            const result = await myAxiosP.post("/hesabfa/updatePackStatusTo8",
                {
                    invoice,
                    date,
                    statusNumber,
                })

            if (result.status === 200) {
                toast(result.data.message)
                setMyData({reload: randomNumberGenerator()})
            }
        }
    }


   const hasAccessBastebandi = auth?.userInfo?.roleAccessList?.includes("basteBandi")
   const hasAccessErsal = auth?.userInfo?.roleAccessList?.includes("ersal")
    return (
        <div className={" flex flex-wrap items-center gap-1 w-32"}>
            {hasAccessBastebandi && <div className={" flex items-center"}>
              <input
                id={rnd}
                type="checkbox"
                checked={sendStatus >= 8}
                onChange={handleChangePack}
              />
              <label htmlFor={rnd}>بسته بندی</label>
            </div>}
            {hasAccessErsal &&<div>
              <ErsalInPackSendTable
                info={info}
                sendStatus={sendStatus}
                setMyData={setMyData}
              />
            </div>}


        </div>
    );
};

export default SendStatus;