import React from "react";
import {ColumnDef, filterFns} from '@tanstack/react-table';
import {toast} from "react-toastify";
import {IInputObject} from "../findTableColumns.tsx";
import FilterTextInTable from "../../Filters/FilterTextInTable.tsx";
import {randomNumberGenerator} from "../../../../../utils/utilsFunction.tsx";
import {PAGES} from "../../../../../Pages/Route-string.tsx";
import {ICustomColumn} from "../../../myTableGTypes.tsx";
import DateShowltr from "../../components/DateShowltr.tsx";
import OperationColumInTicketTable from "../../components/OperationColumInTicketTable.tsx";


// Define the columns with the appropriate structure
export const ticketlistColumns = (inputs: IInputObject): ColumnDef<any>[] => {
    const {url, navigateTo, myAxios, setMyData, myData} = inputs;
    const temp: ICustomColumn<any>[] = [
        // 0_ردیف
        // 1_عنوان سفارش
        // 2_کاربر ایجاد کننده سفارش
        // 3_عملیات
        // 4_آخرین دپارتمان
        // 5_آخرین کاربر
        // 6_تاریخ آخرین تغییر
        // 7_توضیحات سفارش
        // 8_اولویت
        // 9_وضعیت

        // _ردیف
        {
            id: "rowNumber",
            accessorKey: 'rowNumber',
            header: (info) => {
                return <div
                    className={"rotate-90"}
                >
                    ردیف
                </div>
            },
            cell: (info) => {


                return <>{info.getValue()}</>
            },
            size: 30,
            minSize: 30,
            maxSize: 30,


        },
        // _عنوان سفارش
        {
            id: "title",
            accessorKey: 'title',
            header: (info) => {
                return <>
                    <FilterTextInTable
                        placeHolder={"عنوان سفارش"}
                        myData={myData}
                        setMyData={setMyData}
                        filterKey={"title"}
                    />
                </>
            },
            size: 150,
            minSize: 150,
            maxSize: 150,


        },
        // _کاربر ایجاد کننده سفارش
        {
            id: "userCreateThisOrder",
            accessorKey: 'userCreateThisOrder',
            header: (info) => {
                return <>
                    <FilterTextInTable
                        placeHolder={"کاربر ایجاد کننده سفارش"}
                        myData={myData}
                        setMyData={setMyData}
                        filterKey={"userCreateThisOrder"}
                    />
                </>
            },
            size: 200,
            minSize: 200,
            maxSize: 200,


        },
        // _عملیات
        {

            accessorKey: 'edit',
            header: 'عملیات',
            size: 120,
            minSize: 120,
            maxSize: 120,
            cell: ({row}) => {
                return <>
                    <OperationColumInTicketTable
                        row={row}
                        url={url}
                        navigateTo={navigateTo}
                        myAxios={myAxios}
                        setMyData={setMyData}
                        myData={myData}

                    />
                </>
            }
        },
        // شماره سفارش
        {
            id: "ticketNumber",
            accessorKey: 'ticketNumber',
            header: () => {

                return <FilterTextInTable
                    placeHolder={"شماره تیکت"}
                    myData={myData}
                    setMyData={setMyData}
                    filterKey={"ticketNumber"}
                    operator={"="}
                    filterType={"number"}

                />
            },


            // cell: info => <>{info.getValue()}</>,
            cell: (info) => {


                return <>{info.getValue()}</>
            },
            size: 90,
            minSize: 90,
            maxSize: 90,
        },
        // آخرین دپارتمان
        {
            id: "assignedToDepartmentIdText",
            accessorKey: 'assignedToDepartmentIdText',
            header: (info) => {
                return <>
                    <FilterTextInTable
                        placeHolder={"دپارتمان"}
                        myData={myData}
                        setMyData={setMyData}
                        filterKey={"assignedToDepartmentIdText"}
                    />
                </>
            },
            size: 150,
            minSize: 150,
            maxSize: 150,
        },
        //آخرین کاربر
        {
            id: "assignToUserIdText",
            accessorKey: 'assignToUserIdText',
            header: (info) => {
                return <>
                    <FilterTextInTable
                        placeHolder={"آخرین کاربر"}
                        myData={myData}
                        setMyData={setMyData}
                        filterKey={"assignToUserIdText"}
                    />
                </>
            },
            size: 150,
            minSize: 150,
            maxSize: 150,
        },
        // تاریخ ایجاد سفارش
        {
            id: "dateCreate",
            accessorKey: 'dateCreate',
            // header: "dateCreate",
            header: () => {

                return <div>
                    <div>تاریخ ثبت سفارش</div>
                    <FilterTextInTable
                        placeHolder={"تاریخ ثبت سفارش"}
                        myData={myData}
                        setMyData={setMyData}
                        filterKey={"dateCreate"}
                        operator={"="}
                        filterType={"date"}

                    />
                </div>
            },


            // cell: info => <>{info.getValue()}</>,
            cell: (info) => {


                return <DateShowltr
                    info={info}
                />
            },
            size: 170,
            minSize: 170,
            maxSize: 170,
        },

        // تاریخ آخرین تغییر
        {
            id: "lastChangeTimeStamp",
            accessorKey: 'lastChangeTimeStamp',
            header: (info) => {
                return <>
                    <div> تاریخ آخرین تغییر</div>
                    <FilterTextInTable
                        placeHolder={"lastChangeTimeStamp"}
                        myData={myData}
                        setMyData={setMyData}
                        filterKey={"lastChangeTimeStamp"}
                        filterType={"date"}
                    />
                </>
            },
            size: 200,
            minSize: 200,
            maxSize: 200,
            hidden: true


        },
        // توضیحات سفارش
        {
            accessorKey: 'description',
            // header: 'توضیحات',
            header: (info) => {
                return <>
                    <FilterTextInTable
                        placeHolder={"توضیحات"}
                        myData={myData}
                        setMyData={setMyData}
                        filterKey={"description"}
                    />
                </>
            },

            size: 150,
            minSize: 150,
            maxSize: 150,
        },
        // الویت
        {
            id: "priority",
            accessorKey: 'priority',
            header: (info) => {
                return <>
                    <FilterTextInTable
                        placeHolder={"اولویت"}
                        myData={myData}
                        setMyData={setMyData}
                        filterKey={"priority"}
                    />
                </>
            },
            size: 150,
            minSize: 150,
            maxSize: 150,


        },


        // وضعیت
        {
            id: "statusText",
            accessorKey: 'statusText',

            header: (info) => {
                return <>
                    <FilterTextInTable
                        placeHolder={"وضعیت"}
                        myData={myData}
                        setMyData={setMyData}
                        filterKey={"statusText"}
                    />
                </>
            },
            size: 150,
            minSize: 150,
            maxSize: 150,
        },


        ///////////////////////////

        // hidden Cells
        {
            id: "_id",
            hidden: true,
            accessorKey: '_id',
            header: (info) => {
                return <>
                    <FilterTextInTable
                        placeHolder={"_id"}
                        myData={myData}
                        setMyData={setMyData}
                        filterKey={"id"}
                    />
                </>
            },
            size: 150,
            minSize: 150,
            maxSize: 150,


        },
        {
            id: "userId",
            hidden: true,
            accessorKey: 'userId',
            header: (info) => {
                return <>
                    <FilterTextInTable
                        placeHolder={"userId"}
                        myData={myData}
                        setMyData={setMyData}
                        filterKey={"userId"}
                    />
                </>
            },
            size: 150,
            minSize: 150,
            maxSize: 150,


        },
        {
            id: "assignedToDepartmentId",
            hidden: true,
            accessorKey: 'assignedToDepartmentId',
            header: (info) => {
                return <>
                    <FilterTextInTable
                        placeHolder={"assignedToDepartmentId"}
                        myData={myData}
                        setMyData={setMyData}
                        filterKey={"assignedToDepartmentId"}
                    />
                </>
            },
            size: 150,
            minSize: 150,
            maxSize: 150,
        },
        {
            id: "assignToUserId",
            hidden: true,
            accessorKey: 'assignToUserId',
            header: (info) => {
                return <>
                    <FilterTextInTable
                        placeHolder={"assignToUserId"}
                        myData={myData}
                        setMyData={setMyData}
                        filterKey={"assignToUserId"}
                    />
                </>
            },
            size: 150,
            minSize: 150,
            maxSize: 150,
        },


        // تعداد فایل ضمیمه
        {
            id: "numberOfAttachments",
            accessorKey: 'numberOfAttachments',
            // header: "نام",
            header: () => {

                return <FilterTextInTable
                    placeHolder={"تعداد فایل ضمیمه"}
                    myData={myData}
                    setMyData={setMyData}
                    filterKey={"numberOfAttachments"}
                    operator={"="}
                    filterType={"number"}

                />
            },


            // cell: info => <>{info.getValue()}</>,
            cell: (info) => {


                return <>{info.getValue()}</>
            },
            size: 90,
            minSize: 90,
            maxSize: 90,
        },
    ];

    return temp
};
