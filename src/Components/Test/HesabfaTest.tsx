import React from 'react';
import axios from "axios";
import {
    getBillData,
    getContactData,
    getCustomerList,
    getProductList,
    getProjectList,
    submitBill
} from "../../config/api.tsx";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.tsx";

const HesabfaTest = () => {


    const myAxiosPrivate = useAxiosPrivate()


    const handleGetProduct = async () => {
        const result = await myAxiosPrivate.get(getProductList)
    }

    const handleGetProjects = async () => {
        const result = await myAxiosPrivate.get(getProjectList)
    }
    const handleGetBillData = async (billNumber: string) => {
        const result = await myAxiosPrivate.get(getBillData + billNumber)
    }
    const handleGetCustomerList = async () => {
        const result = await myAxiosPrivate.get(getCustomerList)
    }
    const testSubmitFactor = async () => {
        const data = {}
        const result = await myAxiosPrivate.post(submitBill, data)
    }
    const testGetContactData = async () => {
        const result = await myAxiosPrivate.get(getContactData + 1003)
    }
    const testSaveNewUserToDataHesabfa = async () => {

        const contact = {
            // Code: myContact.contactCode,
            Name: "09157863770",
            Company: "09157863770",
            FirstName: "09157863770",
            LastName: "09157863770",
            ContactType: 1, // اشخاص رو حقیقی در نظر میگیریم
            NationalCode: "09157863770",
            EconomicCode: "09157863770",
            RegistrationNumber: "09157863770",
            Address: "09157863770",
            City: "09157863770",
            State: "09157863770",
            PostalCode: "09157863770",
            Phone: "09157863770",
            Fax: "09157863770",
            Mobile: "09157863770",
            Email: "09157863770",
            Website: "09157863770",
            Note: "09157863770",
            Tag: "از سایت",
            Active: "فعال",
        }

        const data = {
            apiKey: 'Snr0mPXZCmFoRzzqQG5Dv8C1kPJKf4J8',
            loginToken: '387d64b1ff9052d6ceb3d39c4df8eb27f87ebbb0a535a23931ec800b03304bc56de3eba0b94569ab15508a4c1ad19a9c',
            contact
        }
        const result = await axios.post(" https://api.hesabfa.com/v1/contact/save", data)
        console.log(result);

    }

    const syncContactsFromHesabfa = async () => {

        const result111= confirm("این کار خیلی خطر ناکه مطمئنی میخوای انجام بدی؟")
        const result = await myAxiosPrivate.get('hesabfaOpen/saveAllContactsWithPhoneNumber')


    }


    return (
        <div className={'p-32'}>
            <div>
                <button
                    onClick={handleGetProduct}
                    className={'btn-submit-mir'}>
                    تست دریافت کالا
                </button>
            </div>
            <hr/>
            <div>
                <button
                    onClick={handleGetProjects}
                    className={'btn-submit-mir'}

                >
                    تست دریافت پروژه ها
                </button>
            </div>
            <hr/>
            <div>
                <button
                    onClick={() => handleGetBillData("1003")}
                    className={'btn-submit-mir'}

                >
                    تست دریافت اطلاعات یک فاکتور
                </button>
            </div>
            <hr/>
            <div>
                <button
                    onClick={handleGetCustomerList}
                    className={'btn-submit-mir'}

                >
                    تست دریافت لیست مخاطبین
                </button>
            </div>
            <hr/>
            <div>
                <button
                    onClick={testSubmitFactor}
                    className={'btn-submit-mir'}

                >
                    ثبت فاکتور تستی
                </button>
            </div>
            <hr/>
            <br/>
            <hr/>
            <div>
                <button
                    onClick={testGetContactData}
                    className={'btn-submit-mir'}

                >
                    گرفتن دیتای یک مخاطب
                </button>
            </div>
            <hr/>
            <hr/>
            <div>
                <button
                    onClick={testSaveNewUserToDataHesabfa}
                    className={'btn-submit-mir'}

                >
                    ذخیره یک کاربر در سایت حسابفا
                </button>
            </div>
            <hr/>
            <div>
                <button
                    onClick={syncContactsFromHesabfa}
                    className={'btn-submit-mir'}

                >
                    همگام سازی مخاطبین
                </button>
            </div>
            <hr/>

        </div>
    );
};

export default HesabfaTest;
