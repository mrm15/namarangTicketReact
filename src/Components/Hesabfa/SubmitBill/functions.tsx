import {IInvoice, IInvoiceItem, IOther} from "./initialData.tsx";
import {dateFromHesabfaToTimeStamp} from "../../../utils/utilsFunction.tsx";

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
            selectedUnit: (row.Unit === row.Item.Unit) ? "1" : "2",// اگه مقدار یونیت انتخابی با یونیت توی آیتم برابر بود ینی اولی رو انتخاب کرده در غیر اینصورت دومی رو انتخاب کرده
            Units: [
                {id: 1, value: row.Item.Unit, divideNumber: 1},
                {id: 2, value: row.Item.SubUnit, divideNumber: row.ConversionFactor},
            ], // این مقادیر هم از توی آیتم باید بگیریم و قرار بدیم
            sum: row.TotalAmount, // حسابفا اینجا دوتا مقدار میده یکی سام با اس بزرگ و مقدار توتال امونت که من فک میکنم اوتال امونت کاملتره احتمالا تخفیف و مالیات رو لحاظ کرده
        }
        return temp333;
    })
}

export const makeInvoiceBaseOnHesabfaData = (incomingData) => {


    const InvoiceItems = makeInvoiceItemBasedOnHesabfaData(incomingData.InvoiceItems);

    const myData: IInvoice = {
        Number: incomingData.Number,//
        Project: incomingData.Project,//
        ContactTitle: incomingData.ContactTitle,
        Reference: incomingData.Reference, // نمیدونم رفرنس چیه اون میفرسته منم اینجا میزارم شاید یه روزی لازم شد
        Date: dateFromHesabfaToTimeStamp(incomingData.Date),
        DueDate: dateFromHesabfaToTimeStamp(incomingData.DueDate),
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