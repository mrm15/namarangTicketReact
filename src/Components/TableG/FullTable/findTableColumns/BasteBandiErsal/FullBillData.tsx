import React from "react";
import {ColumnDef, filterFns} from '@tanstack/react-table';
import {IInputObject} from "../findTableColumns";
import {ICustomColumn} from "../../../myTableGTypes";
import SendStatus from "./SendStatus.tsx";
import ShowDateFromHesabfa from "./ShowDateFromHesabfa.tsx";
import ContactNumber from "./ContactNumber.tsx";
import FilterButtons from "../../Filters/DateFilter/FilterButtons.tsx";
import StringFilter from "../../Filters/StringFilter/StringFilter.tsx";
import NumberFilterInTableG from "../../Filters/NumberFilter/NumberFilterInTableG.tsx";
import SelectOptionFilter from "../../Filters/SelectOptionFilter/SelectOptionFilter.tsx";
import DatesFilter from "../../Filters/DatesFilter/DatesFilter.tsx";


const NameShow = ({info}) => {


    return <div>{info.getValue()}</div>
}
const RowNumberShow = ({info}) => {
    return (
        <span
            style={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap", // Change textWrap to whiteSpace
                overflow: "hidden" // Add overflow to handle ellipsis
            }}
        >
            {info.getValue()}
        </span>
    );
};
// Define the columns with the appropriate structure
export const FullBillData = (inputs: IInputObject): ColumnDef<any>[] => {
    const {url, navigateTo, myAxios, setMyData, myData} = inputs;
    const temp: ICustomColumn<any>[] = [
        {
            id: "rowNumber",
            accessorKey: 'rowNumber',
            header: (info) => {
                return <>

                </>
            },
            size: 30,
            minSize: 30,
            maxSize: 30,
            cell: (info) => <RowNumberShow info={info}/>,
            hidden: false,

        },

        {
            // accessorKey: 'عنوان سفارش',
            // header: 'عنوان سفارش',
            header: () => <div>

                {/*<div>  عنوان سفارش</div>*/}
                <StringFilter
                    uniqueId={"ContactTitle"}
                    operator={"*"}
                    property={"ContactTitle"}
                    placeHolder={"عنوان مشتری"}
                />
            </div>,
            id: "ContactTitle",
            accessorKey: 'ContactTitle',
            // header: (info) => {
            //     return <>
            //         ردیف
            //     </>
            // },
            cell: (cellInfo) => {

                return <>
                    <RowNumberShow
                        info={cellInfo}
                    />

                </>
            },
            size: 200,
            minSize: 200,
            maxSize: 200,

        },
        {
            // accessorKey: 'عنوان سفارش',
            // header: 'شماره تماس',
            // چون توی آبجکت اصلی نیست نمیتونمیم فیلتر بزاریم//

            header: () => <div>
                <div>شماره تماس</div>
            </div>,
            id: "contactNumber",
            accessorKey: 'contactNumber',
            // header: (info) => {
            //     return <>
            //         ردیف
            //     </>
            // },
            cell: (cellInfo) => {

                return <ContactNumber
                    info={cellInfo}
                />
            },
            size: 150,
            minSize: 150,
            maxSize: 150,
        },


        {
            // header: 'تاریخ ثبت',
            id: "Date",
            accessorKey: 'Date',
            header: (info) => {
                return <div>
                    {/*<div style={{width: 50}}>*/}
                    {/*    تاریخ ثبت*/}
                    {/*</div>*/}
                    {/*<FilterTextInTable*/}
                    {/*    uniqueId={"Date"}*/}
                    {/*    property={"Date"}*/}
                    {/*    filterType={"date"}*/}
                    {/*    operator={"="}*/}
                    {/*/>*/}
                    {/*<FilterButtons*/}
                    {/*    uniqueId={"Date"}*/}
                    {/*    property={"Date"}*/}
                    {/*    dateTypeShow={"hesabfa"}*/}

                    {/*/>*/}
                    <DatesFilter
                            property={"Date"}
                            model ={"advanced"}
                            dateFormatValue ={"hesabfa"}
                    />
                </div>
            },
            cell: (cellInfo) => <ShowDateFromHesabfa info={cellInfo}/>,
            size: 200,
            minSize: 200,
            maxSize: 200,
        },

        {
            // accessorKey: 'عنوان سفارش',
            header: 'استان شهر',
            id: "Contact",
            accessorKey: 'Contact',
            // header: (info) => {
            //     return <>
            //         ردیف
            //     </>
            // },

            cell: (cellInfo) => {

                const city = cellInfo.row.original?.Contact?.City || "";
                const state = cellInfo.row.original?.Contact?.State || "";

                return <>{state + " " + city}</>
            },
            size: 90,
            minSize: 90,
            maxSize: 90,
        },

        {
            id: "Number",
            accessorKey: 'Number',
            // header: "شماره فاکتور",
            header: () => <div>
                {/*<div>شماره فاکتور</div>*/}
                {/*<FilterTextInTable*/}
                {/*    uniqueId={"Number"}*/}
                {/*    placeHolder={"شماره فاکتور"}*/}
                {/*    property={"Number"}*/}
                {/*/>*/}
                <NumberFilterInTableG
                    uniqueId={"Number"}
                    placeHolder={"شماره فاکتور"}
                    property={"Number"}
                    operator={"*"}
                />
            </div>,

            cell: (info) => {

                const constIsVerified = info.row.original.Status === 1
                return <div className={"text-right"}>
                    <NameShow {...inputs} info={info}/>
                </div>
            },
            size: 100,
            minSize: 100,
            maxSize: 100,
        },
        {

            accessorKey: 'ss',
            // header: 'وضعیت ',
            header: () => <div>
                <div>عملیات</div>
            </div>,
            size: 350,
            minSize: 350,
            maxSize: 350,
            cell: (cellInfo) => {
                return <SendStatus  {...inputs} info={cellInfo}/>
            }

        },
        {

            accessorKey: 'ss',
            // header: 'وضعیت ',
            header: () => <div>
                <div></div>
                {/*<FilterTextInTable*/}
                {/*    uniqueId={"Status"}*/}
                {/*    property={"Status"}*/}
                {/*    operator={"="}*/}
                {/*    filterType={"select"}*/}
                {/*    optionsForSelectOption={[*/}
                {/*        {key: "تایید نشده", value: "0"},*/}
                {/*        {key: "تایید شده", value: "1"},*/}
                {/*    ]}*/}
                {/*/>*/}
                <SelectOptionFilter
                    uniqueId={"Status"}
                    property={"Status"}
                    operator={"="}
                    optionsForSelectOption={[
                        {key: "تایید نشده", value: "0"},
                        {key: "تایید شده", value: "1"},
                    ]}
                    placeHolder={"وضعیت"}
                />
            </div>,

            size: 150,
            minSize: 150,
            maxSize: 150,
            cell: (info) => {

                const constIsVerified = info.row.original.Status === 1
                return <>
                    <NameShow {...inputs} info={info}/>
                    <div className={"text-center"}>{
                        constIsVerified ?
                            <div className={"text-white rounded bg-green-700"}> تایید شده </div> :
                            <div className={"text-white rounded bg-red-500"}> تایید نشده </div>
                    }</div>
                </>
            },

        },
        {

            accessorKey: 'db',
            header: 'تاریخ بسته بندی',
            size: 100,
            minSize: 100,
            maxSize: 100,


        },

        {

            accessorKey: 'ds',
            header: 'تاریخ ارسال',
            size: 100,
            minSize: 100,
            maxSize: 100,
            // cell:(cellInfo)=><ShowDateFromHesabfa info={cellInfo} />


        },
        {

            accessorKey: 'des',
            header: 'توضیحات',
            size: 150,
            minSize: 150,
            maxSize: 150,
            // cell:(cellInfo)=><ShowDateFromHesabfa info={cellInfo} />

        },
    ];

    return temp
};
