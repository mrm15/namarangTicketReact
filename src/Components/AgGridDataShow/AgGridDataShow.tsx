import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {AgGridReact} from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css';
import ControlColumns from "./ControlColumns.tsx"; // Optional theme CSS

const AgGridDataShow = (props) => {

    const {columnDefs, rowData,onCellClicked} = props
    const [myColumnDefs, setMyColumnDefs] = useState(columnDefs);

    const [myRowData, setMyRowData] = useState(rowData);

    // این افکت برای وقتهی که محتوای جدول عوض بشه باید دوباره یه رندر بشه تا آپدیت بشه
    useEffect(() => {
        setMyRowData(rowData)
    }, [rowData]);

    const onBodyScroll = useCallback((event) => {
        console.log("Scroll Event: ", event);
        // Implement your custom logic here
    }, []);

    const persianLocale = {
        // For example:
        page: 'صفحه',
        more: 'بیشتر',
        to: 'تا',
        of: 'از',
        next: 'بعدی',
        last: 'آخرین',
        first: 'اولین',
        previous: 'قبلی',
        loadingOoo: 'در حال بارگذاری...',

        // Other translations go here
    };

    const changeColumnDefsControl = (e, selectedColRow) => {

         
        const newValue = e.target.checked
        const newCols = myColumnDefs.map((v: any) => {
            const row = {...v}
            if (row.field === selectedColRow.field) {
                row.hide = !newValue
            }
            return row
        })

        setMyColumnDefs(newCols)
    }




    const gridRef = useRef(null);

    const onGridReady = (params) => {
        const allColumnIds = [];
        params.columnApi.getAllColumns().forEach((column) => {
            allColumnIds.push(column.colId);
        });

        params.columnApi.autoSizeColumns(allColumnIds, false);
    };

    useEffect(() => {
        const handleResize = () => {
            if (gridRef.current) {
                gridRef.current.api.sizeColumnsToFit();
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const getRowStyle = (params) => {

        const randomNumber = Math.random()*100
        if(randomNumber<50){
            // return { fontWeight: 'bold' };
            return null
        }
        return null
        // if (!params?.data?.isOpened) {  // Assuming 'isOpened' is your condition
        //     return { fontWeight: 'bold' };
        // }
        // return { fontWeight: 'bold' };
    };


    // Grid options
    const gridOptions = {
        // other grid options...
        rowHeight: 40, // Set your desired row height here
        getRowStyle: getRowStyle,

    };
    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            minWidth: 200,
            floatingFilter: true,
        };
    }, []);
    return (
        <div className="ag-theme-alpine" style={{height: "70vh", width: '100%', direction: 'rtl'}}
        >
            <AgGridReact
                ref={gridRef}
                gridOptions={gridOptions}

                onGridReady={onGridReady}
                onCellClicked={onCellClicked}
                //
                columnDefs={myColumnDefs}
                rowData={myRowData}
                onBodyScroll={onBodyScroll}
                localeText={persianLocale}
                pagination={true}
                paginationPageSize={10}
                enableRtl={true}
                rowSelection="multiple"
                defaultColDef={{
                    flex: 1,
                    minWidth: 100,
                    filter: true,
                    resizable: true,
                    floatingFilter: true,
                }}




            />
            <div>
                <ControlColumns
                    columnDefs={myColumnDefs}
                    onChange={changeColumnDefsControl}
                />
            </div>
        </div>
    );
};

export default AgGridDataShow;
