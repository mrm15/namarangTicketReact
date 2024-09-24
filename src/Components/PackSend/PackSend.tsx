import React, {useEffect} from 'react';
import useObjectDataHolder from "../../hooks/UseObjectDataHolder.tsx";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.tsx";
import {getDataFromHesabfaBasedOnFilterState} from "../../ReportBill/functions.tsx";
import {IPackSend, IPackSendContextType} from "./myTypes.tsx";
import {formatDateForBackend} from "../../utils/utilsFunction.tsx";
import {PackSendContext} from "./PackSendContext";
import PackSendMain from "./PackSendMain/PackSendMain.tsx";
import TableG from "../TableG/TableG.tsx";

const PackSend = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayFormatted = formatDateForBackend(today);

    const [myData, setMyData] = useObjectDataHolder<IPackSend>({
        titleData: [],
        detailsData: [],
        reload: "",
        // filterItems:undefined,
        filterItems: [
            {
                Property: 'Date',
                Operator: '=',
                Value: todayFormatted,
            },
        ],
        isLoading: true,
    })

    return (<div>
        <TableG
            url={"/hesabfa/getBillListData"}
        />
    </div>)
};

export default PackSend;
