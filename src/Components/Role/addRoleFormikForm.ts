import * as Yup from "yup";
import {STRINGS} from "../../utils/STRINGS.ts";
// eslint-disable-next-line react-hooks/rules-of-hooks

const checkboxOptions = {key: 'تعیین وضعیت', value: "1"}


const validationSchemaAddUser = Yup.object({
    // email: Yup.string().email('Invalid email format').required('Required'),

    name: Yup.string().required(STRINGS.REQUIRED),
    // course: Yup.string().required('Required'),
    // courseDate: Yup.date().required('Required').nullable()

})
const dropdownOptions = [
    {value: 'statusListRead', key: "خواندن جدول استاتوس ها"},
    {value: 'statusListUpdate', key: "تغییر دادن جدول استاتوس ها"},
    {value: 'statusListDelete', key: "حذف از جدول استاتوس ها"},

    {value: 'ticketCreate', key: "ثبت سفارش جدید - ایجاد تیکت - و همچنین دسترسی به پیگیری سفارشات هم داره - در منو بار گزینه ی پیگیری سفارش ظاهر میشه "},
    {value: 'readAllTicketsInSystem', key: "خواندن همه تیکت های موجود در سیستم - دسترسی فقط ادمین کل سیستم"},

    {value: 'ticketChatList', key: "خواندن چت لیست تیکت"},
    {value: 'ticketUpdate', key: "به روز رسانی مشخصات یک تیکت"},
    {value: 'ticketDelete', key: "حذف دائم یک تیکت"},
    {value: 'themeCreate', key: "ایجاد تم جدید در آینده"},
    {value: 'themeRead', key: "خواندن جدول تم ها آینده"},
    {value: 'themeUpdate', key: "تغییر دادن توی جدول تیم ها آینده"},
    {value: 'themeDelete', key: "حذف یک تم آینده"},
    {value: 'departmentCreate', key: "ایجاد دپارتمان جدید"},
    {value: 'departmentRead', key: "خواندن جدول دپارتمان ها"},
    {value: 'departmentUpdate', key: "به روز رسانی جدول دپارتمان ها"},
    {value: 'departmentDelete', key: "حذف  دپارتمان"},
    {value: 'fileCreate', key: "ایجاد یک فایل"},
    {value: 'fileRead', key: "خواندن جدول فایل ها"},
    {value: 'fileUpdate', key: "آپدیت جدول فایل ها"},
    {value: 'fileDelete', key: "حذف از جدول فایل ها"},
    {value: 'tasksCreateFullAccessToUsers', key: "ایجاد تسک جدید و اختصاص به کاربران"},
    {value: 'tasksCreateToAssignSameDepartment', key: "ایجاد تسک جدید به کسایی که توی دپارتمان خودش هستن؟"},
    {value: 'tasksReadAll', key: "خواندن جدول تسک ها"},
    {value: 'tasksOwnRead', key: "خواندن تسک های خودش"},
    {value: 'tasksUpdateAll', key: "آپدیت همه ی تسک ها"},
    {value: 'tasksOwnUpdate', key: "آپدیت تسک های خودش"},
    {value: 'tasksDeleteAll', key: "حذف همه ی تسک ها"},
    {value: 'tasksOwnDelete', key: "حذف تسک هایی که خودش ایجاد کرده"},
    {value: 'rolesCreate', key: "ایجاد نقش جدید"},
    {value: 'rolesRead', key: "خواندن جدول نقش ها"},
    {value: 'rolesUpdate', key: "ویرایش جدول نقش ها"},
    {value: 'rolesDelete', key: "حذف نقش ها"},
    {value: 'ticketRepliesCreate', key: "ایجاد یک تیکت ریپلای که طبیعیه"},
    {value: 'ticketRepliesRead', key: "خواندن جدول تیکت ریپلای"},
    {value: 'ticketRepliesUpdate', key: "ویرایش جدول تیکت ریپلای"},
    {value: 'ticketRepliesDelete', key: "حذف یک ریپلای از لیست"},
    {value: 'ticketChangeHistoryRead', key: "خواندن سوابق یک تیکت"},
    {value: 'ticketChangeHistoryRepliesUpdate', key: "ویرایش جدول سوابق یک تیکت"},
    {value: 'ticketChangeHistoryDelete', key: "حذف یک مورد از سوابق یک تیکت"},
    {value: 'forwardTickets', key: "قابلیت ارجاع تیکت داشته باشد یا نه؟"},
    {value: 'assignTicketsInbox', key: "مشاهده صندوق ورودی پیام هایی که به من ارجاع شده در منو بار"},
    {value: 'assignTicketsInboxCanDelete', key: "قابلیت حذف پیام های صندوق ورودی من که به من ارجاع شده"},
    {value: 'assignTicketsOutBox', key: "مشاهده صندوق خروجی پیام هایی که به دیگران ارجاع دادم در منوبار"},
    {value: 'assignTicketsOutBoxCanDelete', key: "قابلیت حذف پیام هایی که من به دیگران ارجاع دادم"},
    {value: 'assignTicketsShowAll', key: "مشاهده ی کل تیکت های ارجاعی برای ادمین که بتونه مدیریت کاملی روی تیکت های ارجاعی داشته باشه"},

    {value: 'UnlimitedForward', key: "قابلیت ارجاع تیکت به همه ی دپارتمان ها و همه کاربران"},

    {value: 'userCreate', key: "ایجاد کاربر جدید"},
    {value: 'userReadAll', key: "مشاهده جدول کاربران"},
    {value: 'userReadSameDepartment', key: "مشاهده کاربرانی که توی همون دپارتمان خودش هستن"},
    {value: 'userUpdateAll', key: "آپدیت  مشخصات همه کاربران"},
    {value: 'userUpdateSameDepartment', key: "آپدیت مشخصات کاربران همون دپارتمان"},
    {value: 'userDeleteAll', key: "حذف کاربران"},
    {value: 'userDeleteSameDepartment', key: "حذف کاربران همون دپارتمان"},


    {value: 'userActiveAndDeActiveUsers', key: "فعال یا غیر فعال کردن کاربران"},
    {value: 'userEditUsersRole', key: "تغییر  نقش کابران"},
    {value: 'userEditUsersDepartment', key: "تغییر دپارتمان کاربران"},
    {value: 'adminSettings', key: "تنظیمات مدیریتی"},
    {value: 'userStatusInDashboard', key: "نمایش وضعیت آنلاینی در داشبورد"},


    {value: 'report', key: "گزارشات"},
    {value: 'howManyUsersThereAre', key: "تعداد کل کاربران سیستم"},
    {value: 'howManyUsersIsInEveryDepartment', key: "تعداد کاربران همون دپارتمانی که توش قرار داریم"},
    {value: 'howManyTicketsThereAre', key: "تعداد کل تیکت ها"},
    {value: 'howManyTicketsThereAreInEveryDepartment', key: "تعداد تیکت هایی که توی هر دپارتمان هست."},
    {value: 'howManyTicketsHasDoneStatus', key: "تیکت هایی که انجام شدن"},
    {value: 'howManyTicketsHasDoneStatusIn12Month', key: "تعداد تیکت هایی که توی 12 ماهه گذشته انجام شدن"},
    {value: 'sendHiddenMessage', key: "بتونه توی سازمان بین کارمندا تیکت مخفی بفرسته، و باید پیامک هم ارسال نشه"},
    // {value: 'smsArchive', key: "دسترسی به آرشیو پیامک ها"},
    // {value: 'smsPending', key: "پیامک های در انتظار"},
    {value: 'smsSend', key: "ارسال دستی پیامک"},
    // دسترسی های فاکتور برای حسابفا
    {value: 'showBillAccess', key: "مشاهده فاکتور - این فعلا کاربردی نداره- قرار بود که کلا اینکه بدون لاگین بتونن فاکتور رو ببینن رو اینجا محدود کنم که  فعلا با لبنک میتونن ببینند"},
    {value: 'downloadBillAsPdf', key: "دانلود به صورت پی دی اف"},
    {value: 'downloadBillAsCsv', key: "دانلود به صورت csv"},
    {value: 'submitBillInSubmitOrderForm', key: "ثبت فاکتور در فرم ثبت سفارش"},
    {value: 'submitBillInChatList', key: "ثبت فاکتور در چت لیست"},
    {value: 'saveBillAsDraft', key: "ذخیره فاکتور به صورت پیش نویس؟"},
    {value: 'saveBillAsDone', key: "ذخیره فاکتور به صورت تایید شده"},
    {value: 'editBillInChatList', key: " ویرایش فاکتور در چت لیست  _ دکمه ی ویرایش در جدول فاکتور ها "},
    {value: 'deleteBill', key: "حذف یک فاکتور"},
    {value: 'allContactsWhenSubmitBill', key: "لیست کامل مشتری ها هنگام صدور فاکتور"},
    {value: 'showReportBillList', key: "لیست فاکتور فروش و گرفتن پیوت و اکسل"},
    {value: 'adminReport', key: "گزارش مدیریتی"},
    {value: 'basteBandi', key: "دسترسی به فاکتور ها برای بسته بندی"},
    {value: 'ersal', key: "دسترسی به فاکتور ها برای ارسال"},
    {value: 'hasAccessToUnCheckedSendPackages', key: "تغییر وضعیت سفارش به ارسال نشده!!!"},
    // report widget
    // widgetTotalBillsLast3Days
    // widgetUserStatus
    // widgetNumberOfBills7days
    // widgetAmountOfBills7days
    // widgetHowManyUsersThereAre
    {value: "widgetUserStatus", key: "ویجت وضعیت کاربران"},
    {value: "widgetNumberOfBills7days", key: "ویجت تعداد فاکتور های 7 روز گذشته"},
    {value: "widgetAmountOfBills7days", key: "ویجت مبلغ فاکتور های 7 روز گذشته"},
    {value: "widgetHowManyUsersThereAre", key: "ویجت تعداد کل کاربران سیستم"},
    //////////////////
    {value: "screenShotBills", key: "صفحه اسکرین شات کارا"},
    {value: "fatherAccess", key: "دسترسی Developer Mode"},
    {value: "showMyBillListForCustomer", key: "مشاهده ی منوی  فاکتور های من"},
    {value: "viewBills", key: " دکمه مشاهده فاکتور در جدول هایی که لازمه- برای مشتری و برای تایید فاکتور لازمه"},
    {value: "testBillCalculatePrice", key: "دسترسی به فاکتور تستی بعضی از مشتری ها بتونن جهت محاسبه قیمت خودشون صفحه ی فاکتور رو ببیند تا قیمت رو محاسبه کنند و به مشتریشون قیمت بدن. ابته که باید بلد باشن فاکتور رو خودشون بزنن - توی منوی کناری آیتم محاسبه قیمت فاکتور میاد."},

    {value: "myBankFirstUserId", key: "مشاهده ی قلک من ویژه تیم سفارش گیری که تیو سایت مبلع در آمد روز رو ببینند."},
    {value: "allBanksFirstUserId", key: "مشاهده ی قلک من ویژه حسابداری که جمع مبلغ ماهانه تیم سفارش گیری رو ببیند"},
    {value: "myBankDepartment", key: "مشاهده ی قلک دپارتمان سفارش گیری ویژه حسابداری که جمع مبلغ ماهانه تیم سفارش گیری رو ببیند. این مورد تنها در صورتی کار میکنه که  مقصذ سفارش ها  دپارتمان باشه و افزار سفارش گیر نباشند.( از توی تنظیمات مدیریتی عوض میشه)"},

    //  Dashboards
    {value: "customerDashboard", key: "داشبورد مشتری - شامل دکمه ها و سایر چیزایی که میتونم بهش اضافه کنم"},
    {value: "organizationDashboard", key: "داشبورد سازمانی کابران سازمان بهش دسترسی دارن"},
    {value: "departmentAdminDashboard", key: "داشبورد مدیر دپارتمان"},
    {value: "fullAdminDashboard", key: "داشبورد مدیر کل با دسترسی های فول"},
    {value: "showMyTicketList", key: "تیکت های من منحصر به فرد (مخصوص بچه های سفارش گیری که بتونن منحصر ب فرد چک کنند و ببین در کل چه تعداد سفارش براشون اومده و یا ببینند جوابی برای اون تیکت اومده یا نه. اینجوری کنترلش آسون تر میشه."},
    /////////////////////////////////////////////////
    
    {value: "canSetSeeChangeBillStatusButton", key: `توی بخش عملیات توی لیست فاکتورها دکمه ی تغییر وضعیت رو ببینه ؟`},
    {value: "canSetTextIntoBillStatus", key: `توی بخش عملیات توی لیست فاکتورها بتونه (متن) وارد کنه ؟`},
    {value: "canSetStatusBillToBasteBandi", key: `توی بخش عملیات توی لیست فاکتورها بتونه (بسته بندی) رو انتخاب کنه؟`},
    {value: "canSetStatusBillToTasvieShode", key: `توی بخش عملیات توی لیست فاکتورها بتونه (تسویه شده) رو انتخاب کنه؟`},
    {value: "canSetStatusBillToAmadeErsal", key: `توی بخش عملیات توی لیست فاکتورها بتونه (آماده ارسال) رو انتخاب کنه؟`},
    {value: "canSetStatusBillToErsalShode", key: `توی بخش عملیات توی لیست فاکتورها بتونه ( ارسال شده) رو انتخاب کنه؟`},



]

const isActiveRadioOptions = [
    {key: 'فعال', value: '1'},
    {key: 'غیر فعال', value: '0'},
]
const formikFormAddUser = [


    {control: 'input', name: 'name', label: "نام نقش", options: checkboxOptions},
    {control: 'input', name: 'description', label: "توضیحات", options: checkboxOptions},
    {control: 'checkbox', name: 'statusListCreate', label: "دسترسی ها", options: dropdownOptions},


]

export {
    checkboxOptions,
    validationSchemaAddUser,
    dropdownOptions,
    formikFormAddUser
}