import {useState} from 'react';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import MyDatePicker2 from "../myDatePicker2/MyDatePicker2";
import {toast} from "react-toastify";

const UpdateLocalBills = () => {

    const myAxios = useAxiosPrivate()

    const [requestDate, setRequestDate] = useState(null)

    const updateBills = async () => {

        const isConfirm = confirm("تمام فاکتور های بخش گزارش دوباره از حسابفا به روز میشه.  این عمل خیلی خطرنامه و یک فایل ایجاد میکنه." +
            "آیا مطمئنی؟");
        if (!isConfirm) {
            return
        }

        const tId = toast.loading("در حال بارگیری... در سرور");
        try {
            const result = await myAxios.post("/hesabfa/updateBillsFile", {data: requestDate})
            toast.dismiss(tId)
            toast(JSON.stringify(result.data))
        } catch (e) {
            toast.dismiss(tId)
            console.log(e)
        }


    }
    return (
        <div>
            <MyDatePicker2 value={requestDate} onChange={(d) => setRequestDate(d.jsDate)}/>
            <div
                onClick={updateBills}
                className={"btn-green-mir"}>
                درخواست بارگیری کلی فاکتور از حسابفا
            </div>

        </div>
    );
};

export default UpdateLocalBills;
