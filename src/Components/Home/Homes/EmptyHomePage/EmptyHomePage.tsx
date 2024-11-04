import React from 'react';
import LoadingSvg1 from "../../../../assets/Svg/LoadingSvg1";
import { RiRefreshLine } from "react-icons/ri";
import { PAGES } from "../../../../Pages/Route-string";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import { getMenus } from "../../../SideBar/menus";
import { randomNumberGenerator } from "../../../../utils/utilsFunction";

const EmptyHomePage = () => {
    const { auth } = useAuth();

    const roleAccessList = auth.userInfo?.roleAccessList;
    const isDepartmentAdmin = auth.userInfo?.isDepartmentAdmin;
    const menus = getMenus({ roleAccessList, isDepartmentAdmin });

    try {
        return (
            <div className="p-6 bg-gray-100 min-h-screen">
                <h1 className="text-3xl font-bold mb-6">داشبورد</h1>

                <section className="bg-white p-4 rounded-lg shadow-md mb-6">
                    <h2 className="text-xl font-semibold mb-3">میانبر ها</h2>

                    <div className=" w-fit flex  flex-wrap  gap-2">

                        {menus?.filter(row => row.showItem === true).map((menu, i) => {
                            const hasMargin = menu?.margin;

                            return (
                                <Link
                                    to={menu?.link}
                                    key={i}
                                    className={`group flex items-center text-lg font-medium p-4 rounded-md bg-blue-500 hover:bg-blue-700 text-white transition duration-300 ${hasMargin ? "mt-5" : ""}`}
                                >
                                    <div className="mr-3">
                                        {React.createElement(menu?.icon, { size: "24" })}
                                    </div>
                                    &nbsp;&nbsp;
                                    <span>{menu?.name}</span>
                                </Link>
                            );
                        })}
                    </div>
                </section>
            </div>
        );
    } catch (error) {
        return <>{error.toString()}</>;
    }
};

export default EmptyHomePage;
