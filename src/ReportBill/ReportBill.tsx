import React, {useEffect} from 'react';
import useAxiosPrivate from "../hooks/useAxiosPrivate.tsx";
import {getBillList} from "../config/api.tsx";
import {
    timestampToFormattedDateToSendHesabfa,
    timestampToTimeFromHesabfa
} from "../utils/utilsFunction.tsx";
import {excelExportForHesabfa} from "../utils/excelExport.tsx";
import {toast} from "react-toastify";
import {p2e} from "../utils/NumericFunction.tsx";
import TableSection from "./TableSection.tsx";
import {ReportBillContext} from "./ReportBillContext.tsx"
import useObjectDataHolder from "../hooks/UseObjectDataHolder.tsx";
import {IAwesomeData} from "./myTypes.tsx";
import {columns, data as tableDataForTest} from "../Components/ReactTableDataShow/SampleTableData.tsx"
import Num2persian from 'num2persian';
import ToggleSwitch from "../Components/UI/ToggleSwitch/ToggleSwitch.tsx";
import {makeRowIdBasedOnPageNumber} from "./functions.tsx";
import {BsFileEarmarkExcelFill} from "react-icons/bs";
import {MdPivotTableChart} from "react-icons/md";
import {HandleExportToExcel} from "./HandleExportToExcel.tsx";
import PivotsByData from "./PivotHere/PivotsByData.tsx";


const ReportBill = () => {


    const myAxios = useAxiosPrivate();


    const [awesomeData, setAwesomeData] = useObjectDataHolder<IAwesomeData>({
        columns: columns,
        numberOfRowsShowInTable: 5,
        totalPages: 0,
        tableHeaders: [],
        tableData: [],
        totalData: [],
        reload: "",
        TotalCount: 10000000,
        FilteredCount: 10000,
        currentSelectedPage: 1,
        filterItems: [],
    });

    // useEffect(() => {
    //     void updateTableData();
    // }, []);

    const exportToExcel = async () => {
        await HandleExportToExcel({myAxios, awesomeData})
    }
    const pivotTotalData = async () => {
        await HandleExportToExcel({myAxios, awesomeData, setAwesomeData})
    }


    const updateTableData = async () => {
        const skipFromTheFirst = (awesomeData.currentSelectedPage - 1) * awesomeData.numberOfRowsShowInTable;
        const TakeNumberOfData = awesomeData.numberOfRowsShowInTable
        const queryInfo = {
            SortBy: 'Date',
            SortDesc: true,
            Take: TakeNumberOfData,
            Skip: skipFromTheFirst,
            filters: awesomeData.filterItems
        }


        const data = {queryInfo}
        const tId = toast.loading("در حال به روز رسانی جدول")
        const resultOfGetFactorList = await myAxios.post(getBillList, data)
        toast.dismiss(tId)
        if (resultOfGetFactorList.status === 200) {
            const List: [{ Sum: number }] = resultOfGetFactorList.data.data.List;
            const totalSum = List.reduce(((accumulator, currentValue) => accumulator + currentValue.Sum), 0)
            console.log("totalSum: ")
            console.log(totalSum.toLocaleString())
            console.log(Num2persian(totalSum));
            const listOfData = resultOfGetFactorList.data.data.List
            const TotalCount = resultOfGetFactorList.data.data.TotalCount
            const FilteredCount = resultOfGetFactorList.data.data.FilteredCount
            const temp = listOfData.map((row: any) => {
                try {
                    const myTag = JSON.parse(row.Tag)
                    if (myTag) {
                        return {
                            ...row,
                            sellerName: myTag.n,
                            orderNumber: myTag.tn
                        }
                    }
                } catch (error) {
                    return row
                }


            })
            return {
                // totalData: temp,
                tableData: temp,
                TotalCount,
                FilteredCount
            }
        } else {
            return undefined
        }
    }


    useEffect(() => {

        void updateTableData().then(result => {

            if (!result) {
                return
            }

            setAwesomeData({
                tableData: makeRowIdBasedOnPageNumber({
                    tableData: result.tableData,
                    currentPageNumber: awesomeData.currentSelectedPage,
                    totalRowsInPage: awesomeData.numberOfRowsShowInTable,
                }),
                TotalCount: result.TotalCount,
                FilteredCount: result.FilteredCount,
            })

            // Calculate the start and end indices for the current page
            // const startIndex = (awesomeData.currentSelectedPage - 1) * awesomeData.numberOfRowsShowInTable;
            // const endIndex = startIndex + awesomeData.numberOfRowsShowInTable;
            // const tableData = result.slice(startIndex, endIndex);
            // if (tableData.length >= endIndex - startIndex) {
            //     setAwesomeData({tableData})
            // }


        })
    }, [awesomeData.numberOfRowsShowInTable, awesomeData.currentSelectedPage, awesomeData.reload,
        awesomeData.filterItems]);


    const handleCheckToggle = (checkStatus: boolean) => {
        let newFilter: any[];

        if (checkStatus) {
            // Add the "Status" filter with value "1"
            newFilter = [
                ...awesomeData.filterItems,
                {
                    "property": "Status",
                    "operator": "=",
                    "value": 1
                }
            ];
        } else {
            // Remove the "Status" filter
            newFilter = awesomeData.filterItems.filter((filter: any) => filter.property !== "Status");
        }

        setAwesomeData({
            filterItems: newFilter,
            currentSelectedPage: 1,
        });
    };


    try {
        return (
            <div>
                <ReportBillContext.Provider value={{awesomeData, setAwesomeData}}>

                    <div className={'flex flex-wrap justify-between gap-2 m-5'}>
                        <div>
                            <ToggleSwitch
                                checkedText={"      تایید"}
                                unCheckedText={"همه"}
                                onChange={handleCheckToggle}
                            />
                        </div>
                        <div className={'flex gap-2'}>
                            <button
                                onClick={pivotTotalData}
                                // className={'btn-submit-mir'}
                                className={"bg-green-600 py-2 px-5 rounded"}
                                title={"Pivot"}
                            >

                                <div className={"flex items-center gap-2"}>
                                    <MdPivotTableChart/>
                                    {/*<div>Pivot</div>*/}
                                </div>
                            </button>


                            <button
                                onClick={exportToExcel}
                                className={"bg-green-600 py-2 px-5 rounded"}
                                title={"صدور به اکسل"}
                            >

                                <div className={"flex items-center gap-2"}>
                                    <BsFileEarmarkExcelFill/>
                                    {/*<div>Export</div>*/}
                                </div>
                            </button>
                        </div>

                    </div>
                    <TableSection/>
                    <div className={"mt-10"}>
                        <hr/>
                    </div>
                    {awesomeData.totalData.length !== 0 && <PivotsByData/>}


                </ReportBillContext.Provider>
            </div>
        );
    } catch (error) {
        return <>{error.toString()}</>
    }
};

export default ReportBill;
