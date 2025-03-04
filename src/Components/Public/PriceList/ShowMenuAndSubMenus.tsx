import React from 'react';
import useObjectDataHolder from "../../../hooks/UseObjectDataHolder.tsx";
import axios from "../../../api/axios.tsx";
import {useQuery} from "@tanstack/react-query";
import ItemList from "./ItemList.tsx";
import Skeleton from "../../Skeleton/Skeleton.tsx";

const ShowMenuAndSubMenus = () => {

    const queryFnProductList = async () => {
        const result = await axios.get("/public/productList")
        return result.data?.data?.List;
    }
    const {refetch, data, isError, isFetching, isLoading} = useQuery({
        queryKey: ["billDetailsData"],
        queryFn: queryFnProductList,
        staleTime: 100000,  // === 60*60*24*1000
        refetchOnMount: false,
    });
    const [selectedMenuId, setSelectedMenuId] = useObjectDataHolder({
        menuId: 1,
        subMenuId: 1,
    })

    const selectedSubmenu = data?.find(row => row.id === selectedMenuId.menuId)?.subMenu

    const showedItems = selectedSubmenu?.find(row => row.id === selectedMenuId.subMenuId)

    if (isLoading) {
        return <div className="w-full px-4 py-2 lg:w-1024 mx-auto  " >
            <div className="messages-skeleton">
                <Skeleton classes="skeleton  w-full h-6 "/>
                <Skeleton classes="skeleton  w-full h-14 "/>
                <Skeleton classes="skeleton  w-full h-14 "/>
                <Skeleton classes="skeleton  w-full h-16 "/>
                <Skeleton classes="skeleton  w-full h-16 "/>
                <Skeleton classes="skeleton  w-full h-16 "/>
                <Skeleton classes="skeleton  w-full h-16 "/>
                <Skeleton classes="skeleton  w-full h-16 "/>
                <Skeleton classes="skeleton  w-full h-16 "/>
                <Skeleton classes="skeleton  w-full h-16 "/>
            </div>
        </div>
    }
    try {

        return (
            <div className="w-full px-4 py-2 lg:w-1024 mx-auto  ">
                <div
                    style={{
                        height: "5vh",
                        overflow: "hidden"
                    }}
                >
                    جزئیات محاسبه قیمت نمارنگ برای همکاران عزیز
                    <br/>
                    بالاترین خدمات را در کمترین زمان با بهترین قیمت تقدیم شما همکاران عزیز میکنیم.
                    {/*همکار گرامی سیستم فروش حروف همکاری ما به این صورت می باشد که قیمت متریال را با اجرت های ساخت و برش و حتی چسب و ... بصورت جز به جز برای شما محاسبه میکنیم تا براحتی بتوانید مقایسه ای کامل داشته باشید از ساخت توسط خودتان یا برون سپاری به مجموعه ی نمارنگ. مدعی هستیم بالاترین خدمات را در کمترین زمان با بهترین قیمت تقدیم شما همکاران عزیز میکنیم.*/}
                </div>
                <div
                    className={""}
                    style={{
                        height: "20vh",
                        overflow: "hidden"
                    }}
                >
                    <div
                        className=" flex gap-1 overflow-x-auto flex-nowrap w-full "
                        style={{overflowY: "hidden"}}
                    >
                        {data.map((row) => (
                            <button
                                onClick={() =>
                                    setSelectedMenuId({
                                        menuId: row.id,
                                        subMenuId: 1,
                                    })
                                }
                                key={row.id}
                                className={` flex items-center justify-center  w-32 whitespace-nowrap h-16 px-2 py-1 rounded text-gray-800 font-bold   ${
                                    selectedMenuId.menuId === row.id ? " bg-blue-200 " : " bg-gray-100 "
                                } `}
                            >
                                <div>{row.title}</div>
                            </button>
                        ))}
                    </div>
                    {/* Submenu */}
                    <div
                        className="flex gap-1 overflow-x-auto flex-nowrap w-full my-2"
                        style={{overflowY: "auto"}}
                    >
                        {selectedSubmenu?.map((row) => (
                            <button
                                // ref={(el) => (submenuRefs.current[row.id] = el)} // Assign ref to each submenu item
                                onClick={() =>
                                    setSelectedMenuId({
                                        subMenuId: row.id,
                                    })
                                }
                                key={row.id}
                                className={
                                    ` flex items-center justify-center  w-32 whitespace-nowrap h-16 px-2 py-1 rounded text-gray-800 font-bold   ${
                                        selectedMenuId.subMenuId === row.id ? " bg-blue-200 " : " bg-gray-100 "
                                    } `
                                }
                                // className={`w-fit whitespace-nowrap h-10 px-2 py-1 rounded border border-black ${
                                //     selectedMenuId.subMenuId === row.id && " bg-blue-200 "
                                // }`}
                            >
                                {row.title}
                            </button>
                        ))}
                    </div>
                </div>
                <div
                    className={"overflow-y-auto rounded "}
                    style={{
                        height: "70vh",

                    }}
                >
                    <div>
                        <div className="">
                            {/*{JSON.stringify(showedItems)}*/}
                            <ItemList data={showedItems}/>
                        </div>
                    </div>
                </div>

            </div>
        );

    } catch (error: any) {
        return <>چیزی نیست!</>
    }
};
export default ShowMenuAndSubMenus;