import React, {useEffect, useRef, useState} from 'react';
import useObjectDataHolder from "../../../hooks/UseObjectDataHolder.tsx";
import ProductListTable from "../../../PriceListPage/ProductList.tsx";

const ShowMenuAndSubMenus = ({data}) => {

    const totalItems = [
        {
            title: "منوی اول", id: 1,
            subMenu: [
                {title: "زیر 1منوی اول", id: 1,},
                {title: "زیر 1منوی دوم", id: 2,},
                {title: "زیر 1منوی سوم", id: 3,},
                {title: "زیر 1منوی چهارم", id: 4,},
                {title: "زیر1 منوی پنجم", id: 5,},
                {title: "زیر1 منوی ششم", id: 6,},
                {title: "زیر1 منوی هفتم", id: 7,},
                {title: "زیر 1منوی هشتم", id: 8,},
            ],
        },
        {
            title: "منوی دوم", id: 2,
            subMenu: [
                {title: "زیر 2منوی اول", id: 1,},
                {title: "زیر 2منوی دوم", id: 2,},
                {title: "زیر 2منوی سوم", id: 3,},
                {title: "زیر 2منوی چهارم", id: 4,},
                {title: "زیر2 منوی پنجم", id: 5,},
                {title: "زیر2 منوی ششم", id: 6,},
                {title: "زیر2 منوی هفتم", id: 7,},
                {title: "زیر 2منوی هشتم", id: 8,},
            ],
        },
        {
            title: "منوی سوم", id: 3,
            subMenu: [
                {title: "زیر 3منوی اول", id: 1,},
                {title: "زیر 3منوی دوم", id: 2,},
                {title: "زیر 3منوی سوم", id: 3,},
                {title: "زیر 3منوی چهارم", id: 4,},
                {title: "زیر3 منوی پنجم", id: 5,},
                {title: "زیر3 منوی ششم", id: 6,},
                {title: "زیر3 منوی هفتم", id: 7,},
                {title: "زیر 3منوی هشتم", id: 8,},
            ],
        },
        {
            title: "منوی چهارم", id: 4,

            subMenu: [
                {title: "زیر 4منوی اول", id: 1,},
                {title: "زیر 4منوی دوم", id: 2,},
                {title: "زیر 4منوی سوم", id: 3,},
                {title: "زیر 4منوی چهارم", id: 4,},
                {title: "زیر34 منوی پنجم", id: 5,},
                {title: "زیر4 منوی ششم", id: 6,},
                {title: "زیر4 منوی هفتم", id: 7,},
                {title: "زیر 4منوی هشتم", id: 8,},
            ],
        },
        {title: "منوی پنجم", id: 5,},
        {title: "منوی ششم", id: 6,},
        {title: "منوی هفتم", id: 7,},
        {title: "منوی هشتم", id: 8,},
        {title: "منوی هشتم", id: 9,},
        {title: "منوی هشتم", id: 10,},
        {title: "منوی هشتم", id: 11,},
        {title: "منوی هشتم", id: 12,},
        {title: "منوی هشتم", id: 13,},
        {title: "منوی هشتم", id: 14,},
    ]
    const [selectedMenuId, setSelectedMenuId] = useObjectDataHolder({
        menuId: 1,
        subMenuId: 1
    })

    const selectedSubmenu = totalItems.find(row => row.id === selectedMenuId.menuId)?.subMenu
    const submenuRefs = useRef({}); // Store refs for each submenu item
    useEffect(() => {
        const currentSubmenu = submenuRefs.current[selectedMenuId.subMenuId];
        if (currentSubmenu) {
            currentSubmenu.scrollIntoView({behavior: "smooth", block: "nearest"});
        }
    }, [selectedMenuId.subMenuId, selectedMenuId.menuId]);


    try {
        return (
            <div>
                <div className="w-full lg:w-1024 mx-auto h-screen p-2">
                    <div style={{
                        height: "10vh",
                    }}>
                        <div
                            className="flex gap-1 overflow-x-scroll flex-nowrap w-full"
                            style={{overflowY: "hidden"}}
                        >
                            {totalItems.map((row) => (
                                <button
                                    onClick={() =>
                                        setSelectedMenuId({
                                            menuId: row.id,
                                            subMenuId: 1,
                                        })
                                    }
                                    key={row.id}
                                    className={`w-fit whitespace-nowrap h-10 px-2 py-1 rounded border border-black ${
                                        selectedMenuId.menuId === row.id && "bg-gray-400"
                                    }`}
                                >
                                    {row.title}
                                </button>
                            ))}
                        </div>
                        {/* Submenu */}
                        <div
                            className="flex gap-1 overflow-x-scroll flex-nowrap w-full my-2"
                            style={{overflowY: "auto"}}
                        >
                            {selectedSubmenu?.map((row) => (
                                <button
                                    ref={(el) => (submenuRefs.current[row.id] = el)} // Assign ref to each submenu item

                                    onClick={() =>
                                        setSelectedMenuId({
                                            ...selectedMenuId,
                                            subMenuId: row.id,
                                        })
                                    }
                                    key={row.id}
                                    className={`w-fit whitespace-nowrap h-10 px-2 py-1 rounded border border-black ${
                                        selectedMenuId.subMenuId === row.id && "bg-gray-400"
                                    }`}
                                >
                                    {row.title}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div
                        className={"overflow-scroll"}
                        style={{
                            height: "90vh",

                        }}
                    >
                        <div>
                            <div className="">
                                {data?.data?.List?.map((product) => (
                                    <div
                                        key={product.Id}
                                        className="bg-white shadow rounded  p-4 border border-gray-200 my-1"
                                    >
                                        <div className="flex justify-between">
                                            <h3 className="text-sm font-medium text-gray-700">
                                                {product.Name}
                                            </h3>
                                            <span className="text-xs font-medium text-gray-500">
                                    #{product.Code}
                                </span>
                                        </div>
                                        <div className="mt-2">
                                            <p className="text-xs text-gray-600">
                                                واحد : {product.Unit || "N/A"}
                                            </p>

                                            <p className="text-xs text-gray-600">
                                                قیمت: {product.SellPrice.toLocaleString()} تومان
                                            </p>
                                        </div>
                                        <div className="mt-2">
                                            <p className="text-xs text-gray-500">
                                                دسته بندی: {product.NodeName || "N/A"}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>


            </div>
        );

    } catch (error: any) {
        return <>{error.toString()}</>
    }
};

export default ShowMenuAndSubMenus;