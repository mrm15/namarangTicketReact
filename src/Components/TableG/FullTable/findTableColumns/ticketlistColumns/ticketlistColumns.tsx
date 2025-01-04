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
import CheckBoxHeader from "../../components/CheckBoxHeader/CheckBoxHeader.tsx";
import CheckBoxCell from "../../components/CheckBoxCell/CheckBoxCell.tsx";
import StringFilter from "../../Filters/StringFilter/StringFilter.tsx";
import NumberFilterInTableG from "../../Filters/NumberFilter/NumberFilterInTableG.tsx";


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
        {
            id: "select",
            accessorKey: 'select',
            type:"select",
            uniqId:"_id", // وقتی چک باکس داریم این مورد اجباریه
            // showCheckBoxInHeader:true,
            header: (info) => {
                return <>

                    <CheckBoxHeader
                        info={info}

                    />
                </>
            },
            cell: (info) => {


                return  <CheckBoxCell cellInfo={info} />
            },
        },

        // _عنوان سفارش
        {
            id: "title",
            accessorKey: 'title',
            header: (info) => {
                return <>
                    <StringFilter uniqueId={"title"} operator={"*"} property={"title"} placeHolder={"عنوان سفارش"} />

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
                    <div>کاربر ایجاد کننده سفارش</div>

                    {/*<FilterTextInTable*/}
                    {/*    placeHolder={"کاربر ایجاد کننده سفارش"}*/}
                    {/*    filterKey={"userCreateThisOrder"}*/}
                    {/*/>*/}
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
                        uniqId={"_id"}
                        ticketIdKey={"_id"}

                    />
                </>
            }
        },
        // شماره سفارش
        {
            id: "ticketNumber",
            accessorKey: 'ticketNumber',
            header: () => {
                return  <>
                    <NumberFilterInTableG uniqueId={"ticketNumber"} operator={"="} property={"ticketNumber"} placeHolder={"شماره تیکت  "} />
                </>
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
            id: "lastAssignedDepartmentName",
            accessorKey: 'lastAssignedDepartmentName',
            header: (info) => {
                return <>
                    <div>آخرین دپارتمان</div>
                    {/*<FilterTextInTable*/}
                    {/*    placeHolder={"دپارتمان"}*/}
                    {/*    filterKey={"assignedToDepartmentIdText"}*/}
                    {/*/>*/}
                </>
            },
            size: 150,
            minSize: 150,
            maxSize: 150,
        },
        //آخرین کاربر
        {
            id: "lastAssignedUserName",
            accessorKey: 'lastAssignedUserName',
            header: (info) => {
                return <>
                    <div>آخرین کاربر</div>
                    {/*<FilterTextInTable*/}
                    {/*    placeHolder={"آخرین کاربر"}*/}
                    {/*    filterKey={"assignToUserIdText"}*/}
                    {/*/>*/}
                </>
            },
            size: 150,
            minSize: 150,
            maxSize: 150,
        },
        // تاریخ ایجاد سفارش
        {
            id: "createAt",
            accessorKey: 'createAt',
            // header: "dateCreate",
            header: () => {

                return <div>
                    <div>تاریخ ثبت سفارش</div>
                    {/*<FilterTextInTable*/}
                    {/*    placeHolder={"تاریخ ثبت سفارش"}*/}
                    {/*    filterKey={"dateCreate"}*/}
                    {/*    operator={"="}*/}
                    {/*    filterType={"date"}*/}

                    {/*/>*/}
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

        {
            id: "statusName",
            accessorKey: 'statusName',
            header: (info) => {
                return <>
                    <div>وضعیت</div>
                    {/*<FilterTextInTable*/}
                    {/*    placeHolder={"lastChangeTimeStamp"}*/}
                    {/*    filterKey={"lastChangeTimeStamp"}*/}
                    {/*    filterType={"date"}*/}
                    {/*/>*/}
                </>
            },
            size: 200,
            minSize: 200,
            maxSize: 200,
            // hidden: false


        },
     // الویت
        {
            id: "priority",
            accessorKey: 'priority',
            header: (info) => {
                return <>
                    <StringFilter uniqueId={"priority"} operator={"*"} property={"priority"} placeHolder={"priority"} />

                </>
            },
            size: 150,
            minSize: 150,
            maxSize: 150,
            hidden:true,


        },


        // وضعیت
        {
            id: "statusText",
            accessorKey: 'statusText',

            header: (info) => {
                return <>
                    <div>وضعیت</div>
                    {/*<FilterTextInTable*/}
                    {/*    placeHolder={"وضعیت"}*/}
                    {/*    filterKey={"statusText"}*/}
                    {/*/>*/}
                </>
            },
            size: 150,
            minSize: 150,
            maxSize: 150,
            hidden:true,
        },

        // تعداد فایل ضمیمه
        {
            id: "numberOfAttachments",
            accessorKey: 'numberOfAttachments',
            // header: "نام",
            header: () => {

                return <>
                    <div>تعداد فایل ضمیمه</div>
                    {/*<FilterTextInTable*/}
                    {/*    placeHolder={"تعداد فایل ضمیمه"}*/}
                    {/*    filterKey={"numberOfAttachments"}*/}
                    {/*    operator={"="}*/}
                    {/*    filterType={"number"}*/}
                    {/*/>*/}
                </>
            },


            // cell: info => <>{info.getValue()}</>,
            cell: (info) => {


                return <>{info.getValue()}</>
            },
            size: 90,
            minSize: 90,
            maxSize: 90,
        },

        // توضیحات سفارش
        {
            accessorKey: 'description',
            // header: 'توضیحات',
            header: (info) => {

                return <>
                    <StringFilter uniqueId={"description"} operator={"*"} property={"description"} placeHolder={"description"} />
                </>
            },

            size: 400,
            minSize: 400,
            maxSize: 400,
        },


        ///////////////////////////

        // hidden Cells
        {
            id: "_id",
            hidden: true,
            accessorKey: '_id',
            header: (info) => {
                return <>
                   شناسه
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


                    <StringFilter uniqueId={"userId"} operator={"*"} property={"userId"} placeHolder={"userId"} />


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

                    <StringFilter uniqueId={"assignedToDepartmentId"} operator={"*"} property={"assignedToDepartmentId"} placeHolder={"assignedToDepartmentId"} />

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
                    <StringFilter uniqueId={"assignedToUserId"} operator={"*"} property={"assignToUserId"} placeHolder={"کاربر مقصد"} />
                    </>
            },
            size: 150,
            minSize: 150,
            maxSize: 150,
        },



    ];

    return temp
};
