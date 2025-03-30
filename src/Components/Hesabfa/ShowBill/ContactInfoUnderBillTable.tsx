import React, {useState} from 'react';
import {FaPhoneAlt, FaCheck} from 'react-icons/fa';
import {MdContentCopy} from 'react-icons/md';
import {toast} from 'react-hot-toast';

const ContactInfoUnderBillTable = ({customerName = "", isVerified = false}) => {
    const [copied, setCopied] = useState<string | null>(null);

    let tId: string;
    const copyToClipboard = async (text: string) => {
        tId && toast.dismiss(tId); // بستن پیام قبلی
        await navigator.clipboard.writeText(text);
        setCopied(text);
        tId = toast.success('کپی شد!');
        setTimeout(() => setCopied(null), 2000); // بازگشت به حالت اولیه
    };

    return (
        <div className="bg-white shadow-lg rounded p-6 space-y-6 mt-6 border border-gray-200 transition-all">

            {/* عنوان خوش‌آمد */}
            <div className="space-y-2">
                <h2 className="font-bold text-lg text-gray-700">
                    همکار گرامی {customerName && `، ${customerName}`}
                </h2>
                <p className="text-sm text-gray-600 leading-loose">
                    کلیه واریزی‌ها برای نمارنگ فقط به شماره کارت‌های معتبر به نام <span
                    className="font-bold">جواد سرایی</span> می‌باشند.
                    لطفاً پس از واریز وجه، رسید آن را ارسال فرمایید.
                </p>
            </div>

            {/* شماره کارت اول */}
            <div className="space-y-2">
                <button
                    onClick={() => copyToClipboard('6219861064561508')}
                    className={`flex items-center justify-between fontSize12 gap-2 md:gap-3 rounded-lg p-3 w-full md:w-fit
                        ${copied === '6219861064561508' ? 'bg-green-100 border border-green-500' : 'bg-gray-100 hover:bg-gray-200 border border-gray-300'}
                        transition-all duration-300 shadow-sm active:scale-95`}
                    title="برای کپی کلیک کنید"
                >
                    <span className="font-mono font-extrabold text-gray-800 select-all ltr">  6219 8610 6456 1508
                    <span className={"fontFamilyIranSans"}>بانک سامان</span>
                    </span>
                    {copied === '6219861064561508' ? <FaCheck size={18} className="text-green-600"/> :
                        <MdContentCopy size={18} className="text-blue-500"/>}
                </button>
            </div>

            {/* شماره کارت دوم */}
            <div className="space-y-2">
                <button
                    onClick={() => copyToClipboard('6037997593026132')}
                    className={`flex items-center justify-between fontSize12 gap-2 md:gap-3 rounded-lg p-3 w-full md:w-fit
                        ${copied === '6037997593026132' ? 'bg-green-100 border border-green-500' : 'bg-gray-100 hover:bg-gray-200 border border-gray-300'}
                        transition-all duration-300 shadow-sm active:scale-95`}
                    title="برای کپی کلیک کنید"
                >
                    <span
                        className="font-mono font-extrabold text-gray-800 select-all ltr">6037 9975 9302 6132
                    </span>
                    <span className={"fontFamilyIranSans"}>بانک ملی</span>
                    {copied === '6037997593026132' ? <FaCheck size={18} className="text-green-600"/> :
                        <MdContentCopy size={18} className="text-blue-500"/>}
                </button>
            </div>

            {/* شماره شبا */}
            <div className="space-y-2">
                {/*<h3 className="font-bold text-gray-700">شماره شبا جواد سرایی</h3>*/}
                <button
                    onClick={() => copyToClipboard('970560085488802497284001')}
                    className={`flex items-center justify-between gap-2 md:gap-3 rounded-lg p-3 w-full md:w-fit
                        ${copied === '970560085488802497284001' ? 'bg-green-100 border border-green-500' : 'bg-gray-100 hover:bg-gray-200 border border-gray-300'}
                        transition-all duration-300 shadow-sm active:scale-95`}
                    title="برای کپی کلیک کنید"
                >
                    <span className="font-mono font-extrabold fontSize12 text-gray-800 select-all">IR97 0560 0854 8880 2497 2840 01</span>
                    {copied === '970560085488802497284001' ? (
                        <FaCheck size={18} className="text-green-600"/>
                    ) : (
                        <MdContentCopy size={18} className="text-blue-500"/>
                    )}
                </button>
                <p className="text-sm text-gray-600 leading-loose">
                    لطفا جهت تایید و ساخت سفارش خود
                    &nbsp;
                    <span className={"font-bold text-red-700"}>حداقل یک دوم
                    مبلغ سفارش به حساب واریز گردد
                        </span>
                    &nbsp;
                    به اطلاع میرساند که فایل ها پس از واریز و ارسال فیش وارد مرحله ی ساخت می شوند.
                    <b> مبالغ واریزی شبا پس از ثبت نهایی در حساب، از بدهی شما کسر می‌شود.
                    </b>
                </p>
            </div>

            {/* شماره‌های تماس */}
            <div className="space-y-3 py-4">
                <h3 className="font-bold text-gray-700">لطفاً از طریق شماره‌های زیر پیگیری فرمایید:</h3>
                <div className="flex flex-col gap-3 fontSize12">
                    <a href="tel:09938124794"
                       className="flex items-center gap-2 text-green-600 hover:text-green-800 transition bg-green-100 p-2 rounded w-fit">
                        <FaPhoneAlt size={16}/> 09938124794 - خانم احمدی (واحد مالی تهران)
                    </a>
                    <a href="tel:09938124793"
                       className="flex items-center gap-2 text-green-600 hover:text-green-800 transition bg-green-100 p-2 rounded w-fit">
                        <FaPhoneAlt size={16}/> 09938124793 - خانم بیرنگ (واحد مالی شهرستان)
                    </a>
                    <a href="tel:09901607541"
                       className="flex items-center gap-2 text-green-600 hover:text-green-800 transition bg-green-100 p-2 rounded w-fit">
                        <FaPhoneAlt size={16}/> 09901607541 - آقای محمدی (واحد پیگیری مرسولات تهران)
                    </a>
                    <a href="tel:09901607543"
                       className="flex items-center gap-2 text-green-600 hover:text-green-800 transition bg-green-100 p-2 rounded w-fit">
                        <FaPhoneAlt size={16}/> 09901607543 - خانم اسماعیلی (واحد پیگیری مرسولات شهرستان)
                    </a>
                </div>
            </div>

            {/*<div className="space-y-3">*/}
            {/*    <h3 className="font-bold text-gray-700">توجه </h3>*/}
            {/*    /!*<p className="text-sm text-gray-600">لطفاً از طریق شماره‌های زیر پیگیری فرمایید:</p>*!/*/}
            {/*    */}
            {/*</div>*/}


        </div>
    );
};

export default ContactInfoUnderBillTable;
