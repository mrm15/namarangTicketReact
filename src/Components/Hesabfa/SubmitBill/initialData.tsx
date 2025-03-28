// Define the Unit interface for Units array
export interface IUnit {
    id: number;
    value: string;
    divideNumber: number;
}

export interface IOther {
    Title: string;
    Amount?: string;
    Add?: boolean;
}

// Define the InvoiceItem interface
export interface IInvoiceItem {
    RowId: number;
    Id?: number;
    Description?: string;
    ItemCode?: string;
    Item:{[key:string]:any},
    Unit?: string;
    Quantity?: number;
    UnitPrice?: number;
    Discount?: number;
    Tax?: number;
    SubUnit?: string;
    Name?: string;
    fixedPrice?: number;
    dividedBy?: number;
    // selectedUnit?: string;
    Units?: IUnit[];
    sum?: number;
}

// Define the Invoice interface
export interface IInvoice {
    Contact: any;
    Number: string;
    ContactTitle: string;
    Reference: string;
    Date: string;
    DueDate: string;
    ContactCode: string;
    Note: string;
    InvoiceType: number;
    Status: number;
    Tag: string;
    InvoiceItems?: IInvoiceItem[] | [];
    Others: IOther[];
    Currency: string;
    TaxId: string;
    CurrencyRate: number;
    Project: "";
    Sum: number;
}

export interface IProjectList {
    Id: number;
    Title: string;
    Active: boolean;
}

export interface IInitialBillData {
    productList?: any[],
    projectList?: IProjectList[] | [],
    customerList?: any[],

}