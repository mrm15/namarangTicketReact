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
    ticket: [
        'ticketCreate',
        'ticketReadAll',
        'ticketReadOwn',
        'ticketUpdate',
        'ticketDelete',
    ],

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
    file:[
        'fileCreate',
        'fileRead',
        'fileUpdate',
        'fileDelete',
    ],
    task:[
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

    ticketReply:[
        'ticketRepliesCreate',
        'ticketRepliesRead',
        'ticketRepliesUpdate',
        'ticketRepliesDelete',
    ],
    ticketChangeHistory:[
        'ticketChangeHistoryRead',
        'ticketChangeHistoryRepliesUpdate',
        'ticketChangeHistoryDelete',
    ],

    report:[

    ],





    report: 'report',
    howManyUsersThereAre: 'howManyUsersThereAre',
    howManyUsersIsInEveryDepartment: 'howManyUsersIsInEveryDepartment',
    howManyTicketsThereAre: 'howManyTicketsThereAre',
    howManyTicketsThereAreInEveryDepartment: 'howManyTicketsThereAreInEveryDepartment',
    howManyTicketsHasDoneStatus: 'howManyTicketsHasDoneStatus',
    howManyTicketsHasDoneStatusIn12Month: 'howManyTicketsHasDoneStatusIn12Month'
}