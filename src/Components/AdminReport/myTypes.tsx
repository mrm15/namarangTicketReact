export interface ImyDataAdminReport {
    titleData: any[] | [];
    detailsData: any[]|[];
    reload: string;
    filterItems: any[] | undefined|[];
    isLoading: boolean;
    reFetch:any;
}

export interface AdminReportContextType {
    myData: ImyDataAdminReport;
    setMyData: any;
}