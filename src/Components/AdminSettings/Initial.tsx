export interface IAdminSettingData {
    firstDestinationForTickets: string;
    showUsersListInSendTicketForm: boolean,
    firstStatusTicket: string;
    maxFileSize: string;
    registerInPanel: "active" | "notActive" | ''
    registerDepartment: string;
    registerRole: string;
    customerDepartment: string;
    forwardTicketsAfterVerify: string;
    sendSMSAfterVerifyBill: 'notActive' | 'Active',

}