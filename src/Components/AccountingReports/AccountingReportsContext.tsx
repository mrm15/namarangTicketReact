import createDynamicContext from "../DynamicContext/DynamicContext";
import {AccountingReportsTypes} from "./AccountingReportsTypes";


export const {
    Provider: AccountingReportsProvider,
    useDynamicContext: useAccountingReportsContext
} = createDynamicContext<AccountingReportsTypes>();