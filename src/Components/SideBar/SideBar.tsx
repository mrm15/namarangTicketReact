import React, {useEffect} from "react";
import {HiMenuAlt3} from "react-icons/hi";
import {Link} from "react-router-dom";
import "./SideBar.scss"
import {useDispatch, useSelector} from "react-redux";
import {sidebarActions} from "../../store/sidebarReducer/sidebarReducer.tsx";
import useAuth from "../../hooks/useAuth.tsx";
import {getMenus} from "./menus.tsx";

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


    const roleAccessList = auth.userInfo?.roleAccessList;

    const menus = getMenus(roleAccessList)



    return (
        <section className={`side__bar__styles`}>
            <div
                // className={` min-h-screen
                // ${isOpen ? "w-44 px-4 " : isMobile ? "width__0" : "w-16 px-4"}
                //  duration-500 text-gray-100 `}

                className={` 
                ${isOpen ? "w-44 px-4 " :  "width__0"}
                 duration-500  `}
            >
                <div className="py-3 flex justify-end">
                    <HiMenuAlt3
                        size={26}
                        className="cursor-pointer"
                        onClick={toggleSidebar}
                    />
                </div>
                <div className="mt-4 flex flex-col gap-4 relative overflow-visible">
                    {menus?.filter(row => row.showItem === true).map((menu, i) =>{

                        const hasMargin = menu?.margin
                        return <Link
                            to={menu?.link}
                            key={i}
                            className={` ${hasMargin ? "mt-5" : " " } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-blue-200  rounded-md`}
                        >
                            <div>{React.createElement(menu?.icon, {size: "20"})}</div>
                            <h2
                                style={{
                                    transitionDelay: `${i + 3}00ms`,
                                }}
                                // className={`whitespace-pre duration-500 ${
                                //     !isOpen && "opacity-0 translate-x-28 overflow-hidden"
                                // }`}
                                className={`whitespace-pre `}
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

                    })}
                </div>
            </div>
        </section>
    );
};

export default Home;
