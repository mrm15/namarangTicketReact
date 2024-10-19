import React, {useContext, useEffect, useState} from 'react';
import MyDatePicker from "../Components/MyDatePicker";
import {timestampToTimeFromHesabfa} from "../utils/utilsFunction.tsx";
import {ReportBillContext} from "./ReportBillContext.tsx";
import {useDebounce} from "../hooks/useDebounce.tsx";
import TdInput from "./TdInput.tsx";

const TableFilterSection = () => {


    return (
        <tr>
            <td className={'border-2 border-black   '}></td>
            <td className={'border-2 border-black   '}></td>
            <td className={'border-2 border-black  '}>
                {/*تاریخ*/}

                <TdInput
                    uniqId={"date-1"}
                    myKey={"Date"}
                    operator={">="}
                />
                <TdInput
                    uniqId={"date-2"}
                    myKey={"Date"}
                    operator={"<"}
                />
            </td>
            <td className={'border-2 border-black   '}>
                {/*عنوان مشتری*/}
                <TdInput
                    uniqId={"ContactTitle"}
                    myKey={"ContactTitle"}
                    placeholder={"عنوان مشتری"}

                />
            </td>
            <td className={'border-2 border-black   '}>
                {/*کد سفارش*/}
                <TdInput
                    uniqId={"Tag"}

                    myKey={"Tag"}
                    placeholder={"کد سفارش"}
                />
            </td>
            <td className={'border-2 border-black   '}>
                {/*فروشنده*/}
                <TdInput
                    uniqId={"tag2"}
                    myKey={"Tag"}
                    placeholder={"فروشنده"}
                />
            </td>
            <td className={'border-2 border-black   '}>
                {/*شماره فاکتور*/}
                <TdInput
                    uniqId={"Number"}
                    myKey={"Number"}
                    placeholder={"شماره فاکتور"}
                />
            </td>
            <td className={'border-2 border-black   '}>
                {/*پروژه*/}
                <TdInput
                    uniqId={"Project"}
                    myKey={"Project"}
                    placeholder={"پروژه"}
                />
            </td>
            <td className={'border-2 border-black   '}>
                {/*جمع فاکتور*/}
                <TdInput
                    uniqId={"Sum"}
                    myKey={"Sum"}
                    placeholder={"جمع فاکتور"}
                    operator={"="}

                />
            </td>
            <td className={'border-2 border-black   '}>

                {/*وضعیت فاکتور*/}
                <TdInput
                    uniqId={"Status"}
                    myKey={"Status"}
                    placeholder={"وضعیت فاکتور"}
                    operator={"="}
                />
            </td>
            <td className={'border-2 border-black   '}>
                {/*کد مشتری*/}
               </td>

        </tr>
    );
};

export default TableFilterSection;
