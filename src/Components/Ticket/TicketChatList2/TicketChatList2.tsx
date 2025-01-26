import {ChatListProvider} from "./ChatListContext.tsx";
import GetChatListDataComponent from "./GetChatListDataComponent.tsx";
import ChatListHeader from "./ChatListHeader/ChatListHeader.tsx";
import ChatListBody from "./ChatListBody/ChatListBody.tsx";
import ChatListFooter from "./ChatListFooter/ChatListFooter.tsx";
import {useLocation, useParams} from "react-router-dom";
import {TicketType} from "./TicketType.tsx";
import "./fixed__head__foot__chat__list.scss"


const TicketChatList2 = () => {
    const myLocation = useLocation();

    const paramId = useParams().id;

    const initialDataChatList: TicketType = {
        createAt: "",
        statusName:"",
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
            <div className="fixed__head__foot__chat__list">
                {/* Fixed Header */}
                <div className="headerClass">

                    <ChatListHeader />
                </div>

                {/* Scrollable Body */}
                <div className="bodyClass">
                    <ChatListBody />
                </div>

                {/* Fixed Footer */}
                <div className="footerClass">
                    <ChatListFooter />
                </div>
            </div>
        </GetChatListDataComponent>

    </ChatListProvider>
}

export default TicketChatList2;
