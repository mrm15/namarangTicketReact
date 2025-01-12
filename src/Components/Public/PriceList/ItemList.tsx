import React from 'react';
import {randomNumberGenerator} from "../../../utils/utilsFunction.tsx";
import {nanoid} from "@reduxjs/toolkit";

const ItemList = ({data}) => {

    try {
        return (
            <div>
                {data?.items?.map((items, index) => {
                    const uuid = nanoid(15)
                    return <div
                          key={uuid}
                        className="bg-white shadow rounded  p-4 border border-gray-200 my-1"
                    >
                        <div className="flex justify-between">
                            <h3 className="text-sm font-medium text-gray-700">
                                {items?.Name}
                                <div>{items.Id}</div>
                            </h3>
                            <span className="text-xs font-medium text-gray-500">
                                    #{items?.Code}
                                </span>
                        </div>
                        <div className="mt-2">
                            <p className="text-xs text-gray-600">
                                واحد : {items?.Unit || "N/A"}
                            </p>

                            <p className="text-xs text-gray-600">
                                قیمت: {items?.SellPrice?.toLocaleString()} تومان
                            </p>
                        </div>
                        <div className="mt-2">
                            <p className="text-xs text-gray-500">
                                دسته بندی: {items?.NodeName || "N/A"}
                            </p>
                        </div>
                    </div>
                })}

            </div>
        );
    } catch (e: any) {
        return <>{e.toString()}</>
    }
};

export default ItemList;