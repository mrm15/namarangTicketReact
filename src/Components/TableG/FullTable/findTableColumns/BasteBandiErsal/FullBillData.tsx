import React from "react";
import {ColumnDef, filterFns} from '@tanstack/react-table';
import {IInputObject} from "../findTableColumns";
import {ICustomColumn} from "../../../myTableGTypes";
import {PAGES} from "../../../../../Pages/Route-string.tsx";
import {toast} from "react-toastify";
import {dateFromHesabfaToTimeStamp, randomNumberGenerator} from "../../../../../utils/utilsFunction.tsx";
import SendStatus from "./SendStatus.tsx";
import ShowDateFromHesabfa from "./ShowDateFromHesabfa.tsx";
import ContactNumber from "./ContactNumber.tsx";
import FilterTextInTable from "../../Filters/FilterTextInTable.tsx";


const NameShow = ({info}) => {


    return <div>{info.getValue()}</div>
}
const RowNumberShow = ({info,}) => {


    return <div
        style={{
            textAlign: "right",
        }}
    >{info.getValue()}</div>
}

// Define the columns with the appropriate structure
export const FullBillData = (inputs: IInputObject): ColumnDef<any>[] => {
    const {url, navigateTo, myAxios, setMyData, myData} = inputs;
    const temp: ICustomColumn<any>[] = [
        {
            id: "rowNumber",
            accessorKey: 'rowNumber',
            header: (info) => {
                return <>
                    ردیف
                </>
            },
            size: 20,
            minSize: 20,
            maxSize: 20,
            cell: (info) => <RowNumberShow info={info}/>,
            hidden: false,

        },

        {
            // accessorKey: 'عنوان سفارش',
            // header: 'عنوان سفارش',
            header: () => <div>

                <div>عنوان سفارش</div>
                <FilterTextInTable
                    myData={myData}
                    setMyData={setMyData}
                    filterKey={"ContactTitle"}
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
            size: 150,
            minSize: 150,
            maxSize: 150,
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
                    <div style={{width: 50}}>
                        تاریخ ثبت
                    </div>
                    <FilterTextInTable
                        myData={myData}
                        filterKey={"Date"}
                        filterType={"date"}
                        setMyData={setMyData}
                        operator={"="}
                    />
                </div>
            },
            cell: (cellInfo) => <ShowDateFromHesabfa info={cellInfo}/>,
            size: 50,
            minSize: 50,
            maxSize: 50,
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
            size: 50,
            minSize: 50,
            maxSize: 50,
        },

        {
            id: "Number",
            accessorKey: 'Number',
            // header: "شماره فاکتور",
            header: () => <div>
                <div>شماره فاکتور</div>
                <FilterTextInTable
                    myData={myData}
                    setMyData={setMyData}
                    filterKey={"Number"}
                />
            </div>,

            cell: (info) => {

                console.log(info.row.original.Status)
                const constIsVerified = info.row.original.Status === 1
                return <div className={"text-right"}>
                    <NameShow {...inputs} info={info}/>
                </div>
            },
            size: 10,
            minSize: 10,
            maxSize: 10,
        },
        {

            accessorKey: 'ss',
            // header: 'وضعیت ',
            header: () => <div>
                <div>عملیات</div>
            </div>,
            size: 250,
            minSize: 250,
            maxSize: 250,
            cell: (cellInfo) => {
                return <SendStatus  {...inputs} info={cellInfo}/>
            }

        },
        {

            accessorKey: 'ss',
            // header: 'وضعیت ',
            header: () => <div>
                <div>وضعیت</div>
                <FilterTextInTable
                    myData={myData}
                    setMyData={setMyData}
                    filterKey={"Status"}
                    operator={"="}
                    filterType={"select"}
                    optionsForSelectOption={[
                        {key: "تایید نشده", value: "0"},
                        {key: "تایید شده", value: "1"},
                    ]}
                />
            </div>,

            size: 50,
            minSize: 50,
            maxSize: 50,
            cell: (info) => {

                console.log(info.row.original.Status)
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
            size: 50,
            minSize: 50,
            maxSize: 50,


        },

        {

            accessorKey: 'ds',
            header: 'تاریخ ارسال',
            size: 50,
            minSize: 50,
            maxSize: 50,
            // cell:(cellInfo)=><ShowDateFromHesabfa info={cellInfo} />


        },
        {

            accessorKey: 'des',
            header: 'توضیحات',
            size: 50,
            minSize: 50,
            maxSize: 50,
            // cell:(cellInfo)=><ShowDateFromHesabfa info={cellInfo} />

        },
    ];

    return temp
};
