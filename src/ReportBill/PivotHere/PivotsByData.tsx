import React, {useContext} from 'react';
import {ReportBillContext} from "../ReportBillContext.tsx";
import SinglePivotData from "./SinglePivotData.tsx";
import PrintComponent from "../../Components/PrintComponent/PrintComponent.tsx";
import {pivotArray} from "./pivotArray.tsx";
import {HandleExcelFile} from "./HandleExcelFile.tsx";

const PivotsByData = () => {

    const t = useContext(ReportBillContext);
    const {awesomeData, setAwesomeData} = t

    return (
        <div>
            <button
                onClick={() => HandleExcelFile(awesomeData.totalData)}
                className={"btn-red-border-mir"}
            >
                دریافت فایل اکسل خروجی
            </button>
            <PrintComponent
                printButtonLabel={"چاپ"}
                orientation={"A4 landscape"}
            >
                <div className={"flex flex-wrap gap-2 justify-start"}>
                    {pivotArray.map((row, index) => <SinglePivotData
                        key={index}
                        filterTextForPivot={row.filterTextForPivot}
                        totalData={awesomeData.totalData}
                        myKey={row.myKey}
                        sumKey={row.sumKey}
                        countKey={row.countKey}
                        caption={row.caption}
                        showSubitems={row.showSubitems}
                    />)}
                </div>
            </PrintComponent>

        </div>
    );
};

export default PivotsByData;
