import React from "react";
import {IInputObject} from "./findTableColumns.tsx";

export const userListTableColumns = (inputs: IInputObject) => {
    const {url, navigateTo} = inputs
    return [
        // {accessorKey: '_id', header: 'ID'},
        // {accessorKey: 'userName', header: 'User Name'},
        // {accessorKey: 'departmentId', header: 'Department ID'},
        // {accessorKey: 'role', header: 'Role'},
        {accessorKey: 'rowNumber', header:   'ردیف' , minWidth: 50, maxWidth:50 ,size: 50},
        {accessorKey: 'accountingCode', header: 'کدحسابداری'},
        {accessorKey: 'company', header: 'شرکت'},
        {accessorKey: 'title', header: 'عنوان'},
        {
            accessorKey: 'name', header: 'نام',
            size: 350,
            minWidth: 350,
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