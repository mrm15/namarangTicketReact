export interface AccountingReportsTypes {
    data: any[] | [],
    filters: {
        Property: string,
        Operator: string,
        Value: number | string,
        uniqId?: string,
        showValue?: any,

    }[] | [],
}