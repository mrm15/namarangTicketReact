import React, {useContext} from 'react';
import {ReportBillContext} from "../ReportBillContext.tsx";
import singlePivotData from "./singlePivotData.tsx";
import SinglePivotData from "./singlePivotData.tsx";
import PrintComponent from "../../Components/PrintComponent/PrintComponent.tsx";
import {pivotArray} from "./pivotArray.tsx";

const PivotsByData = () => {

    const t = useContext(ReportBillContext);
    const {awesomeData, setAwesomeData} = t

    return (
        <PrintComponent
            printButtonLabel={"چاپ"}
            orientation={"A4 landscape"}

        >
            <div className={"flex flex-wrap gap-2 justify-center"}>
                {pivotArray.map((row, index) => <SinglePivotData
                    key={index}
                    filterTextForPivot={row.filterTextForPivot}
                    totalData={awesomeData.totalData}
                    myKey={row.myKey}
                    sumKey={row.sumKey}
                    countKey={row.countKey}
                />)}


            </div>

        </PrintComponent>
    );
};

export default PivotsByData;
