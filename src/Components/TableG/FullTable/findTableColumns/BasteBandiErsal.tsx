import React from "react";
import {ColumnDef, filterFns} from '@tanstack/react-table';
import {IInputObject} from "./findTableColumns";
import {ICustomColumn} from "../../myTableGTypes";
import {PAGES} from "../../../../Pages/Route-string.tsx";
import {toast} from "react-toastify";
import {randomNumberGenerator} from "../../../../utils/utilsFunction.tsx";


const NameShow = ({info}) => {


    return <>{info.getValue()}</>
}
// Define the columns with the appropriate structure
export const BasteBandiErsal = (inputs: IInputObject): ColumnDef<any>[] => {
    const {url, navigateTo, myAxios, setMyData} = inputs;
    const temp: ColumnDef<any>[] = [
        {
            id: "rowNumber",
            accessorKey: 'rowNumber',
            header: (info) => {
                return <>
                    ردیف
                </>
            },
            size: 50,
            minSize: 50,
            maxSize: 50,


        },

        {
            // accessorKey: 'عنوان سفارش',
            header: 'عنوان سفارش',
            id: "ContactTitle",
            accessorKey: 'ContactTitle',
            // header: (info) => {
            //     return <>
            //         ردیف
            //     </>
            // },
            // cell:(cellInfo)=> <>{cellInfo.getValue()}</> ,
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

                const city = cellInfo.row.original.Contact.City
                const state = cellInfo.row.original.Contact.State

                return <>{state + " " + city}</>
            },
            size: 50,
            minSize: 50,
            maxSize: 50,
        },

        {
            id: "Number",
            accessorKey: 'Number',
            header: "شماره فاکتور",
            // cell: info => <>{info.getValue()}</>,
            cell: (info) => {


                return <NameShow {...inputs} info={info}/>
            },
        },

        {

            accessorKey: 'edit',
            header: 'وضعیت بسته بندی',
            size: 50,
            minSize: 50,
            maxSize: 50,
            cell: ({row}) => {

                const handleEdit = () => {
                    console.log("123")
                }
                return <div className={"flex flex-wrap gap-1"}>
                    <button
                        className={"btn-blue-secondary"}
                        onClick={handleEdit}>ویرایش
                    </button>
                    <button

                        className={"btn-blue-secondary-delete"}
                        onClick={handleEdit}>حذف
                    </button>
                </div>;
            }
        },
        {

            accessorKey: 'edit',
            header: 'وضعیت ارسال',
            size: 50,
            minSize: 50,
            maxSize: 50,

        },
    ];

    return temp
};
