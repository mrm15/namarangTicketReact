import React, { useEffect, useState } from 'react';
import { AiOutlineCalculator } from 'react-icons/ai';
import LittleSpinner from "../Loader/LittleSpinner.tsx";
import Skeleton from "../Skeleton/Skeleton.tsx";
import "./FetchingAdminReport.css";

const FetchingAdminReport = () => {
    const messages = [
        "در حال دریافت دیتا ...", "دریافت دیتا کامل شد. در حال پردازش اطلاعات ...", "محاسبات تکمیل شد. آماده‌سازی برای نمایش گزارش ...",
        "لطفاً منتظر بمانید، گزارش در حال آماده‌سازی است ...", "چند لحظه دیگر گزارش آماده می‌شود ...", "تقریباً تمام شد، لطفاً صبر کنید ...",
        "داده‌ها با موفقیت بارگذاری شد، اکنون در حال محاسبه ...", "بررسی صحت داده‌ها، لطفاً شکیبا باشید ...",
        "جمع‌آوری اطلاعات تکمیلی برای نمایش بهتر ...", "در حال بهینه‌سازی داده‌ها برای پردازش سریع‌تر ...",
        "اطلاعات با موفقیت ذخیره شد، در حال آماده‌سازی گزارش ...", "چیدمان اطلاعات در حال انجام است ...",
        "تقریباً آماده شدیم، تا لحظاتی دیگر تکمیل خواهد شد ...", "لطفاً کمی صبر کنید، اطلاعات نهایی در حال بارگذاری است ...",
        "پیش‌نمایش گزارش در حال آماده‌سازی ...", "بازبینی نهایی اطلاعات در حال انجام است، لطفاً منتظر بمانید ..."
    ];

    const [currentMessage, setCurrentMessage] = useState(0);
    const [charNumberToShow, setCharNumberToShow] = useState(0);

    useEffect(() => {
        const messageInterval = setInterval(() => {
            setCurrentMessage(prev => (prev + 1) % messages.length);
        }, 5000);

        return () => clearInterval(messageInterval);
    }, [messages.length]);

    useEffect(() => {
        setCharNumberToShow(0);
    }, [currentMessage]);

    useEffect(() => {
        const charInterval = setInterval(() => {
            setCharNumberToShow(prev => prev + 1);
        }, 50);

        return () => clearInterval(charInterval);
    }, [charNumberToShow]);

    return (
        <div className="w-96 my-3">
            <div className="flex items-center h-full">
                <h2 className="flex items-center justify-around space-x-2 animate-fade-in">
                    <LittleSpinner />
                    <AiOutlineCalculator size={16} className="text-blue-600" />
                    <div className="animate-bounce">🔎</div>
                    <div>{messages[currentMessage].substring(0, charNumberToShow)}</div>
                </h2>
            </div>
            {Array(16).fill(<Skeleton classes="text width-100" />)}
        </div>
    );
};

export default FetchingAdminReport;
