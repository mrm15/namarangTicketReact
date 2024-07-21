import React, {useContext} from 'react';
import {AgGridReact} from "ag-grid-react";
import ListContact from "../Components/Contact/ListContact.tsx";
import ListUsers from "../Components/User/ListUsers.tsx";
import {ReportBillContext} from "./ReportBillContext.tsx";
import {tempData} from "./tempData.tsx";
import ReactTableDataShow from "../Components/ReactTableDataShow/ReactTableDataShow.tsx";
import Pagination from "./Pagination.tsx";

const TableSection = () => {
    const t = useContext(ReportBillContext);
    const {awesomeData, setAwesomeData} = t

    try {
        return (
            <div>
                <div>
                    <ReactTableDataShow

                    />
                </div>

                <div className={'mt-10 flex flex-wrap justify-between'}>
                    <div className={''}>
                        <div className={'flex flex-wrap gap-2'}>
                            {[5,10,15,20,30,50,100].map((singleNumber, index) => {


                                console.log(awesomeData.numberOfRowsShowInTable)
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
                            <Pagination />
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error:any) {
        <div>{error?.toString()}</div>
    }
};

export default TableSection;
