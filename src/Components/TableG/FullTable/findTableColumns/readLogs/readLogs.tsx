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
                    uniqueId={"phoneNumber"}
                    operator={"="}
                    property={"phoneNumber"}
                    placeHolder={"شماره تلفن کاربر"}
                />
            </div>,
            id: "phoneNumber",
            accessorKey: 'phoneNumber',
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

            // cell: (cellInfo) => {
            //
            //     const city = cellInfo.row.original?.Contact?.City || "";
            //     const state = cellInfo.row.original?.Contact?.State || "";
            //
            //     return <>{state + " " + city}</>
            // },
            size: 90,
            minSize: 90,
            maxSize: 90,
        },




    ];

    return temp
};
