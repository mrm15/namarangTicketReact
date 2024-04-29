import React, {useContext, useEffect} from "react";
import {HiMenuAlt3} from "react-icons/hi";
import {MdOutlineDashboard} from "react-icons/md";
// import { RiSettings4Line } from "react-icons/ri";
// import { TbReportAnalytics } from "react-icons/tb";
import {
    AiOutlineHeart,
    AiOutlineUser
    /*, AiOutlineHeart*/
} from "react-icons/ai";
import {
    FiFolder,
    FiMessageSquare, FiShoppingCart
    // , FiFolder
    // , FiShoppingCart
} from "react-icons/fi";
import {Link} from "react-router-dom";
import {IconType} from "react-icons";
import {PAGES} from "../../Pages/Route-string.tsx";
import {useDispatch, useSelector} from "react-redux";
import {sidebarActions} from "../../store/sidebarReducer/sidebarReducer.tsx";
import {RiSettings4Line} from "react-icons/ri";
import {TbReportAnalytics} from "react-icons/tb";
import useAuth from "../../hooks/useAuth.tsx";
import {ROLES} from "../../Pages/ROLES.tsx";


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
const Home = () => {

    const dispatch = useDispatch();
    // @ts-ignore
    const isOpen = useSelector(s => s.sidebarReducer.isOpen);
    // @ts-ignore
    const isMobile = useSelector(s => s.sidebarReducer.isMobile);
    //const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);


    const updateDimensions = () => {
        const isMobile = window.innerWidth <= 768
        // @ts-ignore
        dispatch(sidebarActions.fillInput({isMobile}));
    };
    const toggleSidebar = () => {
        //dispatch(sellFactorActions.changeNumberHandler({id, column, event}))
        // @ts-ignore
        dispatch(sidebarActions.fillInput({isOpen: !isOpen}));
    };

    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => {
            window.removeEventListener("resize", updateDimensions);
        };
    }, []);

    // @ts-ignore
    const {auth} = useAuth();

    const {roleAccessList} = auth.userInfo;


    const showUserCreateItem = roleAccessList?.includes('userCreate');

    const userCreateLink = PAGES.USER_ADD_EDIT






    const menus: MenuType = [
        {name: "داشبورد", link: '/', icon: MdOutlineDashboard, margin: false, showItem: true,},
        {name: "افزودن کاربر", link: PAGES.USER_ADD_EDIT, icon: TbReportAnalytics, showItem: roleAccessList?.includes('userCreate'),},
        {name: "مشاهده کاربر", link: PAGES.USER_LIST, icon: TbReportAnalytics, showItem: roleAccessList?.includes('userReadAll'),},
        //
        {name: "افزودن نقش", link: PAGES.ROLE_ADD_EDIT, icon: TbReportAnalytics, showItem: roleAccessList?.includes('rolesCreate'),},
        {name: "لیست نقش", link: PAGES.ROLE_LIST, icon: TbReportAnalytics, showItem: roleAccessList?.includes('rolesRead'),},
        //
        {name: "افزودن دپارتمان", link: PAGES.DEPARTMENT_ADD_EDIT, icon: TbReportAnalytics, showItem: roleAccessList?.includes('departmentCreate'),},
        {name: "لیست دپارتمان", link: PAGES.DEPARTMENT_LIST, icon: TbReportAnalytics, showItem: roleAccessList?.includes('departmentRead'),},
        //
        {name: "افزودن استاتوس", link: PAGES.STATUS_ADD_EDIT, icon: TbReportAnalytics, showItem: roleAccessList?.includes('statusListCreate'),},
        {name: "لیست استاتوس", link: PAGES.STATUS_LIST, icon: TbReportAnalytics, showItem: roleAccessList?.includes('statusListRead'),},
        //
        {name: "افزودن فایل", link: PAGES.FILE_ADD_EDIT, icon: TbReportAnalytics, showItem: roleAccessList?.includes('fileCreate'),},
        {name: "لیست فایل", link: PAGES.FILE_LIST, icon: TbReportAnalytics, showItem: roleAccessList?.includes('fileRead'),},
        //
        {name: "ثبت سفارش", link: PAGES.ticket_Create, icon: TbReportAnalytics, showItem: roleAccessList?.includes('ticketCreate'),},
        {name: "پیگیری سفارش", link: PAGES.ticket_own_sent, icon: TbReportAnalytics, showItem: roleAccessList?.includes('fileRead'),},
        {name: "کل سفارشات", link: PAGES.ticket_read_my_all_tickets, icon: TbReportAnalytics, showItem: roleAccessList?.includes('ticketReadOwnReceived'),},
        {name: "ورودی دپارتمان", link: PAGES.ticketInbox, icon: TbReportAnalytics, showItem: roleAccessList?.includes('ticketInput'),},
        {name: "سفارشات کل", link: PAGES.ticket_Read_All, icon: TbReportAnalytics, showItem: roleAccessList?.includes('ticketReadAll'),},
        //
        {name: "تنظیمات مدیر", link: PAGES.admin_settings, icon: TbReportAnalytics, showItem: roleAccessList?.includes('adminSettings'),},
        //



    ];
    return (
        <section className={``}>
            <div
                className={`bg-[#334667] min-h-screen 
                ${isOpen ? "w-44 px-4 " : isMobile ? "width__0" : "w-16 px-4"}
               
                 duration-500 text-gray-100 `}
            >
                <div className="py-3 flex justify-end">
                    <HiMenuAlt3
                        size={26}
                        className="cursor-pointer"
                        onClick={toggleSidebar}
                    />
                </div>
                <div className="mt-4 flex flex-col gap-4 relative">
                    {menus?.filter(row => row.showItem === true).map((menu, i) => (
                        <Link
                            to={menu?.link}
                            key={i}
                            className={` ${
                                menu?.margin && "mt-5"
                            } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
                        >
                            <div>{React.createElement(menu?.icon, {size: "20"})}</div>
                            <h2
                                style={{
                                    transitionDelay: `${i + 3}00ms`,
                                }}
                                className={`whitespace-pre duration-500 ${
                                    !isOpen && "opacity-0 translate-x-28 overflow-hidden"
                                }`}
                            >
                                {menu?.name}
                            </h2>
                            <h2
                                className={`${
                                    isOpen && "hidden"
                                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                            >
                                {menu?.name}
                            </h2>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Home;
