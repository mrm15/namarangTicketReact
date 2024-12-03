import React from 'react';
import * as XLSX from "xlsx-js-style";
import {pivotArray} from "./pivotArray.tsx";
import {calculatePivot} from "./pivotFunction.tsx";

export const HandleExcelFile = (totalData) => {


    const resultArray = []
    pivotArray.forEach(row => {
        let sumOfQuantity = 0
        const filterTextForPivot = row.filterTextForPivot;
        const myKey = row.myKey
        const sumKey = row.sumKey
        const countKey = row.countKey
        const temp = calculatePivot({filterTextForPivot, totalData, myKey, sumKey, countKey});

        resultArray.push([row.caption]); // i need to merge two rows here
        const itemCode = "کد"
        const nameText = "نام"
        const countText = "تعداد"
        resultArray.push([itemCode, nameText, countText])


        temp.forEach((resultRow: any) => {
            const itemCodeText = resultRow?.myItemCode || "";
            const nameText = resultRow[myKey]
            const countKeyText = resultRow[countKey]
            sumOfQuantity += countKeyText
            resultArray.push([itemCodeText,nameText, countKeyText])
            if (row.showSubitems) {

                const subRowKey = "myContactTitle";
                const subRowValue = "myQuantity";
                resultRow.rowData.forEach(rr => {
                    const rowDataNameText = rr[subRowKey]
                    const rowDataSumKeyText = rr[subRowValue]
                    resultArray.push(["",rowDataNameText, rowDataSumKeyText])
                })
            }
        })

        resultArray.push(["","جمع", sumOfQuantity])
        resultArray.push([])


    })


    // Create a new workbook
    const wb = XLSX.utils.book_new();
    // Add the RTL view to the workbook
    wb.Workbook = {
        Views: [
            {RTL: true}
        ]
    };


    // Sheet 1 data
    const sheet1Data = [
        ...resultArray,
        // [],
        // ["Header 1", "Header 2", "Header 3"],  // Headers
        // ["Row 1 Col 1", "Row 1 Col 2", "Row 1 Col 3"],
        // ["Row 2 Col 1", "Row 2 Col 2", "Row 2 Col 3"],
    ];

    // Sheet 2 data
    // const sheet2Data = [
    //     [sheet2Description],  // Description row
    //     [],
    //     ["Header A", "Header B", "Header C"],  // Headers
    //     ["Row 1 Col A", "Row 1 Col B", "Row 1 Col C"],
    //     ["Row 2 Col A", "Row 2 Col B", "Row 2 Col C"],
    // ];

    // Create sheets
    const ws1 = XLSX.utils.aoa_to_sheet(sheet1Data);
    // const ws2 = XLSX.utils.aoa_to_sheet(sheet2Data);

    // Set sheet direction to RTL
    ws1['!dir'] = 'rtl';
    ws1['!cols'] = [
        {wpx: 50}, // Column A width in pixels
        {wpx: 250}, // Column B width in pixels
        {wpx: 100}, // Column C width in pixels
    ];

    // Merging cells A1 and B1
    // ws1['!merges'] = [
    //     {s: {r: 0, c: 0}, e: {r: 0, c: 1}} // Merges A1 (0, 0) and B1 (0, 1)
    // ];

    // Set up dynamic merging
    ws1['!merges'] = [];

    // Iterate through resultArray to find captions and merge
    resultArray.forEach((row, rowIndex) => {
        if (row.length === 1) { // Caption is a single element in a row

            // Initialize !merges array if it doesn't exist
            ws1['!merges'] = ws1['!merges'] || [];

            // Add merge instruction for merging 3 cells
            ws1['!merges'].push({
                s: {r: rowIndex, c: 0}, // Start at rowIndex, column 0
                e: {r: rowIndex, c: 2}  // End at rowIndex, column 2 (merge three columns)
            });

            // Get the cell address to apply styles
            const cellAddress = XLSX.utils.encode_cell({r: rowIndex, c: 0});

            // Initialize the cell if it doesn't exist yet
            if (!ws1[cellAddress]) {
                ws1[cellAddress] = {};
            }

            // Apply styles to the merged cell
            ws1[cellAddress].s = {
                font: {bold: true}, // Make the text bold
                alignment: {horizontal: "center", vertical: "center"} // Center the text
            };
        }
    });

    // Add sheets to workbook
    XLSX.utils.book_append_sheet(wb, ws1, "گزارش انبار نمارنگ");
    // XLSX.utils.book_append_sheet(wb, ws2, "Sheet 2");

    // Generate Excel file and trigger download
    XLSX.writeFile(wb, "example.xlsx");
};




