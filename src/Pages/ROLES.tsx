export const ROLES = {
    user: [
        'userCreate',
        'userReadAll',
        'userReadSameDepartment',
        'userUpdateAll',
        'userUpdateSameDepartment',
        'userDeleteAll',
        'userDeleteSameDepartment',
    ],
    status: [
        'statusListCreate',
        'statusListRead',
        'statusListUpdate',
        'statusListDelete',
    ],

    ticketCreate: ['ticketCreate'], // برای دسترسی به:ثبت سفارش و پیگیری سفارش
    readAllTicketsInSystem: ['readAllTicketsInSystem'], // کل تیکت های سیستم رو ببینه
    ticketChatList: ['ticketChatList'], // چتا لیست رو ببینه - روی گزینه ی مشاهده کلیک کنه و ببینه
    ticketUpdate: ['ticketUpdate'],
    ticketDelete: ['ticketDelete'],
    adminSettings:['adminSettings'],

    theme: [
        'themeCreate',
        'themeRead',
        'themeUpdate',
        'themeDelete',
    ],
    department: [
        'departmentCreate',
        'departmentRead',
        'departmentUpdate',
        'departmentDelete',
    ],
    file: [
        'fileCreate',
        'fileRead',
        'fileUpdate',
        'fileDelete',
    ],
    task: [
        'tasksCreateFullAccessToUsers',
        'tasksCreateToAssignSameDepartment',
        'tasksReadAll',
        'tasksOwnRead',
        'tasksUpdateAll',
        'tasksOwnUpdate',
        'tasksDeleteAll',
        'tasksOwnDelete',
    ],


    role: ['rolesCreate',
        'rolesRead',
        'rolesUpdate',
        'rolesDelete',
    ],
    ticketRepliesCreate:[
        'ticketRepliesCreate',
    ],

    ticketReply: [
        'ticketRepliesRead',
        'ticketRepliesUpdate',
        'ticketRepliesDelete',
    ],
    ticketChangeHistory: [
        'ticketChangeHistoryRead',
        'ticketChangeHistoryRepliesUpdate',
        'ticketChangeHistoryDelete',
    ],

    report: [
        'howManyUsersThereAre',
        'howManyUsersIsInEveryDepartment',
        'howManyTicketsThereAre',
        'howManyTicketsThereAreInEveryDepartment',
        'howManyTicketsHasDoneStatus',
        'howManyTicketsHasDoneStatusIn12Month',
    ],
    smsSend:['smsSend'],
    // hesabfa
    showBillAccess:['showBillAccess'],
    downloadBillAsPdf:['downloadBillAsPdf'],
    downloadBillAsCsv:['downloadBillAsCsv'],
    submitBillInSubmitOrderForm:['submitBillInSubmitOrderForm'],
    submitBillInChatList:['submitBillInChatList'],
    saveBillAsDraft:['saveBillAsDraft'],
    saveBillAsDone:['saveBillAsDone'],
    deleteBill:['deleteBill'],
    editBillInChatList:['editBillInChatList'],
    allContactsWhenSubmitBill:['allContactsWhenSubmitBill'],
    showReportBillList:["showReportBillList"],
    adminReport:["adminReport"],
    basted_bandi_ersal:["basteBandi","ersal"],
    hasAccessToUnCheckedSendPackages : ["hasAccessToUnCheckedSendPackages"],
    screenShotBills: ["screenShotBills"],





    // report: 'report',

}