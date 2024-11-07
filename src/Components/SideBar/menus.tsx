import { MdAssignmentAdd, MdLocalFireDepartment, MdOutlineDashboard} from "react-icons/md";
import {PAGES} from "../../Pages/Route-string";
import {RiBillLine} from "react-icons/ri";
import { BsBuildingFill, BsFillModemFill, BsPersonVideo2} from "react-icons/bs";
import {FaShapes} from "react-icons/fa6";
import { MdAssignmentTurnedIn } from "react-icons/md";
import { FaEnvelope } from "react-icons/fa";
import { HiInboxArrowDown } from "react-icons/hi2";
import { FaFileAlt, FaShareSquare} from "react-icons/fa";
import {AiFillSetting} from "react-icons/ai";
import {IconType} from "react-icons";
import {ROLES} from "../../Pages/ROLES.tsx";
import { RiShareForward2Fill } from "react-icons/ri";


type CustomIconType = {
    icon: IconType;
    size: string;
}


type MenuType = {
    name: string;
    link: string;
    icon?: any | CustomIconType;
    margin?: boolean;
    showItem?: boolean;
}[]


export const getMenus=({roleAccessList, isDepartmentAdmin}:any): MenuType => [
    {name: "داشبورد", link: '/', icon: MdOutlineDashboard, margin: false, showItem: true,},
    {
        name: "گزارش مدیر",
        link: PAGES.adminReport,
        icon: RiBillLine,
        showItem: roleAccessList?.includes('adminReport'),
    },
    {
        name: "خروجی انبار",
        link: PAGES.reportBill,
        icon: RiBillLine,
        showItem: roleAccessList?.includes('showReportBillList'),
    },
    {
        name: "لیست فاکتور",
        link: PAGES.basted_bandi_ersal,
        icon: RiBillLine,
        showItem: roleAccessList?.includes('basteBandi') || roleAccessList?.includes('ersal') || (roleAccessList?.includes(ROLES.screenShotBills[0])) ,
    },
    {
        name: "فاکتورهای من",
        link: PAGES.showMyBillListForCustomer,
        icon: RiBillLine,
        showItem: roleAccessList?.includes(ROLES.showMyBillListForCustomer[0]) ,
    },



    //
    {
        name: "ثبت سفارش",
        link: PAGES.ticket_Create,
        icon: MdAssignmentAdd,
        showItem: roleAccessList?.includes(ROLES.ticketCreate[0]),
    },
    {
        // اگه دسترسی ثبت سفارسش داشت پس باید دسترسی پیگیری سفارش هم داشته باشه
        name: "پیگیری سفارش",
        link: PAGES.ticket_created_by_me,
        icon: MdAssignmentTurnedIn,
        showItem: roleAccessList?.includes(ROLES.ticketCreate[0]),
    },
    // {
    //     name: "کل تیکت های من",
    //     link: PAGES.ticket_read_my_all_tickets,
    //     icon: FaBarsStaggered,
    //     showItem: roleAccessList?.includes('ticketReadOwnReceived'),
    // },
    {
        name: "کل سفارشات سامانه",
        link: PAGES.ticket_Read_All,
        icon: MdLocalFireDepartment,
        showItem: roleAccessList?.includes('readAllTicketsInSystem'),
    },
    {
        // اگه کاربری ادمین دپارتمان باشه میتونه اینو ببینه. به همین سادگی
        name: "ورودی دپارتمان",
        link: PAGES.ticket_read_department_tickets,
        icon: HiInboxArrowDown ,
        showItem: isDepartmentAdmin,
    },
    {
        // assignTicketsInboxCanDelete
        // assignTicketsOutBoxCanDelete
        // assignTicketsShowAll
        name: "صندوق ورودی",
        // link: PAGES.ticket_Read_Own,
        link: PAGES.ticket_read_assign_tickets_inbox,
        icon: FaEnvelope,
        showItem: roleAccessList?.includes('assignTicketsInbox'),
    },
    {
        name: "ارجاع شده ها",
        link: PAGES.ticket_read_assign_tickets_outbox,
        icon: FaShareSquare,
        showItem: roleAccessList?.includes(ROLES.ticket_read_assign_tickets_outbox[0]),
    },
    {
        name: "کل ارجاعات",
        link: PAGES.ticket_read_assign_tickets_all,
        icon: RiShareForward2Fill,
        showItem: roleAccessList?.includes('assignTicketsShowAll'),
        margin:true,
    },
    //
    {
        name: "تنظیمات مدیر",
        link: PAGES.admin_settings,
        icon: AiFillSetting,
        showItem: roleAccessList?.includes('adminSettings'),
    },
    // {
    //     name: "افزودن کاربر",
    //     link: PAGES.USER_ADD_EDIT,
    //     icon: IoPersonAddSharp,
    //     showItem: roleAccessList?.includes('userCreate'),
    // },
    {
        name: "مشاهده کاربر",
        link: PAGES.USER_LIST,
        icon: BsPersonVideo2,
        showItem: roleAccessList?.includes('userReadAll'),
    },
    //
    // {
    //     name: "افزودن نقش",
    //     link: PAGES.ROLE_ADD_EDIT,
    //     icon: IoShapes,
    //     showItem: roleAccessList?.includes('rolesCreate'),
    // },
    {name: "لیست نقش", link: PAGES.ROLE_LIST, icon: FaShapes, showItem: roleAccessList?.includes('rolesRead'),},
    //
    // {
    //     name: "افزودن دپارتمان",
    //     link: PAGES.DEPARTMENT_ADD_EDIT,
    //     icon: BsBuildingAdd,
    //     showItem: roleAccessList?.includes('departmentCreate'),
    // }, //BsBuildingAdd
    {
        name: "لیست دپارتمان",
        link: PAGES.DEPARTMENT_LIST,
        icon: BsBuildingFill,
        showItem: roleAccessList?.includes('departmentRead'),
    },//BsBuildingFill
    //
    // {
    //     name: "افزودن استاتوس",
    //     link: PAGES.STATUS_ADD_EDIT,
    //     icon: BsFillModemFill,
    //     showItem: roleAccessList?.includes('statusListCreate'),
    // },//BsFillModemFill
    {
        name: "لیست استاتوس",
        link: PAGES.STATUS_LIST,
        icon: BsFillModemFill,
        showItem: roleAccessList?.includes('statusListRead'),
    },
    //
    // {
    //     name: "افزودن فایل",
    //     link: PAGES.FILE_ADD_EDIT,
    //     icon: FaFileCirclePlus,
    //     showItem: roleAccessList?.includes('fileCreate'),
    // },//FaFileCirclePlus
    {name: "لیست فایل", link: PAGES.FILE_LIST, icon: FaFileAlt, showItem: roleAccessList?.includes('fileRead'),},

    //
    // {
    //     name: "آرشیو پیام",
    //     link: PAGES.sms_archive,
    //     icon: FaMessage,
    //     showItem: roleAccessList?.includes('smsArchive'),
    // },
    // {
    //     name: "پیامک های در انتظار",
    //     link: PAGES.sms_pending,
    //     icon: FaMessage,
    //     showItem: roleAccessList?.includes('smsPending'),
    // },
    // {name: "ارسال پیام",
    //     link: PAGES.sms_send,
    //     icon: FaMessage,
    //     showItem: roleAccessList?.includes('smsSend'),
    // },
    //
    //

    //


];
