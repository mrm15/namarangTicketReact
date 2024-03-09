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
    // ticket: [
    //     'ticketCreate', // create new ticket
    //     'ticketReadAll',// list of all tickets
    //     'ticketReadOwn', // list of my tickets or my orders
    //     'ticketUpdate', // update Ticket // just admin
    //     'ticketDelete', // delete a ticket just admin
    // ],
    ticketCreate: ['ticketCreate'],
    ticketReadAll: ['ticketReadAll'],
    ticketReadOwnReceived: ['ticketReadOwnReceived'],
    ticketChatList: ['ticketChatList'],
    ticketReadOwn: ['ticketReadOwn'], // all tickets user has access to them
    ticketInput: ['ticketInput'],
    ticketUpdate: ['ticketUpdate'],
    ticketDelete: ['ticketDelete'],

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
    ]


    // report: 'report',

}