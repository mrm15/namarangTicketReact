import React, { useState } from 'react';
import { FaPhoneAlt, FaCheck } from 'react-icons/fa';
import { MdContentCopy } from 'react-icons/md';
import { toast } from 'react-hot-toast';

const ContactInfoUnderBillTable = ({customerName="" , isVerified=false}) => {
    const [copied, setCopied] = useState<string | null>(null);

    let tId:string;
    const copyToClipboard = async (text: string) => {
        tId && toast.dismiss(tId); // برای  کردن پیام قبلی
        await navigator.clipboard.writeText(text);
        setCopied(text);
        tId=toast.success('کپی شد!');
        setTimeout(() => setCopied(null), 2000); // بعد از ۲ ثانیه حالت کپی برمی‌گردد
    };

    return (
        <div className="bg-white shadow-lg rounded p-6 space-y-6 mt-6 border border-gray-200 transition-all">


            {/* بخش شماره کارت */}
            <div className="space-y-2">
                <h2 className="font-bold text-lg text-gray-700">
                    همکار گرامی
                    &nbsp;
                    {customerName}
                </h2>
                <p className="text-sm text-gray-600 leading-loose">
                    کلیه واریزی‌ها برای نمارنگ فقط به شماره کارت <span className="font-bold">جواد سرایی</span> معتبر می‌باشند.
                    لطفاً پس از واریز وجه، حتماً رسید آن را برای ما ارسال نمایید.
                </p>
                {/* عنوان شماره کارت */}
                <p className="text-sm font-semibold text-gray-700">شماره کارت</p>
                <button
                    onClick={() => copyToClipboard('6219861064561508')}
                    className={`flex items-center justify-between fontSize12 gap-2 md:gap-3 rounded-lg p-3 w-full md:w-fit 
                        ${copied === '6219861064561508' ? 'bg-green-100 border border-green-500' : 'bg-gray-100 hover:bg-gray-200 border border-gray-300'}
                        transition-all duration-300 shadow-sm active:scale-95`}
                    title="برای کپی کلیک کنید"
                >
                    <span className=" font-mono font-extrabold text-gray-800 select-all ltr">6219 8610 6456 1508</span>
                    {copied === '6219861064561508' ? (
                        <FaCheck size={18} className="text-green-600" />
                    ) : (
                        <MdContentCopy size={18} className="text-blue-500" />
                    )}
                </button>
            </div>

            {/* بخش شماره شبا */}
            <div className="space-y-2">
                <h3 className="font-bold text-gray-700">شماره شبا جواد سرایی</h3>

                <button
                    onClick={() => copyToClipboard('IR970560085488802497284001')}
                    className={`flex items-center justify-between gap-2 md:gap-3 rounded-lg p-3 w-full md:w-fit 
                        ${copied === 'IR970560085488802497284001' ? 'bg-green-100 border border-green-500' : 'bg-gray-100 hover:bg-gray-200 border border-gray-300'}
                        transition-all duration-300 shadow-sm active:scale-95`}
                    title="برای کپی کلیک کنید"
                >
                    <span className="font-mono font-extrabold fontSize12 text-gray-800 select-all">IR97 0560 0854 8880 2497 2840 01</span>
                    {copied === 'IR970560085488802497284001' ? (
                        <FaCheck size={18} className="text-green-600"/>
                    ) : (
                        <MdContentCopy size={18} className="text-blue-500"/>
                    )}
                </button>
                <p className="text-sm text-gray-600 leading-loose">
                    مبالغ واریزی شبا پس از به حساب نشستن از بدهی شما کسر می‌شود.
                </p>
            </div>

            {/* بخش شماره‌های تماس */}
            <div className="space-y-3">
                <h3 className="font-bold text-gray-700">برای پیگیری صورت‌حساب‌ها</h3>
                <p className="text-sm text-gray-600">لطفاً از طریق شماره‌های زیر پیگیری فرمایید:</p>

                <div className="flex flex-col gap-3 fontSize12">
                    <a href="tel:09938124794" className="flex items-center gap-2 text-green-600 hover:text-green-800 transition">
                        <FaPhoneAlt size={16} /> 09938124794 - خانم احمدی (مالی تهران)
                    </a>
                    <a href="tel:09938124793" className="flex items-center gap-2  text-green-600 hover:text-green-800 transition">
                        <FaPhoneAlt size={16} /> 09938124793 - خانم بیرنگ (مالی شهرستان)
                    </a>
                    <a href="tel:09901607541" className="flex items-center gap-2  text-green-600 hover:text-green-800 transition">
                        <FaPhoneAlt size={16} /> 09901607541 - آقای محمدی (پیگیری مرسولات تهران)
                    </a>
                    <a href="tel:09901607543" className="flex items-center gap-2  text-green-600 hover:text-green-800 transition">
                        <FaPhoneAlt size={16} /> 09901607543 - خانم اسماعیلی (پیگیری مرسولات شهرستان)
                    </a>
                </div>
            </div>

        </div>
    );
};

export default ContactInfoUnderBillTable;
