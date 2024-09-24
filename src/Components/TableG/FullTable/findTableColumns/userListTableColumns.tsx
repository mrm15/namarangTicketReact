import React from "react";
import {IInputObject} from "./findTableColumns.tsx";
import {toast} from "react-toastify";
import {randomNumberGenerator} from "../../../../utils/utilsFunction.tsx";
import {PAGES} from "../../../../Pages/Route-string.tsx";
import EditButton from "../../../../assets/icons/EditButton.tsx";
import DeleteButton from "../../../../assets/icons/DeleteButton.tsx";
import FilterTextInTable from "../Filters/FilterTextInTable.tsx";


export const userListTableColumns = (inputs: IInputObject) => {
    const {url, navigateTo, myAxios, setMyData , myData} = inputs
    return [
        // {accessorKey: '_id', header: 'ID'},
        // {accessorKey: 'userName', header: 'User Name'},
        // {accessorKey: 'departmentId', header: 'Department ID'},
        // {accessorKey: 'role', header: 'Role'},
        {accessorKey: 'rowNumber', header: 'ردیف', minWidth: 50, maxWidth: 50, size: 50},
        {
            accessorKey: 'edit',
            header: 'عملیات',
            size: 200,
            minSize: 200,
            maxSize: 200,
            cell: ({row}) => {

                const handleDeleteUser = async (id: any) => {
                    const url = 'user/delete/' + id

                    try {

                        const response = await myAxios.delete(url)
                        if (response?.data) {

                            toast.success(response?.data?.message)
                            setMyData({reload:randomNumberGenerator()})
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }
                const deleteButtonHandler = async () => {

                    const data = row.original;

                    const message = `آیا مطمئنی که میخوای کاربر با شماره
        ${data?.phoneNumber}
        به صورت کامل برای همیشه از لیست کاربر ها حذف کنی؟
        `
                    const confirmResult1 = confirm(message)
                    if (confirmResult1) {
                        const message = ` برای بار دوم  عرض میکنم.  این فرآیند قابل برگشت نیست.
            آیا مطمئنی که میخوای کاربر با شماره
        ${data?.phoneNumber}
        به صورت کامل برای همیشه از لیست کاربر ها حذف کنی؟
        `
                        const confirmResult2 = confirm(message)
                        if (confirmResult2) {

                            await handleDeleteUser(data._id)
                        }
                    }
                }

                const editButtonHandler = () => {

                    const data = row.original
                    navigateTo(PAGES.USER_ADD_EDIT, {state: {data}})
                }


                return <>

                    <div className={'flex flex-wrap gap-1 items-center justify-center'}>
                        <button
                            onClick={() => editButtonHandler()}
                        >
                            <EditButton/>
                        </button>
                        <button
                            onClick={() => deleteButtonHandler()}

                            className={'text-red-600'}>

                            <DeleteButton/>
                        </button>
                    </div>

                </>
            }
        },
        {accessorKey: 'accountingCode', header: 'کدحسابداری'},
        {accessorKey: 'company', header: 'شرکت'},
        {accessorKey: 'title', header: 'عنوان'},
        {
            accessorKey: 'name',
            header: ()=>{

                return <><FilterTextInTable
                    placeHolder={"نام"}
                    filterKey={"name"}
                    setMyData={setMyData}
                    myData={myData}


                    /></>
            },
            size: 350,
            minSize: 350,
            cell: (value: any) => <div
                style={{
                    minWidth: 350
                }}
            >{value.getValue()}</div>
        },
        {accessorKey: 'familyName', header: 'نام خانوادگی', size: 250},
        {accessorKey: 'middleName', header: 'نام مستعار'},
        {accessorKey: 'phoneNumber', header: 'شماره تماس', size: 250},
        {accessorKey: 'mobile', header: 'موبایل'},
        {accessorKey: 'fax', header: 'فکس'},
        {accessorKey: 'phoneNumber1', header: 'شماره تماس1'},
        {accessorKey: 'phoneNumber2', header: 'شماره تماس2 '},
        {accessorKey: 'phoneNumber3', header: 'شماره تماس3 '},
        {accessorKey: 'email', header: 'ایمیل'},
        {accessorKey: 'website', header: 'سایت'},
        {accessorKey: 'bankName', header: 'نام بانک'},
        {accessorKey: 'accountNumber', header: 'شماره حساب'},
        {accessorKey: 'cardNumber', header: 'شماره کارت'},
        {accessorKey: 'SHABA_Number', header: 'شماره شبا'},
        {accessorKey: 'economicCodeCompany', header: 'کد اقتصادی'},
        {accessorKey: 'nationalCodeCompany', header: 'شناسه ملی شرکت'},
        {accessorKey: 'registerNumberCompany', header: 'کد ثبت شرکت'},
        {accessorKey: 'description', header: 'توضیحات'},
        {accessorKey: 'address', header: 'آدرس'},
        {accessorKey: 'country', header: 'کشور'},
        {accessorKey: 'province', header: 'استان'},
        {accessorKey: 'city', header: 'شهر'},
        // {accessorKey: 'profilePictureUrl', header: 'Profile Picture URL'},
        {accessorKey: 'postalCode', header: 'کد پستی'},
        {
            accessorKey: 'isActive', header: 'وضیعت',
            cell: (value: any) => <>{value ? "فعال" : "غیرفعال"}</>
        },
        {accessorKey: 'userStatus', header: 'User Status'},
    ]
}