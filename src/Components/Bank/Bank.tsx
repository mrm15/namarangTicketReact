import {BankProvider} from "./bankContext";
import BankData from "./BankData/BankData";

const Bank = () => {

    const currentDate = new Date();
    const tomorrowJsDate = new Date(currentDate);
    tomorrowJsDate.setDate(currentDate.getDate() + 1);
    const initialData = {
        filters: [
            {uniqId: "startDate", Property: "Date", Operator: "<=", Value: currentDate, showValue: currentDate},
            {uniqId: "endDate", Property: "Date", Operator: ">", Value: tomorrowJsDate, showValue: tomorrowJsDate},
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
