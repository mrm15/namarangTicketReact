import React from "react";
import {ColumnDef, filterFns} from '@tanstack/react-table';
import {IInputObject} from "./findTableColumns";
import {ICustomColumn} from "../../myTableGTypes";
import {PAGES} from "../../../../Pages/Route-string.tsx";
import {toast} from "react-toastify";
import {randomNumberGenerator} from "../../../../utils/utilsFunction.tsx";
import FilterTextInTable from "../Filters/FilterTextInTable.tsx";


const NameShow = ({info}) => {

    return <>{info.getValue()  }</>
}
// Define the columns with the appropriate structure
export const departmentListTableColumns = (inputs: IInputObject): ColumnDef<any>[] => {
    const {url, navigateTo, myAxios, setMyData, myData} = inputs;
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

            accessorKey: 'edit',
            header: 'عملیات',
            size: 50,
            minSize: 50,
            maxSize: 50,
            cell: ({row}) => {
                const handleEdit = () => {
                    console.log("Editing row:", row.original);
                    navigateTo(PAGES.DEPARTMENT_ADD_EDIT, {state: {data: row.original}});
                }
                const handleDeleteDepartment = async (id: any) => {
                    const url = 'department/delete/' + id

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


                const departmentDeleteHandler = async () => {

                    const data = row.original;

                    const message = `آیا مطمئنی که میخوای دپارتمان با 
                            ${data?.name}
                            به صورت کامل برای همیشه از لیست نقش ها حذف کنی؟
        `
                    const confirmResult1 = confirm(message)
                    if (confirmResult1) {
                        const message = ` برای بار دوم  عرض میکنم.  این فرآیند قابل برگشت نیست.
            آیا مطمئنی که میخوای دپارتمان با شماره
        ${data?.name}
        به صورت کامل برای همیشه از لیست نقش ها حذف کنی؟
        `
                        const confirmResult2 = confirm(message)
                        if (confirmResult2) {

                            await handleDeleteDepartment(data._id)
                        }
                    }
                }

                return <div className={"flex gap-1 items-center justify-center"}>
                    <button
                        className={"btn-blue-secondary"}
                        onClick={handleEdit}>ویرایش
                    </button>
                    <button

                        className={"btn-blue-secondary-delete"}
                        onClick={departmentDeleteHandler}>حذف
                    </button>
                </div>;
            }
        },
        {
            id: "name",
            accessorKey: 'name',
            // header: "نام",
            header: ()=>{

                return <FilterTextInTable
                    placeHolder={"نام دپارتمان "}
                    filterKey={"name"}
                />
            },


            // cell: info => <>{info.getValue()}</>,
            cell: (info) => {


                return <NameShow {...inputs} info={info}/>
            },
            enableColumnFilter: true, // Enable column filtering
            filterFn: filterFns.includesString // Use the filter function from filterFns
        },
        {
            accessorKey: 'description',
            header: 'توضیحات'
        }
    ];

    return temp
};
