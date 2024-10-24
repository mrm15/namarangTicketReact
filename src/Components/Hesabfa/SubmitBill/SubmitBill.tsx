import React, {useEffect, useState} from 'react';
import useObjectDataHolder from "../../../hooks/UseObjectDataHolder";
import Loader from "../../Loader";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.tsx";
import {getBillData, getCustomerList, getProductList, getProjectList, submitBill} from "../../../config/api.tsx";
import FullWidthPage from "../../UI/FullWidthPage.tsx";
import ShowProductListForSelect from "./ShowProductListForSelect.tsx";
import BillInvoice from "./BillInvoice.tsx";
import {addRowIdtoTable, dateObjectToIso8601} from "../../../utils/utilsFunction.tsx";
import {calculateSumOfEachRow, detectTag, makeInvoiceBaseOnHesabfaData,} from "./functions.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import useAuth from "../../../hooks/useAuth.tsx";
import {IInitialBillData, IInvoice, IInvoiceItem, IUnit} from "./initialData.tsx";
import {toast} from "react-toastify";
import DateObject from "react-date-object";
import {useQuery} from "@tanstack/react-query";
import Loader3 from "../../Loader/Loader3.tsx";


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

        // یکی از مهمترین کارها اینه که بتونم  چیکار کنم؟ لینکه ببینم باید تگ رو به نام کی بزنم؟ آیا آۀخرین نفری که فاکتور رو زده و اسمش اومده و یا اینکه اسم کسی که فاکتور رو باز کرده رو بزنم؟
        // اول از همه باید مود فاکتور رو بدونم. که الان داره فاکتور میزنه یا داره ویرایش میکنه
        // بعدش باید توی حالت ویرایش چک کنم  که آیا کاربری که الان داره ویرایش میکنه دپارتمانش روی لیست دپارتمان هایی که بک داده هست یا نه؟
        // اگه بود که ینی نباید تگ رو عوض کنم ولی اگه نبود باید تگ رو عوض کنم
        const [modeData, setModeData] = useState({mode: "", newTag: ""}) // i will use it later 


        const {auth} = useAuth();

        const myLocation = useLocation();
        const myStateData = myLocation?.state?.data;
        const myTag = {
            tn: myStateData.ticketNumber,
            n: auth?.userInfo?.userData?.name // اگه سری اول داره ثبت میکنه که تگ رو کاربر میدم  و اگه  ویرایش بود هم کاربری که این فرم رو باز کرده- اگه توی استثناها بود هم آخرین کاربر
        }

        const componentInfo = {
            billType: myStateData?.billType, // it is in ticket Or in the ticketReply
            ticketId: myStateData?.ticketId,
            id: myStateData?.id,
            billNumber: myStateData.billNumber, // if its empty  it is on Edit Mode
            ContactCode: myStateData?.contactCode, // if its empty  it is on Edit Mode
            ContactName: myStateData?.contactName, // if its empty  it is on Edit Mode
            tag: JSON.stringify(myTag), //
            backUrl: myStateData.backUrl,
        }
        const navigateTo = useNavigate()

        const todayDate = new DateObject();
        todayDate.setHour(0)
        todayDate.setMinute(0)
        todayDate.setSecond(0)
        todayDate.setMillisecond(0)
        const todayIsoDate = dateObjectToIso8601(todayDate)
        const [invoice, setInvoice] = useObjectDataHolder<IInvoice>({
            Contact: {},
            Number: componentInfo.billNumber + "",
            ContactTitle: componentInfo.ContactName, // عنوان مشتری در فرم ثبت سفارش
            Reference: '',
            Date: todayIsoDate,//
            DueDate: todayIsoDate,//
            ContactCode: componentInfo.ContactCode,
            Note: '',
            InvoiceType: 0,
            Status: 0, // پیش نویس
            Tag: componentInfo.tag, // تگ
            InvoiceItems: [],
            Others: [],
            Currency: "IRT",
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
        const queryFnGet = async (url) => {
            const temp = await myAxios.get(url)
            return temp.data;
        }
        const productListUseQuery = useQuery({
            queryKey: ["getProductList"],
            // url: string, myAxios: any, page: number, pageSize: number, filters: any
            queryFn: () => queryFnGet(getProductList),
            staleTime: 86400000,  // === 60*60*24*1000
            enabled: true,
        })
        const projectListUseQuery = useQuery({
            queryKey: ["getProjectList"],
            queryFn: () => queryFnGet(getProjectList),
            staleTime: 86400000,  // === 60*60*24*1000
            enabled: true,
        })
        const billDetailsData = useQuery({
            queryKey: ["billDetailsData"],
            queryFn: () => queryFnGet(getBillData + componentInfo.billNumber),
            staleTime: 100,  // === 60*60*24*1000
            enabled: Boolean(componentInfo.billNumber),
        })

        useEffect(() => {
            if (productListUseQuery?.data?.data?.List) {
                const temp222 = productListUseQuery?.data?.data?.List?.map((row: any) => {
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
                        Units: [
                            {id: 1, value: row.Unit, divideNumber: 1},
                            {id: 2, value: row.SubUnit, divideNumber: row.ConversionFactor},
                        ],
                        sum: 0,
                    };
                });

                setInitialBillData({
                    productList: productListUseQuery?.data?.data.List,
                    projectList: temp222,
                });
            }
        }, [projectListUseQuery.data, productListUseQuery.data]);

        useEffect(() => {
            const getData = async () => {
                try {
                    // اگه بیل نامبر رو فرستاده بود ینی داره ادیت میکنه
                    if (componentInfo.billNumber) {
                        // const result = await myAxios.get(getBillData + componentInfo.billNumber);


                        const incomingData = billDetailsData?.data
                        if (incomingData) {

                            const myInvoice = makeInvoiceBaseOnHesabfaData(incomingData.data)

                            // اینجا چک کنم ببینم  کاربر من توی دپارتمان های استثنا هست یا نه؟ و تگی که باید بخوره رو پیدا کنم و بزارم
                            const newTag = detectTag({
                                exceptionArray: incomingData?.exceptionArray,
                                auth,
                                lastTag: myInvoice.Tag,
                                ticketNumber: myStateData.ticketNumber
                            })
                            setInvoice({...myInvoice, Tag: newTag})
                            setIsLoading(false);
                        }
                    } else {
                        // اینجا باید درخواست بزنم اطلاعات مشتری رو بگیرم که کد داره.
                        // و اونو توی بخش مخاطب بزارم
                        const ContactRequest = await myAxios.get("/hesabfa/getContactData/" + componentInfo.ContactCode);
                        invoice.Contact = ContactRequest.data.data
                        // اینجا چک کنم ببینم  کاربر من توی دپارتمان های استثنا هست یا نه؟ و تگی که باید بخوره رو پیدا کنم و بزارم
                        const newTag11 = detectTag({
                            exceptionArray: [],
                            auth,
                            lastTag: undefined,
                            ticketNumber: myStateData.ticketNumber
                        })
                        setInvoice({...invoice, Tag: newTag11})
                    }
                    setIsLoading(false);
                } catch (error) {
                    setIsLoading(false);
                    // navigateTo(-1)
                    toast.error(" خطا در دریافت فاکتور")
                    console.log("خطا در دریافت فاکتور")
                    console.log(error?.toString())

                }
            }
            void getData()
        }, [billDetailsData.data])

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
                <div className={"relative w-full"}>
                    {billDetailsData.isError && <button

                        onClick={() => billDetailsData.refetch()}
                        className={"badge-bg-red-text-red"}> تلاش دوباره - خطا در دریافت اطلاعات</button>}

                    {isLoading ? <Loader/> :
                        <div>
                            <div>
                                <ShowProductListForSelect
                                    billData={componentInfo}
                                    invoice={invoice}
                                    onSelect={addProductToTable}
                                    productList={initialBillData.productList}/>
                            </div>
                            <hr/>

                            {billDetailsData.isLoading && <Loader3/>}
                            {

                                <BillInvoice
                                    invoice={invoice}
                                    setInvoice={setInvoice}
                                    initialBillData={initialBillData}
                                />
                            }

                            <hr/>
                        </div>
                    }
                </div>
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
