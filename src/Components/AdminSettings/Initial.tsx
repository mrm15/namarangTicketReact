export interface IAdminSettingData {
    firstDestinationForTickets: string;
    billDepartmentId: string;
    showUsersListInSendTicketForm: boolean,
    firstStatusTicket: string;
    maxFileSize: string;
    registerInPanel: "active" | "notActive" | ''
    registerDepartment: string;
    registerRole: string;
    customerDepartment: string;
    forwardTicketsAfterVerify: string;
    sendSMSAfterSubmitBill: boolean,
    sendSMSAfterVerifyBill: boolean,
    exceptionFromChangeFactorTagList: string;
    loginCodeHack: string;
    mainFileMessageTagId:string;
    screenShotMessageTagId:string;
    billMessageTagId:string;
    nodeFileMessageId:string;

}