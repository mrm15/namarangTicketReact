// AdvancedTicketContext  TicketContext
import createDynamicContext from "../../DynamicContext/DynamicContext";
import {AdvancedTicketTypes} from "./AdvancedTicketTypes.tsx";

export const {
    Provider: AdvancedTicketContextProvider,
    useDynamicContext: useAdvancedTicketContext
} = createDynamicContext<AdvancedTicketTypes>();