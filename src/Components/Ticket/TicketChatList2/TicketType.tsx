interface FileType {
    fileName: string;
    fileSize: number;
    filePath: string;
    fileType: string;
}

interface MessageType {
    isTicketSender: boolean;
    userId: string;
    ticketReplyId?: string;
    type: "ticket" | "ticketReply";
    id: string;
    user_name: string;
    department_name: string;
    description: string;
    billNumber?: string;
    visibleToUser?: boolean;
    files: FileType[];
    createAt: string;
}

export interface TicketType {
    ticketId: string;
    ticketNumber: number;
    title: string;
    createAt: string;
    lastChangeTimeStamp: string;
    lastDepartment: string;
    data: MessageType[];
    reload:string,
    isLoading:boolean,
    id:any
}
