import {MdAssignment, MdAssignmentAdd, MdLocalFireDepartment, MdOutlineDashboard} from "react-icons/md";
import {PAGES} from "../../Pages/Route-string";
import {RiBillLine} from "react-icons/ri";
import {IoPersonAddSharp, IoShapes} from "react-icons/io5";
import {BsBuildingAdd, BsBuildingFill, BsFillModemFill, BsPersonVideo2} from "react-icons/bs";
import {FaBarsStaggered, FaFileCirclePlus, FaShapes} from "react-icons/fa6";
import {FaBackspace, FaFileAlt} from "react-icons/fa";
import {AiFillSetting} from "react-icons/ai";
import {IconType} from "react-icons";

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


export const getMenus=(roleAccessList): MenuType => [
    {name: "داشبورد", link: '/', icon: MdOutlineDashboard, margin: false, showItem: true,},
    {
        name: "گزارش مدیر",
        link: PAGES.adminReport,
        icon: RiBillLine,
        showItem: roleAccessList?.includes('adminReport'),
    },
    {
        name: "لیست فاکتور",
        link: PAGES.reportBill,
        icon: RiBillLine,
        showItem: roleAccessList?.includes('showReportBillList'),
    },
    {
        name: "بسته بندی ارسال",
        link: PAGES.basted_bandi_ersal,
        icon: RiBillLine,
        showItem: (roleAccessList?.includes('basteBandi') || roleAccessList?.includes('ersal')),
    },


    {
        name: "افزودن کاربر",
        link: PAGES.USER_ADD_EDIT,
        icon: IoPersonAddSharp,
        showItem: roleAccessList?.includes('userCreate'),
    },
    {
        name: "مشاهده کاربر",
        link: PAGES.USER_LIST,
        icon: BsPersonVideo2,
        showItem: roleAccessList?.includes('userReadAll'),
    },
    //
    {
        name: "افزودن نقش",
        link: PAGES.ROLE_ADD_EDIT,
        icon: IoShapes,
        showItem: roleAccessList?.includes('rolesCreate'),
    },
    {name: "لیست نقش", link: PAGES.ROLE_LIST, icon: FaShapes, showItem: roleAccessList?.includes('rolesRead'),},
    //
    {
        name: "افزودن دپارتمان",
        link: PAGES.DEPARTMENT_ADD_EDIT,
        icon: BsBuildingAdd,
        showItem: roleAccessList?.includes('departmentCreate'),
    }, //BsBuildingAdd
    {
        name: "لیست دپارتمان",
        link: PAGES.DEPARTMENT_LIST,
        icon: BsBuildingFill,
        showItem: roleAccessList?.includes('departmentRead'),
    },//BsBuildingFill
    //
    {
        name: "افزودن استاتوس",
        link: PAGES.STATUS_ADD_EDIT,
        icon: BsFillModemFill,
        showItem: roleAccessList?.includes('statusListCreate'),
    },//BsFillModemFill
    {
        name: "لیست استاتوس",
        link: PAGES.STATUS_LIST,
        icon: BsFillModemFill,
        showItem: roleAccessList?.includes('statusListRead'),
    },
    //
    {
        name: "افزودن فایل",
        link: PAGES.FILE_ADD_EDIT,
        icon: FaFileCirclePlus,
        showItem: roleAccessList?.includes('fileCreate'),
    },//FaFileCirclePlus
    {name: "لیست فایل", link: PAGES.FILE_LIST, icon: FaFileAlt, showItem: roleAccessList?.includes('fileRead'),},
    //
    {
        name: "ثبت سفارش",
        link: PAGES.ticket_Create,
        icon: MdAssignmentAdd,
        showItem: roleAccessList?.includes('ticketCreate'),
    },
    {
        name: "پیگیری سفارش",
        link: PAGES.ticket_own_sent,
        icon: MdAssignment,
        showItem: roleAccessList?.includes('fileRead'),
    },
    {
        name: "کل تیکت های من",
        link: PAGES.ticket_read_my_all_tickets,
        icon: FaBarsStaggered,
        showItem: roleAccessList?.includes('ticketReadOwnReceived'),
    },
    {
        name: "صندوق ورودی",
        link: PAGES.ticketInbox,
        icon: FaBackspace,
        showItem: roleAccessList?.includes('ticketInput'),
    },
    {
        name: "سفارشات کل",
        link: PAGES.ticket_Read_All,
        icon: MdLocalFireDepartment,
        showItem: roleAccessList?.includes('ticketReadAll'),
    },
    {
        name: "ورودی دپارتمان",
        link: PAGES.ticket_read_department_tickets,
        icon: MdLocalFireDepartment,
        showItem: roleAccessList?.includes('ticketReadAll'),
    },
    //
    {
        name: "تنظیمات مدیر",
        link: PAGES.admin_settings,
        icon: AiFillSetting,
        showItem: roleAccessList?.includes('adminSettings'),
    },
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