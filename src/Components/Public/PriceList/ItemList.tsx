import React from 'react';
import {formatNumber} from "../../../utils/utilsFunction.tsx";
import {nanoid} from "@reduxjs/toolkit";
import NamarangLogoSvg from "../../../assets/Svg/NamarangLogoSvg.tsx";

const ItemList = ({data}) => {

    try {
        return (
            <div>
                {data?.items?.map((items, index) => {
                    const uuid = nanoid(15)
                    return <div key={uuid} className="bg-white shadow rounded  p-4 border border-gray-200  my-1 ">
                        <div className={"flex justify-between"}>
                            <div>
                                <div className="flex justify-between">
                                    <h3 className="text-sm font-medium text-gray-700">
                                        {items?.Name}
                                        {/*<div>{items.Id}</div>*/}
                                    </h3>
                                </div>
                                <div className="mt-2">
                                    <p className="text-xs text-gray-600">
                                        واحد : {items?.Unit || ""}
                                    </p>
                                    <p className="text-xs text-gray-600">
                                        قیمت: {items?.SellPrice?.toLocaleString()} تومان
                                    </p>
                                    <p className="text-xs text-gray-600">
                                        {items?.SubUnit &&
                                          <div className={" border-t my-2"}>
                                            واحد:
                                              {items?.SubUnit}
                                            <br/>
                                            قیمت:
                                              {formatNumber((items.SellPrice / items.ConversionFactor).toFixed(2))}
                                            &nbsp;
                                            تومان
                                          </div>
                                        }
                                    </p>
                                </div>
                                {/*<div className="mt-2">*/}
                                {/*    <p className="text-xs text-gray-500">*/}
                                {/*        دسته بندی: {items?.NodeName || "N/A"}*/}
                                {/*    </p>*/}
                                {/*</div>*/}
                            </div>
                            <div className={"text-center"}>
                                <div className={"border border-gray-200 rounded text-center"}>
                                    <NamarangLogoSvg height={100} width={100}/>
                                </div>
                                <div className={"font-poppins fontSize12"}>{items?.Code}</div>
                            </div>
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