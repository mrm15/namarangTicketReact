import "./SummaryTable.scss"
import {useContext} from "react";
import {AdminReportContext} from "../AdminReportContext.tsx";
import {calculateTable1} from "./calculateTable1.tsx";

const SummaryTable = () => {

    const context = useContext(AdminReportContext)
    const {myData} = context;
    console.log(myData);
    console.table(myData.titleData);

    // const table1 = calculateTable1(myData.titleData)



    return (
        <div className={"summaryTable"}>
            <div>

                <div className={"ul_li_table"}>
                    <ul>
                        <li>آیتم</li>
                        <li>مبلغ</li>
                    </ul>



                </div>

                <table className="table-auto">
                    <thead>
                    <tr>
                        <th>آیتم</th>
                        <th>مبلغ</th>

                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td> , Pottersville)</td>
                        <td>Malcolm Lockyer</td>
                    </tr>
                    <tr>
                        <td>Witchy Woman</td>
                        <td>The Eagles</td>

                    </tr>
                    <tr>
                        <td>Shining Star</td>
                        <td>Earth, Wind, and Fire</td>

                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SummaryTable;