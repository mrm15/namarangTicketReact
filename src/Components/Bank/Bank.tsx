import {BankProvider} from "./bankContext";
import BankData from "./BankData/BankData";
import {dateObjectToIso8601} from "../../utils/utilsFunction.tsx";
import {DateObject} from "react-multi-date-picker";


const Bank = () => {
    // Create a DateObject instance representing today at midnight (00:00:00.000)
    const todayDate = new DateObject().set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    // Create a DateObject instance for tomorrow by adding one day to todayDate
    const tomorrowDateObject = new DateObject(todayDate).add(1, "day");
    // Initialize the data used for filters, including start and end dates
    const initialData = {
        filters: [
            {uniqId: "startDate", Property: "Date", Operator: ">=", Value: dateObjectToIso8601(todayDate), showValue: todayDate.toDate()},
            {uniqId: "endDate", Property: "Date", Operator: "<", Value: dateObjectToIso8601(tomorrowDateObject), showValue: tomorrowDateObject.toDate()},
        ],
        tableData: [],
        requestUrl: "",
        reload:"",
    }

    return (
        <BankProvider initialData={initialData}>
            <BankData/>
        </BankProvider>
    );
};

export default Bank;
