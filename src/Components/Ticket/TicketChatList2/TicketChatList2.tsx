import Loader from "../../Loader";
import {ChatListProvider} from "./ChatListContext.tsx";
import GetChatListDataComponent from "./GetChatListDataComponent.tsx";
import ChatListHeader from "./ChatListHeader/ChatListHeader.tsx";
import ChatListBody from "./ChatListBody/ChatListBody.tsx";
import ChatListFooter from "./ChatListFooter/ChatListFooter.tsx";
import {useLocation, useParams} from "react-router-dom";
import {TicketType} from "./TicketType.tsx";


const TicketChatList2 = () => {
    const myLocation = useLocation();

    const paramId = useParams().id;

    const initialDataChatList: TicketType = {
        createAt: "",
        data: [],
        lastChangeTimeStamp: "",
        lastDepartment: "",
        ticketId: "",
        ticketNumber: 0,
        title: "",
        isLoading: true,
        reload: "",
        id: myLocation?.state?.id || paramId,


    }



    return <ChatListProvider initialData={initialDataChatList}>
        <GetChatListDataComponent>
            <div className={"flex flex-col h-screen bg-gray-100"}>
                <ChatListHeader/>
                <ChatListBody/>
                <ChatListFooter/>
            </div>

        </GetChatListDataComponent>

    </ChatListProvider>
}

export default TicketChatList2;
