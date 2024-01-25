import React, {useEffect} from "react";
import {HiMenuAlt3} from "react-icons/hi";
import {MdOutlineDashboard} from "react-icons/md";
// import { RiSettings4Line } from "react-icons/ri";
// import { TbReportAnalytics } from "react-icons/tb";
import {
    AiOutlineUser
    /*, AiOutlineHeart*/
} from "react-icons/ai";
import {
    FiMessageSquare
    // , FiFolder
    // , FiShoppingCart
} from "react-icons/fi";
import {Link} from "react-router-dom";
import {IconType} from "react-icons";
import {PAGES} from "../../Pages/Route-string.tsx";
import {useDispatch, useSelector} from "react-redux";
import {sidebarActions} from "../../store/sidebarReducer/sidebarReducer.tsx";


type CustomIconType = {
    icon: IconType;
    size: string;
}
type MenuType = {
    name: string;
    link: string;
    icon?: any | CustomIconType;
    margin?: boolean;
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
        dispatch(sidebarActions.fillInput({isOpen:!isOpen}));
    };

    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => {
            window.removeEventListener("resize", updateDimensions);
        };
    }, []);

    const menus: MenuType = [
        {name: "داشبورد", link: "/", icon: MdOutlineDashboard},
        {name: "مخاطب جدید", link: PAGES.ADD_CONTACT, icon: AiOutlineUser},
        {name: "لیست مخاطبین", link: PAGES.LIST_CONTACTS, icon: FiMessageSquare},
        {name: 'افزودن کاربر', link: PAGES.ADD_USER, icon: FiMessageSquare},
        {name: 'لیست کاربران', link: PAGES.LIST_USERS, icon: FiMessageSquare},
        // { name: "analytics", link: "/", icon: TbReportAnalytics, margin: true },
        // { name: "File Manager", link: "/", icon: FiFolder },
        // { name: "Cart", link: "/", icon: FiShoppingCart },
        // { name: "Saved", link: "/", icon: AiOutlineHeart, margin: true },
        // { name: "Setting", link: "/", icon: RiSettings4Line },
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
                    {menus?.map((menu, i) => (
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
