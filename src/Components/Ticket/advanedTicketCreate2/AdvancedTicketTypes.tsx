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
    // لیست کاربران
    userList: any[],
    // ماکزیمم فایل سایزی که میشه آپلود کرد.
    maxFileSize: number,
    // فایل های شات
    screenShot:File[],
    screenShotUploadId:any[],
    // آیا پروسه داره آپلود میشه؟
    isSendingRequest: boolean,
}