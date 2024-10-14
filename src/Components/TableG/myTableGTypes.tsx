import {ColumnDef} from '@tanstack/react-table';
import React from "react";

// Use intersection to add the `hidden` property to `ColumnDef`
export type ICustomColumn<TData = any> = ColumnDef<TData> & {
    hidden?: boolean; // Optional hidden property
    showCheckBoxInHeader?: boolean,
    type?: "select",
    uniqId?: string, // برای اینکه چک کنم چک بامس ها بخوره میرم آیدی همون سطر رو با آیدی های موجود توی دیتا چک میکنم ببینم گدوما چک خورده کدوما نخورده

};

export interface IMyData {
    url: string;
    boldRowCondition:any;
    columns: ICustomColumn[]; // Use the updated ICustomColumn type
    pageNumber: number;
    currentPage: number;
    numberOfRows: number;
    tableData: any[];
    filters: any[];
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
