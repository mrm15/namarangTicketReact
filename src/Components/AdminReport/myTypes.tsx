export interface ImyDataAdminReport {
    tableView: any[] | [];
    treeView:any,
    reload: string;
    filterItems: any[] | undefined|[];
    isLoading: boolean;
    reFetch:any;
    resultOfUseQuery:any

}

export interface AdminReportContextType {
    myData: ImyDataAdminReport;
    setMyData: any;
}