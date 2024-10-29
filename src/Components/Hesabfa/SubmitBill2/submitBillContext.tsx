import createDynamicContext from "../../DynamicContext/DynamicContext";
import {IInitialBillData} from "./initialDataTypes";


export const {
    Provider: SubmitBillProvider,
    useDynamicContext: useSubmitBillContext
} = createDynamicContext<IInitialBillData>();