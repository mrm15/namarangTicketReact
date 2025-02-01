import {IInputObject} from "../findTableColumns";
import {ROLES} from "../../../../../Pages/ROLES";
import {ICustomColumn} from "../../../myTableGTypes";
import {ColumnDef} from "@tanstack/react-table";
import ContactNumber from "../BasteBandiErsal/ContactNumber";
import ShowDateFromHesabfa from "../BasteBandiErsal/ShowDateFromHesabfa";
import NumberFilterInTableG from "../../Filters/NumberFilter/NumberFilterInTableG";
import {formatNumber, randomNumberGenerator} from "../../../../../utils/utilsFunction";
import SendStatus from "../BasteBandiErsal/SendStatus";
import SelectOptionFilter from "../../Filters/SelectOptionFilter/SelectOptionFilter";
import DatesFilter from "../../Filters/DatesFilter/DatesFilter.tsx";
import StringFilter from "../../Filters/StringFilter/StringFilter.tsx";
import DateShowLtr from "../../components/DateShowltr.tsx";
import toast from "react-hot-toast";
import CheckBoxHeader from "../../components/CheckBoxHeader/CheckBoxHeader.tsx";
import CheckBoxCell from "../../components/CheckBoxCell/CheckBoxCell.tsx";
import React from "react";
import {PAGES} from "../../../../../Pages/Route-string.tsx";


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
export const messageTags = (inputs: IInputObject): ColumnDef<any>[] => {
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

            accessorKey: 'edit',
            header: 'عملیات',
            size: 100,
            minSize: 100,
            maxSize: 100,
            cell: ({row}) => {
                const handleEdit = () => {

                    navigateTo(PAGES.messageTag_add_edit, {state: {data: row.original}});
                }
                const handleDeleteRole = async (id: any) => {
                    const url = 'messageTag/delete/' + id

                    try {
                        const response = await myAxios.delete(url)
                        if (response?.data) {

                            toast.success(response?.data?.message)
                            setMyData({reload: randomNumberGenerator() + ""})
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }


                const roleDeleteHandler = async () => {

                    const data = row.original;

                    const message = `آیا مطمئنی که میخوای تگ لیست با نام
                    ${data?.name}
        به صورت کامل برای همیشه از لیست نقش ها حذف کنی؟
        `
                    const confirmResult1 = confirm(message)
                    if (confirmResult1) {
                        const message = ` برای بار دوم  عرض میکنم.  این فرآیند قابل برگشت نیست.
            آیا مطمئنی که میخوای نقش با شماره
        ${data?.name}
        به صورت کامل برای همیشه از لیست نقش ها حذف کنی؟
        `
                        const confirmResult2 = confirm(message)
                        if (confirmResult2) {
                            await handleDeleteRole(data._id)
                        }
                    }
                }

                return <div className={"flex flex-wrap gap-1"}>
                    <button
                        className={"btn-blue-secondary"}
                        onClick={handleEdit}>ویرایش
                    </button>
                    <button

                        className={"btn-blue-secondary-delete"}
                        onClick={roleDeleteHandler}>حذف
                    </button>
                </div>;
            }
        },
        {
            header: () => <div>
                <StringFilter
                    uniqueId={"name"}
                    operator={"="}
                    property={"name"}
                    placeHolder={"نام نمایشی تگ"}
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
            size: 150,
            minSize: 150,
            maxSize: 150,

        },
        {
            header: () => <div>
                کد ترتیب
            </div>,
            id: "messageTagCode",
            accessorKey: 'messageTagCode',
            cell: (cellInfo) => {

                return <>
                    <RowNumberShow
                        info={cellInfo}
                    />
                </>
            },
            size: 100,
            minSize: 100,
            maxSize: 100,

        },

        {
            header: () => <div>
                <div>توضیحات</div>
            </div>,
            id: "description",
            accessorKey: 'description',
            cell: (cellInfo) => {


                return <div>
                    <RowNumberShow
                        info={cellInfo}
                    />

                </div>
            },

            size: 250,
            minSize: 250,
            maxSize: 250,
        },
        {
            // header: 'تاریخ ثبت',
            id: "createAt",
            accessorKey: 'createAt',
            header: (info) => {
                return <div>
                    تاریخ ایجاد
                </div>
            },
            cell: (cellInfo) => <DateShowLtr info={cellInfo}/>,
            size: 100,
            minSize: 100,
            maxSize: 100,
        },
        {
            // header: 'تاریخ ثبت',
            id: "createAt",
            accessorKey: 'createAt',
            header: (info) => {
                return <div>

                </div>
            },
            cell: (cellInfo) => <></>,
            size: 300,
            minSize: 300,
            maxSize: 300,
        },






    ];

    return temp
};
