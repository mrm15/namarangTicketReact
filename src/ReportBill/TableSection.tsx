import React, {useContext} from 'react';
import {AgGridReact} from "ag-grid-react";
import ListContact from "../Components/Contact/ListContact.tsx";
import ListUsers from "../Components/User/ListUsers.tsx";
import {ReportBillContext} from "./ReportBillContext.tsx";
import {tempData} from "./tempData.tsx";
import ReactTableDataShow from "../Components/ReactTableDataShow/ReactTableDataShow.tsx";
import Pagination from "./Pagination.tsx";
import TableFilterSection from "./TableFilterSection.tsx";


const TableSection = () => {
    const t = useContext(ReportBillContext);
    const {awesomeData, setAwesomeData} = t



    try {
        return (
            <div>
                <div>
                    <ReactTableDataShow
                        columns={awesomeData.columns}
                        data={awesomeData.tableData}
                        TableFilterSection={TableFilterSection}
                    />
                </div>

                <div className={'mt-10 flex flex-wrap justify-between'}>
                    <div className={''}>
                        <div className={'flex flex-wrap gap-2'}>
                            {[5, 10, 15, 20, 30, 50, 100 , 200,5000].map((singleNumber, index) => {



                                return <button
                                    key={index}
                                    className={` ${awesomeData.numberOfRowsShowInTable === singleNumber ? 'btn-gay-mir ' : 'btn-white-border-mir'}`}

                                    onClick={() => setAwesomeData({numberOfRowsShowInTable: singleNumber})}
                                >{singleNumber}</button>
                            })}

                        </div>
                    </div>
                    <div className={''}>
                        <div className={''}>
                            <div></div>
                            <Pagination/>
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error: any) {
        <div>{error?.toString()}</div>
    }
};

export default TableSection;
