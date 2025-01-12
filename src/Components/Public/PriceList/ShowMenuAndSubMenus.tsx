import React, {useEffect, useRef, useState} from 'react';
import useObjectDataHolder from "../../../hooks/UseObjectDataHolder.tsx";
import ProductListTable from "../../../PriceListPage/ProductList.tsx";
import axios from "../../../api/axios.tsx";
import {useQuery} from "@tanstack/react-query";
import ItemList from "./ItemList.tsx";

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

    const showedItems = selectedSubmenu?.find(row=>row.id===selectedMenuId.subMenuId)

    // useEffect(() => {
    //     const currentSubmenu = submenuRefs.current[selectedMenuId.subMenuId];
    //     if (currentSubmenu) {
    //         currentSubmenu.scrollIntoView({behavior: "smooth", block: "nearest"});
    //     }
    //
    //     const rnd = Math.floor(Math.random() * 1000)
    //     const currentItemsRef = itemsRef.current[rnd];
    //     if (currentItemsRef) {
    //         console.log(rnd)
    //         currentItemsRef.scrollIntoView({behavior: "smooth", block: "start"});
    //     }
    // }, [selectedMenuId.subMenuId, selectedMenuId.menuId]);


    // return <pre  className={"ltr"} >
    // {JSON.stringify(data)}
    // </pre>

    try {
        return (
            <div>
                <div className="w-full lg:w-1024 mx-auto  ">
                    <div
                        className={"bg-blue-500"}
                        style={{
                            height: "10vh",
                        }}>
                        <div
                            className="flex gap-1 overflow-x-scroll flex-nowrap w-full"
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
                                    // ref={(el) => (submenuRefs.current[row.id] = el)} // Assign ref to each submenu item

                                    onClick={() =>
                                        setSelectedMenuId({
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
                            height: "70vh",

                        }}
                    >
                        <div>
                            <div className="">
                                {/*{JSON.stringify(showedItems)}*/}
                                <ItemList data={showedItems} />
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