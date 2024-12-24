import {useState} from 'react';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import MyDatePicker2 from "../myDatePicker2/MyDatePicker2";
import {toast} from "react-toastify";
import useObjectDataHolder from "../../hooks/UseObjectDataHolder.tsx";

const UpdateLocalBills = () => {

    const myAxios = useAxiosPrivate()

    const [requestDate, setRequestDate] = useObjectDataHolder<any>({
        startDate:"",
        endDate:"",
    })

    const updateBills = async () => {

        const isConfirm = confirm("تمام فاکتور های بخش گزارش دوباره از حسابفا به روز میشه.  این عمل خیلی خطرنامه و یک فایل ایجاد میکنه." +
            "آیا مطمئنی؟");
        if (!isConfirm) {
            return
        }

        const tId = toast.loading("در حال بارگیری... در سرور");
        try {
            const result = await myAxios.post("/hesabfa/updateBillsFile", {myDate: requestDate})
            toast.dismiss(tId)
            toast(JSON.stringify(result.data))
        } catch (e) {
            toast.dismiss(tId)
            console.log(e)
        }


    }
    return (
        <div className={"border-2 rounded border-red-500 p-3 "} >
            <MyDatePicker2 value={requestDate.startDate} onChange={(d) => setRequestDate({startDate:d.jsDate})}/>
            <MyDatePicker2 value={requestDate.endDate} onChange={(d) => setRequestDate({endDate:d.jsDate})}/>
            <div
                onClick={updateBills}
                className={"btn-green-mir"}>
                 بارگیری کلی فاکتور
            </div>

        </div>
    );
};

export default UpdateLocalBills;
