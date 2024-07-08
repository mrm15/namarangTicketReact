import React, {useEffect, useState} from 'react';
import useObjectDataHolder from "../../../hooks/UseObjectDataHolder";
import Loader from "../../Loader";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.tsx";
import {getBillData, getCustomerList, getProductList, getProjectList, submitBill} from "../../../config/api.tsx";
import FullWidthPage from "../../UI/FullWidthPage.tsx";
import ShowProductListForSelect from "./ShowProductListForSelect.tsx";
import BillInvoice from "./BillInvoice.tsx";
import {addRowIdtoTable} from "../../../utils/utilsFunction.tsx";
import {calculateSumOfEachRow, makeInvoiceBaseOnHesabfaData,} from "./functions.tsx";
import {useLocation} from "react-router-dom";
import useAuth from "../../../hooks/useAuth.tsx";
import {IInitialBillData, IInvoice, IInvoiceItem, IUnit} from "./initialData.tsx";


const SubmitBill = () => {


        // اطلاعاتی که لازم دارم اینجا اینه:
        // نوع فاکتور، که میخوام بگم این در تیکت هست یا در تیکت ریپلای
        // آیدی تیکت یا تیکت ریپلای رو لازم دارم تا شماره فاکتور رو اونجا بنویسم
        // شماره فاکتور
        // اگه لازم باشه برای ویرایش فاکتور من کد رو اینجا دادم تا با این تشخیص بدم که فاکتور باید ویرایش بشه
        // آ؛درس بازگشتی که بعد از اینکه تایید زد صفحه برگرده به صفحه ی قبلی
        //  مقدار تگ که کاربری که این فاکتور رو ثبت کرده رو اینجا دادم.
        // در صورتی که کاربر بخواد اینو تایید کنه لازم نیست که من تگ رو بدم و با همون تگ قبلی باید
        // اینجا یه چالش مهم داریم. که وقتی از کدوم دپارتمان اومدیم مقدار تگ رو عوض نکنیم؟
        // اینو از توی ادمین ستینگز نگاه میکنیم که آیا دپارتمانش چیزی که میتونه تگ رو عوض کنه یا نه؟
        // اگه کاربر بتونه تگ رو عوض کنه پس میتونیم مقدار تگ رو در حالت ویرایش به روز کنیم
        //در حالت ویرایش اگه کاربر نتونه تگ رو عوض کنه تگ قبلی رو میدیم و با تگ قبلی ثبت میکنیم


        // @ts-ignore
        const {auth} = useAuth();

        const myLocation = useLocation();
        const myStateData = myLocation?.state?.data;
        const componentInfo = {
            billType: myStateData?.billType, // it is in ticket Or in the ticketReply
            ticketId: myStateData?.ticketId,
            id: myStateData?.id,
            billNumber: myStateData.billNumber, // if its empty  it is on Edit Mode
            ContactCode: myStateData?.contactCode, // if its empty  it is on Edit Mode
            ContactName: myStateData?.contactName, // if its empty  it is on Edit Mode
            tag: auth?.userInfo?.userData?.name, // اگه سری اول داره ثبت میکنه که تگ رو کاربر میدم  و اگه  ویرایش بود هم کاربری که این فرم رو باز کرده- اگه توی استثناها بود هم آخرین کاربر
            backUrl: myStateData.backUrl,
        }


        const [invoice, setInvoice] = useObjectDataHolder<IInvoice>({
            Number: componentInfo.billNumber + "",
            ContactTitle: componentInfo.ContactName, // عنوان مشتری در فرم ثبت سفارش
            Reference: '',
            Date: '',//
            DueDate: '',//
            ContactCode: componentInfo.ContactCode,
            Note: '',
            InvoiceType: 0,
            Status: 0, // پیش نویس
            Tag: componentInfo.tag, // تگ تستی
            InvoiceItems: [],
            Others: [],
            Currency: "IRR",
            TaxId: "",
            CurrencyRate: 1.0000000000,
            Project: "",
            Sum: 0
        });
        const [isLoading, setIsLoading] = useState(true)
        const [initialBillData, setInitialBillData] = useObjectDataHolder<IInitialBillData>({
            productList: [],
            projectList: [],
            customerList: [],
        });
        const myAxios = useAxiosPrivate();
        useEffect(() => {
            const getData = async () => {
                const temp = {
                    productList: [],
                    projectList: [],
                    customerList: [],
                }
                const res1_project = await myAxios.get(getProjectList);
                const res2_product = await myAxios.get(getProductList);
                const res3_customers = await myAxios.get(getCustomerList);

                if (res1_project.data) {
                    temp.projectList = res1_project.data.data;
                }
                if (res2_product.data) {
                    const temp222 = res2_product.data?.data?.List.map((row: any) => {
                        return {
                            Id: row.Id,
                            Description: row.Description || row.SalesTitle,
                            ItemCode: row.Code,
                            Unit: row.Unit,
                            Quantity: 1,
                            UnitPrice: row.SellPrice,
                            Discount: 0,
                            Tax: 0,
                            SubUnit: row.SubUnit,
                            ///////////////////////////
                            Name: row.Name,
                            fixedPrice: row.SellPrice,
                            dividedBy: 1,
                            selectedUnit: "1",
                            Units: [
                                {id: 1, value: row.Unit, divideNumber: 1},
                                {id: 2, value: row.SubUnit, divideNumber: row.ConversionFactor},
                            ],
                            sum: 0,
                        }
                    })
                    console.log(temp222)
                    temp.productList = temp222;
                }
                if (res3_customers.data) {
                    temp.customerList = res3_customers.data?.data?.List
                }


                // اگه بیل نامبر رو فرستاده بود ینی داره ادیت میکنه
                if (componentInfo.billNumber) {
                    const result = await myAxios.get(getBillData + componentInfo.billNumber);
                    const incomingData = result.data.data;
                    const myInvoice = makeInvoiceBaseOnHesabfaData(incomingData)
                    setInvoice(myInvoice)
                    setIsLoading(false);
                }
                setInitialBillData({...temp});
                setIsLoading(false);
            }
            void getData()
        }, [])


        const addProductToTable = (row: any) => {
            if (row) {
                const tempRow = {...row}
                delete tempRow.value
                delete tempRow.label

                let temp = [tempRow, ...invoice.InvoiceItems];
                temp = addRowIdtoTable(temp)
                const temp2 = calculateSumOfEachRow(temp)
                setInvoice({InvoiceItems: temp2})
            }

        }
        try {
            return (
                <FullWidthPage>
                    {isLoading ? <Loader/> :
                        <div>
                            <div className={'w-full'}>
                                <ShowProductListForSelect
                                    billData={componentInfo}
                                    invoice={invoice}
                                    onSelect={addProductToTable}
                                    productList={initialBillData.productList}/>
                            </div>
                            <hr/>
                            <BillInvoice
                                invoice={invoice}
                                setInvoice={setInvoice}
                                initialBillData={initialBillData}
                            />
                            <hr/>
                        </div>
                    }
                </FullWidthPage>
            );
        } catch (error) {
            return (
                <div>
                    {error.toString()}
                </div>
            );
        }
    }
;

export default SubmitBill;
