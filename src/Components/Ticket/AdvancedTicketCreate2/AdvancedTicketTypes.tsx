export interface AdvancedTicketTypes {
    // عنوان سفارش
    title: string,
    // توضیحات سفارش
    description: string,
    // فایل نهایی یا فایل های نهایی
    files: File[],
    filesUploadId: any[],
    // فایل رو کی فرستاده و قراره توی پنل کی نشون بدیم که این فایل مال تو بوده ینی فرستنده فایل
    senderUserId: string,
    // اطلاعات مشتری که انتخاب شده جهت نمایش دادن
    senderUserData:string,
    // ماکزیمم فایل سایزی که میشه آپلود کرد.
    maxFileSize: number,
    // فایل های شات
    screenShot:File[],
    screenShotUploadId:any[],
    // آیا پروسه داره آپلود میشه؟
    isSendingRequest: boolean,
}
export const initialDataAdvancedTicketCreate2 : AdvancedTicketTypes = {
    // عنوان سفارش
    title: '',
    // توضیحات سفارش
    description: '',
    // فایل نهایی یا فایل های نهایی
    files: [],
    filesUploadId: [],
    // فایل رو کی فرستاده و قراره توی پنل کی نشون بدیم که این فایل مال تو بوده ینی فرستنده فایل
    senderUserId: '',
    senderUserData: "",
    // ماکزیمم فایل سایزی که میشه آپلود کرد.
    maxFileSize: 0,
    // فایل های شات
    screenShot: [],
    screenShotUploadId: [],
    // آیا پروسه داره آپلود میشه؟
    isSendingRequest: false,
}