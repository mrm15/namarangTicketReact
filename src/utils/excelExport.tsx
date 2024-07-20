import * as XLSX from 'xlsx';
import {saveAs} from 'file-saver';

export const excelExport = ({data, headers, fileName}) => {
    // Format the data with headers
    const formattedData = data.map((item) => {
        const newItem: { [key: string]: any } = {};
        headers.forEach((header) => {
            newItem[header.title] = header.task ? header.task((item)[header.key]) : (item)[header.key];
        });
        return newItem;
    });

    // Create a worksheet
    const worksheet = XLSX.utils.json_to_sheet(formattedData);

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Write the workbook and create a Blob
    const excelBuffer = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
    const dataBlob = new Blob([excelBuffer], {type: 'application/octet-stream'});

    // Use file-saver to save the file
    saveAs(dataBlob, `${fileName}.xlsx`);
};
export const excelExportForHesabfa = ( {dataSheet1, headersSheet1, fileName , dataSheet2 , headersSheet2}) => {
    // {dataSheet1, headersSheet1, fileName , dataSheet2 , headersSheet2}
    // Format the data with headers
    const formattedDataSheet1 = dataSheet1.map((item) => {
        const newItem: { [key: string]: any } = {};
        headersSheet1.forEach((header) => {
            newItem[header.title] = header.task ? header.task((item)[header.key]) : (item)[header.key]
        })
        return newItem
    });

    const formattedDataSheet2 = dataSheet2.map((item) => {
        const newItem: { [key: string]: any } = {};
        headersSheet1.forEach((header) => {
            newItem[header.title] = header.task ? header.task((item)[header.key]) : (item)[header.key]
        })
        return newItem;
    })

    // Create a worksheet
    const worksheet = XLSX.utils.json_to_sheet(formattedDataSheet1);
    const worksheet2 = XLSX.utils.json_to_sheet(formattedDataSheet2);

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'فاکتور فروش');
    XLSX.utils.book_append_sheet(workbook, worksheet2, 'فاکتور فروش - آیتم ها');

    // Write the workbook and create a Blob
    const excelBuffer = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
    const dataBlob = new Blob([excelBuffer], {type: 'application/octet-stream'});

    // Use file-saver to save the file
    saveAs(dataBlob, `${fileName}.xlsx`);
};