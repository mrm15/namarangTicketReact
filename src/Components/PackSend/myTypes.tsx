export interface IPackSend {
    titleData: any[] | [];
    detailsData: any[]|[];
    reload: string;
    filterItems: any[] | undefined|[];
    isLoading: boolean;
}

export interface IPackSendContextType {
    myData: IPackSend;
    setMyData: any;
}