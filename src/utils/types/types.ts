import React from "react";

export interface HeaderItem {
    headerName: string;
    cellRenderer: (params: any) => JSX.Element;
    cellStyle: () => React.CSSProperties;
}