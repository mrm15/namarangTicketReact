import "./SummaryTable.scss"
import {useContext} from "react";
import {AdminReportContext} from "../AdminReportContext.tsx";
import DropDown from "./DropDown/DropDown.tsx";
import TableView from "../ReportTable/TableView.tsx";

const SummaryTable = ({myData}) => {




    try {
        return (
            <div className={"summaryTable"}>

                <div>
                    <TableView data={myData.tableView}/>
                </div>
                <hr/>
                <div>

                    <DropDown data={myData.treeView}/>
                </div>
            </div>
        );
    } catch (error) {
        return <>{error.toString()}</>;
    }
};

export default SummaryTable;