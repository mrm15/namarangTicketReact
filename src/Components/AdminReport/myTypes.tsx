export interface ImyDataAdminReport {
    titleData: any[] | [];
    detailsData: any[]|[];
    reload: string;
    filterItems: any[] | undefined|[];
    isLoading: boolean;
}

export interface AdminReportContextType {
    myData: ImyDataAdminReport;
    setMyData: any;
}