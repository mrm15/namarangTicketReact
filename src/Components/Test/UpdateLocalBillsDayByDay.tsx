import {useState} from 'react';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import MyDatePicker2 from "../myDatePicker2/MyDatePicker2";
import {toast} from "react-toastify";
import useObjectDataHolder from "../../hooks/UseObjectDataHolder.tsx";

const sleep = async (milliSeconds: number) => {
    await new Promise((resolve) => setTimeout(resolve, milliSeconds));

}
const UpdateLocalBillsDayByDay = () => {
    const myAxios = useAxiosPrivate();

    const [requestDate, setRequestDate] = useObjectDataHolder<any>({
        startDate: "",
    });

    const updateBillsDayByDay = async () => {
        const isConfirm = confirm(
            "تمام فاکتور های بخش گزارش دوباره از حسابفا به روز میشه. این عمل خیلی خطرناکه و یک فایل ایجاد میکنه. آیا مطمئنی؟"
        );
        if (!isConfirm) return;

        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize today's date

        let currentStartDate = new Date(requestDate.startDate);
        currentStartDate.setHours(0, 0, 0, 0);

        if (!currentStartDate || currentStartDate > today) {
            toast.error("تاریخ شروع باید قبل از امروز باشد.");
            return;
        }

        const tId = toast.loading("در حال بارگیری فاکتورها...");

        while (currentStartDate < today) {
            const nextDay = new Date(currentStartDate);
            nextDay.setDate(currentStartDate.getDate() + 1);

            try {
                // Send request for the current day
                const result = await myAxios.post("/hesabfa/updateBillsFile", {
                    myDate: {
                        startDate: currentStartDate,
                        endDate: nextDay,
                    },
                });
                toast.update(tId, {
                    render: `بارگیری فاکتورهای ${currentStartDate.toLocaleDateString('fa-IR')} انجام شد.`,
                    type: "info"
                });

                // Wait for 2 seconds before the next request
                await sleep(2000);

                // Update startDate for the next iteration
                currentStartDate = nextDay;
                setRequestDate({startDate: nextDay});
            } catch (error) {
                console.error("خطا هنگام بارگیری:", error);
                toast.error("خطایی رخ داد! لطفا دوباره تلاش کنید.");
                break;
            }
        }

        toast.update(tId, {render: "تمام فاکتورها به روز شدند!", type: "success", isLoading: false});
        await sleep(10000);
        toast.dismiss(tId)
    };

    return (
        <div className={"border-2 rounded border-red-500 p-3 "}>
            <MyDatePicker2
                value={requestDate.startDate}
                onChange={(d) => setRequestDate({startDate: d.jsDate})}
            />
            <div onClick={updateBillsDayByDay} className="btn-green-mir">
                درخواست بارگیری روزانه!
            </div>
        </div>
    );
};

export default UpdateLocalBillsDayByDay;
