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
import DateShowTimeStampToDateLtr from "../../components/DateShowTimeStampToDateLtr.tsx";
import useAuth from "../../../../../hooks/useAuth.tsx";
import {getMenus} from "../../../../SideBar/menus.tsx";
import StringFilter from "../../Filters/StringFilter/StringFilter.tsx";
import NumberFilterInTableG from "../../Filters/NumberFilter/NumberFilterInTableG.tsx";


// Define the columns with the appropriate structure
export const ticketAssignmentListColumns = (inputs: IInputObject): ColumnDef<any>[] => {


    const {url, navigateTo, myAxios, setMyData, myData , auth} = inputs;
    // اگه دسترسی به کا ارجاعات داشت یه سری ستون ها رو نشونش میدم در غیر اینصورن نشونش نمیدم. همینجا تعیین میکنم نشون بدم یا ندم؟

    const mustShow = auth


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

                </>
            },
            size: 200,
            minSize: 200,
            maxSize: 200,


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
        // _عملیات
        {

            accessorKey: 'edit',
            header: 'عملیات',
            size: 150,
            minSize: 150,
            maxSize: 150,
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
                        ticketIdKey={"ticketId"}


                    />
                </>
            }
        },
        // شماره سفارش
        {
            id: "ticketNumber",
            accessorKey: 'ticketNumber',
            header: () => {

                return <NumberFilterInTableG uniqueId={"ticketNumber"} operator={"="} property={"ticketNumber"} placeHolder={"شماره تیکت  "} />

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
                    <div>دپارتمان</div>
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
            id: "assignToUserIdText",
            accessorKey: 'assignToUserIdText',
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
            id: "dateCreate",
            accessorKey: 'dateCreate',
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


                return <DateShowTimeStampToDateLtr
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
            hidden: true,
            cell: (info) => {


                return <DateShowTimeStampToDateLtr
                    info={info}
                />
            },


        },
        // الویت
        {
            id: "priority",
            accessorKey: 'priority',
            header: (info) => {
                return <>
                    <StringFilter uniqueId={"priority"} operator={"*"} property={"priority"} placeHolder={"اولویت"} />
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
                    <StringFilter uniqueId={"description"} operator={"*"} property={"description"} placeHolder={"توضیحات"} />
                </>
            },

            size: 400,
            minSize: 400,
            maxSize: 400,
        },
        ///////////////////////////

        // کاربر مقصد
        {
            accessorKey: 'assignedToUserIdText',
            header: (info) => {

                return <>
                    <StringFilter uniqueId={"assignedToUserIdText"} operator={"*"} property={"assignedToUserIdText"} placeHolder={"کاربر مقصد"} />
                </>
            },

            size: 150,
            minSize: 150,
            maxSize: 150,
        },
        ///////////////////////////
        // دپارتمان مقصد
        {
            accessorKey: 'assignedToDepartmentIdText',
            header: (info) => {

                return <>
                    <StringFilter uniqueId={"assignedToDepartmentIdText"} operator={"*"} property={"assignedToDepartmentIdText"} placeHolder={"دپارتمان مقصد"} />
                </>
            },

            size: 150,
            minSize: 150,
            maxSize: 150,
        },
        ///////////////////////////
        //isDeleteDestination مقصد حذفش کرده؟
        {
            accessorKey: 'isDeleteDestination',
            header: (info) => {

                return <>
                    <StringFilter uniqueId={"isDeleteDestination"} operator={"*"} property={"isDeleteDestination"} placeHolder={"isDeleteDestination"} />
                </>
            },

            size: 150,
            minSize: 150,
            maxSize: 150,
        },
        ///////////////////////////
        // assignedBy فرستنده
        {
            accessorKey: 'assignedByText',
            header: (info) => {

                return <>
                    <StringFilter uniqueId={"assignedByText"} operator={"*"} property={"assignedByText"} placeHolder={"فرستنده"} />

                </>
            },

            size: 150,
            minSize: 150,
            maxSize: 150,
        },
        ///////////////////////////
        // isDeleteFromAssignedBy فرستنده حذف کرده؟
        {
            accessorKey: 'isDeleteFromAssignedBy',
            header: (info) => {

                return <>
                    <StringFilter uniqueId={"isDeleteFromAssignedBy"} operator={"*"} property={"isDeleteFromAssignedBy"} placeHolder={"فرستنده حذف کرده؟"} />
                </>
            },

            size: 150,
            minSize: 150,
            maxSize: 150,
        },
        ///////////////////////////

        // assignDate تاریخ ارجاع تیکت
        {
            accessorKey: 'assignDate',
            header: (info) => {

                return <>
                    <StringFilter uniqueId={"assignDate"} operator={"*"} property={"assignDate"} placeHolder={"assignDate"} />

                </>
            },

            size: 150,
            minSize: 150,
            maxSize: 150,
            cell: (info) => {


                return <DateShowTimeStampToDateLtr
                    info={info}
                />
            },
        },
        ///////////////////////////
        //readStatus وضعیت خواندن
        {
            accessorKey: 'readStatus',
            header: (info) => {

                return <>
                    <StringFilter uniqueId={"readStatus"} operator={"*"} property={"readStatus"} placeHolder={"readStatus"} />
                </>
            },

            size: 150,
            minSize: 150,
            maxSize: 150,
        },
        ///////////////////////////
        ///////////////////////////
        //readDate تاریخ خواندن
        {
            accessorKey: 'readDate',
            header: (info) => {

                return <>
                    <StringFilter uniqueId={"readDate"} operator={"*"} property={"readDate"} placeHolder={"readDate"} />

                </>
            },

            size: 150,
            minSize: 150,
            maxSize: 150,
            cell: (info) => {


                return <DateShowTimeStampToDateLtr
                    info={info}
                />
            },
        },
        ///////////////////////////

        //numberOfAssign
        {
            accessorKey: 'numberOfAssign',
            header: (info) => {

                return <>
                    <StringFilter uniqueId={"numberOfAssign"} operator={"*"} property={"numberOfAssign"} placeHolder={"تعداد ارجاع"} />
                </>
            },

            size: 150,
            minSize: 150,
            maxSize: 150,
        },
        ///////////////////////////

        // assignmentType نوع ارجاع
        {
            accessorKey: 'assignmentType',
            header: (info) => {

                return <>
                    <StringFilter
                        uniqueId={"assignmentType"}
                        operator={"*"}
                        property={"assignmentType"}
                        placeHolder={"نوع ارجاع"}
                    />
                </>
            },

            size: 150,
            minSize: 150,
            maxSize: 150,
        },
        ///////////////////////////





    ];

    return temp
};
