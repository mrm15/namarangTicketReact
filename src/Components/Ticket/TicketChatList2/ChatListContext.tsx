import createDynamicContext from "../../DynamicContext/DynamicContext";
import {TicketType} from "./TicketType.tsx";


export const {
    Provider: ChatListProvider,
    useDynamicContext: useChatListContext
} = createDynamicContext<TicketType>();
