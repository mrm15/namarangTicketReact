export interface IAwesomeData {
    filterStatus:any[];
    columns:{[key:string]:any}[];
    numberOfRowsShowInTable: number;
    totalPages: number;
    tableHeaders: any[]; // Specify a more precise type if you know the exact structure
    tableData: any[]; // Specify a more precise type if you know the exact structure
    totalData: any[]; // Specify a more precise type if you know the exact structure
    reload: string;
    TotalCount:number; // تعداد کل دیتاهای موجود در سرور برای صفحه بندی بکار میاد
    FilteredCount:number; // تعداد دیتای بازگشتی از سرور همین الان ن.ی توتال دیتا هست
    currentSelectedPage : 1,

}

export interface ReportBillContextType {
    awesomeData: IAwesomeData;
    setAwesomeData: any;
}