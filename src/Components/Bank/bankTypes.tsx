export  interface  singleObjectOfTable {
    [key:string]:string
}
export interface IBankData {
    tableData:singleObjectOfTable[],
    filters:any[],
    requestUrl:string,
    reload:string,



}