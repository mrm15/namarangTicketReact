import createDynamicContext from "../DynamicContext/DynamicContext";
import {IBankData} from "./bankTypes";

export const {
    Provider: BankProvider,
    useDynamicContext: useBankContext
} = createDynamicContext<IBankData>();