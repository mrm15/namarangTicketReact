import {IInputObject} from "../findTableColumns";
import {ROLES} from "../../../../../Pages/ROLES";
import {ICustomColumn} from "../../../myTableGTypes";
import {ColumnDef} from "@tanstack/react-table";
import ContactNumber from "../BasteBandiErsal/ContactNumber";
import ShowDateFromHesabfa from "../BasteBandiErsal/ShowDateFromHesabfa";
import NumberFilterInTableG from "../../Filters/NumberFilter/NumberFilterInTableG";
import {formatNumber} from "../../../../../utils/utilsFunction";
import SendStatus from "../BasteBandiErsal/SendStatus";
import SelectOptionFilter from "../../Filters/SelectOptionFilter/SelectOptionFilter";
import DatesFilter from "../../Filters/DatesFilter/DatesFilter.tsx";
import StringFilter from "../../Filters/StringFilter/StringFilter.tsx";
import DateShowLtr from "../../components/DateShowltr.tsx";
import toast from "react-hot-toast";
import CheckBoxHeader from "../../components/CheckBoxHeader/CheckBoxHeader.tsx";
import CheckBoxCell from "../../components/CheckBoxCell/CheckBoxCell.tsx";
import React from "react";


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
const CopyOnClick = ({info}) => {
    const  data = info.getValue()
    return (
        <span
            onClick={()=>{
                void navigator.clipboard.writeText(data)
                toast.success("توضیحات کپی شد!")
            }}
            style={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap", // Change textWrap to whiteSpace
                overflow: "hidden" // Add overflow to handle ellipsis
            }}
        >
            {data}
        </span>
    );
};
// Define the columns with the appropriate structure
export const readLogs = (inputs: IInputObject): ColumnDef<any>[] => {
    const {url, navigateTo, myAxios, setMyData, myData,auth} = inputs;

    const hasAccessToVerifyBill = auth?.userInfo?.roleAccessList?.includes(ROLES.saveBillAsDone[0])
    const temp: ICustomColumn<any>[] = [
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
            size: 30,
            minSize: 30,
            maxSize: 30,
        },
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
            header: () => <div>
                <StringFilter
                    uniqueId={"name"}
                    operator={"*"}
                    property={"name"}
                    placeHolder={"نام کاربر در لحظه ثبت"}
                />
            </div>,
            id: "name",
            accessorKey: 'name',
            cell: (cellInfo) => {

                return <>
                    <RowNumberShow
                        info={cellInfo}
                    />
                </>
            },
            size: 50,
            minSize: 50,
            maxSize: 50,

        },
        {
            header: () => <div>

                <StringFilter
                    uniqueId={"phoneNumber"}
                    operator={"="}
                    property={"phoneNumber"}
                    placeHolder={"شماره تلفن کاربر"}
                />
            </div>,
            id: "phoneNumber",
            accessorKey: 'phoneNumber',
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
            header: () => <div>
                <div>توضیحات</div>
            </div>,
            id: "description",
            accessorKey: 'description',
            cell: (cellInfo) => {

                return <div>
                    <CopyOnClick
                        info={cellInfo}
                    />

                </div>
            },

            size: 150,
            minSize: 150,
            maxSize: 150,
        },
        {
            // header: 'تاریخ ثبت',
            id: "timestamp",
            accessorKey: 'timestamp',
            header: (info) => {
                return <div>
                    <DatesFilter
                        property={"timestamp"}
                        model ={"advanced"}
                        dateFormatValue ={"jsDate"}
                    />
                </div>
            },
            cell: (cellInfo) => <DateShowLtr info={cellInfo}/>,
            size: 200,
            minSize: 200,
            maxSize: 200,
        },

        {
            // accessorKey: 'عنوان سفارش',
            header: 'ip Address',
            id: "ipAddress",
            accessorKey: 'ipAddress',
            size: 90,
            minSize: 90,
            maxSize: 90,
        },
        {
            header: 'os',
            id: "os",
            accessorKey: 'os',
            size: 90,
            minSize: 90,
            maxSize: 90,
        },
        {
            header: 'route',
            id: "route",
            accessorKey: 'route',
            size: 90,
            minSize: 90,
            maxSize: 90,
        },
        {
            header: 'deviceType',
            id: "deviceType",
            accessorKey: 'deviceType',
            size: 150,
            minSize: 150,
            maxSize: 150,
        },




    ];

    return temp
};
