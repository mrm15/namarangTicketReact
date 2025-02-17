// AdvancedTicketContext  TicketContext
import createDynamicContext from "../../DynamicContext/DynamicContext";

export const {
    Provider: AdvancedTicketContextProvider,
    useDynamicContext: useAdvancedTicketContext
} = createDynamicContext<any>();