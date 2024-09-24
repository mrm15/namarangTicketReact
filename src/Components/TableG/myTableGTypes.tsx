import { ColumnDef } from '@tanstack/react-table';
import React from "react";

// Use intersection to add the `hidden` property to `ColumnDef`
export type ICustomColumn<TData = any> = ColumnDef<TData> & {
    hidden?: boolean; // Optional hidden property
};

export interface IMyData {
    url: string;
    columns: ICustomColumn[]; // Use the updated ICustomColumn type
    pageNumber: number;
    currentPage: number;
    numberOfRows: number;
    tableData: any[];
    filters: any[];
    totalRows: number;
    reload: string;
    isLoading: boolean;
    errorMessage: string;
    queryData:any
}

export interface myTableGContext {
    myData: IMyData;
    setMyData: any;
}
