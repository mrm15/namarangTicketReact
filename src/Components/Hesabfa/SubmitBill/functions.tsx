import {IInvoice, IInvoiceItem} from "./initialData.tsx";
import {addRowIdtoTable} from "../../../utils/utilsFunction.tsx";

export const calculateSumOfEachRow = (newInvoiceItems) => {

    // جمع هر سطر رو اینجا حساب میکنیم
    const temp = newInvoiceItems.map(t => {
        const row = {...t}
        row.sum = row.UnitPrice * row.Quantity
        return row;
    })


    return temp
}

const makeInvoiceItemBasedOnHesabfaData = (myInvoiceItems: any[]) => {

    return myInvoiceItems.map(row => {
        const temp333: IInvoiceItem = {
            RowId: row.RowNumber, //
            Id: row.Id,//
            Description: row?.Item?.SalesTitle, //
            ItemCode: row.Item.Code, //
            Unit: row.Unit, // شاید یونیت رو عوض کرده باشه پس اینحا اینو میزارم که از همون آبجیکت بگیره بعدش اگه تغییرش داد روی حالت آنچنج میره عوض میشه
            Quantity: row.Quantity, // مقداری که کاربر زده
            UnitPrice: row.UnitPrice, // احتمالا کاربر یونیت پرایس رو عوض کرده باشه چون واحد رو عوض میککنه این عوض میشه پس از  همینجا میخونیم
            Discount: row.Discount, //
            Tax: row.Tax, // مالیات وارد شده توی فاکتور
            SubUnit: row.Item.SubUnit, // چون مقدار ساب یونیت رو از توی آیتم نگاه میکنم پس اینحا هم از توی آیتم بر میدارم

            Name: row?.Item?.Name, // نام کالا از توی آیتم میاد حسابفا اینجا نمیفرسته ولی بجاش داره مقدار آیتم رو میده و دستش درد نکنه. راه مناسبی رو گذاشته بنظرم
            fixedPrice: row.Item.SellPrice, //
            dividedBy: (row.Unit === row.Item.Unit) ? 1 : row.Item.ConversionFactor, // اینم جالب هست با توجه به اینکه من خودم این آبجکت این مقدار رو بر اساس چیزی که کاربر تغییر داده تعیین میکنم. پس اگه مقدار یونیت با مقدار یونیت اصلی توی آیتم یکی بود پس اوکیه ولی اگه مقدار یونیت برابر با ساب-یونیت بود پس توی محاسبه از مقدار کانورشن فاکتور استفاده کرده و اینجا قرارش میدم
            // selectedUnit: (row.Unit === row.Item.Unit) ? "1" : "2",// اگه مقدار یونیت انتخابی با یونیت توی آیتم برابر بود ینی اولی رو انتخاب کرده در غیر اینصورت دومی رو انتخاب کرده
            Units: [
                {id: 1, value: row.Item.Unit, divideNumber: 1},
                {id: 2, value: row.Item.SubUnit, divideNumber: row.Item.ConversionFactor},
            ], // این مقادیر هم از توی آیتم باید بگیریم و قرار بدیم
            sum: row.TotalAmount, // حسابفا اینجا دوتا مقدار میده یکی سام با اس بزرگ و مقدار توتال امونت که من فک میکنم اوتال امونت کاملتره احتمالا تخفیف و مالیات رو لحاظ کرده
        }
        return temp333;
    })
}

export const makeInvoiceBaseOnHesabfaData = (incomingData: any) => {


    const InvoiceItemsTemp = makeInvoiceItemBasedOnHesabfaData(incomingData.InvoiceItems);
    const InvoiceItems = addRowIdtoTable(InvoiceItemsTemp)

    const myData: IInvoice = {
        Number: incomingData.Number,//
        Project: incomingData.Project,//
        ContactTitle: incomingData.ContactTitle,
        Reference: incomingData.Reference, // نمیدونم رفرنس چیه اون میفرسته منم اینجا میزارم شاید یه روزی لازم شد
        // Date: dateFromHesabfaToTimeStamp(incomingData.Date),
        Date: (incomingData.Date),
        // DueDate: dateFromHesabfaToTimeStamp(incomingData.DueDate),
        DueDate: (incomingData.DueDate),
        ContactCode: incomingData.ContactCode,
        Note: '',
        InvoiceType: 0,
        Status: incomingData.Status, // مقدار  1 برای تایید شده هست و مقدار صفر برای پیش نویس
        Tag: incomingData.Tag, // تگ هست که  من قراره نام کسی که فاکتور زده رو قرار بدم
        InvoiceItems,
        Others: incomingData.Others,
        Currency: incomingData.Currency,//  "IRT" toamn     IRR // rial
        TaxId: '',
        CurrencyRate: incomingData.CurrencyRate,
        Sum: incomingData.Sum,
    }

    return myData

}
export type myTagObjectType = {
    n: string; // نام مشتری
    tn: string;// شماره تیکت مشتری
    bs: string;// وضعیت بسته بندی
    db:string; // تاریخ بسته بندی
    ss: string; // وضعیت ارسال3
    ds:string; // تاریخ ارسال




}

export const makeEmptyTagObject = () => {

    const tagObject: myTagObjectType = {
        db: "",
        n: "",
        tn: "",
        bs: "",
        ss: "",
        ds:"",
    };
    return tagObject
}
export const detectTag = ({exceptionArray = [], auth = {}, lastTag = undefined, ticketNumber}) => {

    // @ts-ignore
    const {userInfo} = auth || {};
    const {userData} = userInfo || {};
    const {name = "نام مشتری", departmentId} = userData;
    // اول یک تگ خالی ایجاد میکنم و بعدش پرش میکنم با اطلاعات تگ قبلی
    const myNewTag = makeEmptyTagObject();

    if (lastTag) {

        let tempTag;
        try {
            tempTag = JSON.parse(lastTag);
        } catch (error) {
            console.log(error)
        }

        myNewTag.n = exceptionArray.includes(departmentId) ? (tempTag?.n || "ندارد") : name;
        myNewTag.tn = ticketNumber;
        return JSON.stringify(myNewTag)


    } else {
        myNewTag.n = name;
        myNewTag.tn = ticketNumber || "ندارد";
        return JSON.stringify(myNewTag)
    }


    // Check the conditions related to exceptionArray first
    // if (exceptionArray.length && exceptionArray.includes(departmentId)) {
    //     return lastTag || `{}`;
    // }
    //
    // if (lastTag === "") {
    //     lastTag = `{}`
    // }
    // let myNewTag = {n: "", tn: ""};
    // try {
    //     myNewTag = JSON.parse(lastTag)
    // } catch (error) {
    //     console.log(error.toString())
    // }
    // myNewTag.n = name
    // myNewTag.tn = ticketNumber
    //
    // const resultAfter = JSON.stringify(myNewTag)
    //
    // if (exceptionArray.length === 0) {
    //     return resultAfter;
    // }
    //
    // return exceptionArray.includes(departmentId) ? lastTag : resultAfter;

};
