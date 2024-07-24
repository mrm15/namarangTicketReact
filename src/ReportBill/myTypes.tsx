export interface IAwesomeData {
    columns:{[key:string]:any}[];
    numberOfRowsShowInTable: number;
    totalPages: number;
    tableHeaders: any[]; // Specify a more precise type if you know the exact structure
    tableData: any[]; // Specify a more precise type if you know the exact structure
    totalData: any[]; // Specify a more precise type if you know the exact structure
    reload: string; // to fill current Page  from TotalData to Table Data
    TotalCount:number; // تعداد کل دیتاهای موجود در سرور برای صفحه بندی بکار میاد
    FilteredCount:number; // تعداد دیتای بازگشتی از سرور همین الان ن.ی توتال دیتا هست
    currentSelectedPage : 1,
    filterItems : any[],

}

export interface ReportBillContextType {
    awesomeData: IAwesomeData;
    setAwesomeData: any;
}