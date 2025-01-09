import React, {useEffect, useRef, useState} from 'react';
import useObjectDataHolder from "../../../hooks/UseObjectDataHolder.tsx";
import ProductListTable from "../../../PriceListPage/ProductList.tsx";

const ShowMenuAndSubMenus = ({data}) => {

    const totalItems = [
        {
            title: "ورق ها", id: 1,
            subMenu: [
                {title: "پلکسی گلاس ", id: 1,},
                {title: "استیل", id: 2,},
                {title: "آهن", id: 3,},
                {title: "آلومینیوم", id: 4,},
                {title: "پی وی سی", id: 5,},
            ],
        },
        {
            title: "لبه ها", id: 2,
            subMenu: [
                {title: "چلنیوم ", id: 1,},
                {title: "سوئدی", id: 2,},
                {title: "پلکسی", id: 3,},
                {title: "استیل", id: 4,},
                {title: "آهن", id: 5,},
            ],
        },
        {
            title: "چسب ها", id: 3,
            subMenu: [
                {title: "123 درجه یک ترک (متر)", id: 1,},
                {title: "کلر فرم برای دوبل پلکسی (متر بر خط)", id: 2,},
                {title: "چسب کلرسفت برای لبه پلاستیک (متربرخط)", id: 3,},
                {title: "آکواریوم برای محکم کردن حروف (متربرخط)", id: 4,},
                {title: "پولی اورتان برای محکم کردن حروف (متربرخط)", id: 5,},
                {title: "پولی اورتان برای چسباندن استیل و فلز به پلکسی (مساحت قطعه)", id: 6,},
            ],
        },
        {
            title: "اجرت برش", id: 4,

            subMenu: [
                {title: "برش پلکسی ", id: 1,},
                {title: "برش فلزات ( فایبر )", id: 2,},
                {title: "برش سی ان سی ( مته )", id: 3,},
                {title: "برش پی وی سی", id: 4,},
                {title: "برش ام دی اف", id: 5,},
            ],
        },
        {
            title: "اجرت ساخت", id: 5,
            subMenu: [
                {title: "چلنیوم آسان و سخت", id: 1,},
                {title: "سوئدی آسان و سخت", id: 2,},
                {title: "پلاستیک آسان و سخت و کاردستی", id: 3,},
                {title: "+ پلاستیک مولتی بند  آسان و سخت و کاردستی", id: 4,},
                {title: "جوش استیل آسان و سخت", id: 5,},
                {title: "جوش آهن آسان و سخت", id: 6,},
                {title: "جوش فایبر آسان و سخت", id: 7,},
                {title: "المان شهری، آسان و سخت و کاردستی", id: 8,},
            ],

        },
        {
            title: "دوبل و خدمات  متفرقه", id: 6,
            subMenu: [
                {title: "دوبل پلکسی", id: 1,},
                {title: "پوست کن کردن لبه و پلکسی و سلفون کردن روی کار", id: 2,},
                {title: "پلات نصب ( متر طول کاغذ )", id: 3,},
                {title: "پیچ نصب حروف به تعداد لازم", id: 4,},
                {title: "تغییر سیم سیم کشی به 50 سانتی متری", id: 5,},
                {title: "تغییر سیم سیم کشی به 75 سانتی متری", id: 6,},
                {title: "تغییر سیم سیم کشی به 100 سانتی متری", id: 7,},
            ],
        },
        {
            title: "اس ام دی ( نور)", id: 7,
            subMenu: [
                {title: "اس ام دی رزین چهار مقاومت ", id: 1,},
                {title: "اس ام دی اینجکشن اکونومی", id: 2,},
                {title: "اس ام دی اینجشمن سامسونگ", id: 3,},
                {title: "اس ام دی اینجشن 220 ولت", id: 4,},
            ],
        },
    ]
    const [selectedMenuId, setSelectedMenuId] = useObjectDataHolder({
        menuId: 1,
        subMenuId: 1
    })

    const selectedSubmenu = totalItems.find(row => row.id === selectedMenuId.menuId)?.subMenu
    const submenuRefs = useRef({}); // Store refs for each submenu item
    const itemsRef = useRef({})
    useEffect(() => {
        const currentSubmenu = submenuRefs.current[selectedMenuId.subMenuId];
        if (currentSubmenu) {
            currentSubmenu.scrollIntoView({behavior: "smooth", block: "nearest"});
        }

        const rnd = Math.floor(Math.random() * 1000)
        const currentItemsRef = itemsRef.current[rnd];
        if (currentItemsRef) {
            console.log(rnd)
            currentItemsRef.scrollIntoView({behavior: "smooth", block: "start"});
        }
    }, [selectedMenuId.subMenuId, selectedMenuId.menuId]);


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
                            height: "70vh",

                        }}
                    >
                        <div>
                            <div className="">
                                {data?.map((product, index) => {


                                    if (product?.type === "title") {

                                        return <div key={index + 8520000}
                                                    ref={(el) => (itemsRef.current[product.Id] = el)}
                                        >
                                            <div className={"bg-green-400 px-2"}>
                                                {product?.title}
                                            </div>

                                        </div>
                                    }
                                    return <div

                                        key={product.Id}
                                        className="bg-white shadow rounded  p-4 border border-gray-200 my-1"
                                    >
                                        <div className="flex justify-between">
                                            <h3 className="text-sm font-medium text-gray-700">
                                                {product.Name}
                                                <div>{product.Id}</div>
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
                                })}
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