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
                    myKey={"Date"}
                    operator={"="}
                />
            </td>
            <td className={'border-2 border-black   '}>
                {/*عنوان مشتری*/}
                <TdInput
                    myKey={"ContactTitle"}
                    placeholder={"عنوان مشتری"}

                />
            </td>
            <td className={'border-2 border-black   '}>
                {/*کد سفارش*/}
                <TdInput
                    myKey={"Tag"}
                    placeholder={"کد سفارش"}
                />
            </td>
            <td className={'border-2 border-black   '}>
                {/*فروشنده*/}
                <TdInput
                    myKey={"Tag"}
                    placeholder={"فروشنده"}
                />
            </td>
            <td className={'border-2 border-black   '}>
                {/*شماره فاکتور*/}
                <TdInput
                    myKey={"Number"}
                    placeholder={"شماره فاکتور"}
                />
            </td>
            <td className={'border-2 border-black   '}>
                {/*پروژه*/}
                <TdInput
                    myKey={"Project"}
                    placeholder={"پروژه"}
                />
            </td>
            <td className={'border-2 border-black   '}>
                {/*جمع فاکتور*/}
                <TdInput
                    myKey={"Sum"}
                    placeholder={"جمع فاکتور"}
                />
            </td>
            <td className={'border-2 border-black   '}>

                {/*وضعیت فاکتور*/}
                <TdInput
                    myKey={"Status"}
                    placeholder={"وضعیت فاکتور"}
                />
            </td>
            <td className={'border-2 border-black   '}>
                {/*کد مشتری*/}
                <TdInput
                    myKey={"ContactCode"}
                    placeholder={"کد مشتری"}
                /></td>

        </tr>
    );
};

export default TableFilterSection;
