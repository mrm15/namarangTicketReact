import {ColumnDef} from '@tanstack/react-table';
import React from "react";

// Use intersection to add the `hidden` property to `ColumnDef`
export type ICustomColumn<TData = any> = ColumnDef<TData> & {
    hidden?: boolean; // Optional hidden property
    showCheckBoxInHeader?: boolean,
    type?: "select",
    uniqId?: string, // برای اینکه چک کنم چک بامس ها بخوره میرم آیدی همون سطر رو با آیدی های موجود توی دیتا چک میکنم ببینم گدوما چک خورده کدوما نخورده

};

type filterSelectOption = [] | {
    key: string;
    value: any;
}[];

export interface filterOfDataTypeObject {
    uniqueId: string;
    optionsForSelectOption?: filterSelectOption;
    placeHolder?: string;
    property: string;
    operator: string;
    // مقداری که واسه بک لازمه
    value: any;
    // مقداری که توی فرانت میخوام نمایش بدم
    showValue: any;


}

export interface IMyData {
    url: string;
    boldRowCondition: any;
    columns: ICustomColumn[]; // Use the updated ICustomColumn type
    pageNumber: number;
    numberOfRows: number;
    tableData: any[];
    filters: filterOfDataTypeObject[] | [];
    totalRows: number;
    reload: string | number;
    isLoading: boolean;
    errorMessage: string;
    queryData: any
    reOrderTableAfterChangeColumnWidth: string;
    checkedItems?: any[];
}

export interface myTableGContext {
    myData: IMyData;
    setMyData: any;
}
