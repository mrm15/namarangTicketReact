import { ColumnDef } from '@tanstack/react-table';
import React from "react";

// Define the column type with the appropriate generics
export type ICustomColumn = ColumnDef<any>;

export interface IMyData {
    url: string;
    columns: ICustomColumn[];
    pageNumber: number;
    currentPage: number;
    numberOfRows: number;
    tableData: any[];
    filter: any[];
    totalRows: number;
    reload: string;
    isLoading: boolean;
    errorMessage: string;
}

export interface myTableGContext {
    myData: IMyData;
    setMyData: any;
}
