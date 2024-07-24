import React, {useContext} from 'react';
import {ReportBillContext} from "../ReportBillContext.tsx";
import singlePivotData from "./singlePivotData.tsx";
import SinglePivotData from "./singlePivotData.tsx";

const PivotsByData = () => {

    const t = useContext(ReportBillContext);
    const {awesomeData, setAwesomeData} = t
    return (
        <div className={"flex flex-wrap gap-2"}>
            <SinglePivotData
                totalData={awesomeData.totalData}
                filterTextForPivot={["اجرت ساخت"]}
                myKey={"myItemName"}
                sumKey={"myTotalAmount"}
                countKey={"Quantity"}
            />
            <SinglePivotData
                totalData={awesomeData.totalData}
                filterTextForPivot={["ترانس"]}
                myKey={"myItemName"}
                sumKey={"myTotalAmount"}
                countKey={"Quantity"}

            />
            <SinglePivotData
                totalData={awesomeData.totalData}
                filterTextForPivot={["SMD"]}
                myKey={"myItemName"}
                sumKey={"myTotalAmount"}
                countKey={"Quantity"}

            />
            <SinglePivotData
                totalData={awesomeData.totalData}
                filterTextForPivot={["لبه"]}
                myKey={"myItemName"}
                sumKey={"myTotalAmount"}
                countKey={"Quantity"}

            />
            <SinglePivotData
                totalData={awesomeData.totalData}
                filterTextForPivot={["ورق استیل"]}
                myKey={"myItemName"}
                sumKey={"myTotalAmount"}
                countKey={"Quantity"}

            />

        </div>
    );
};

export default PivotsByData;
