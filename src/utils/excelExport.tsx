import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

interface Header {
    title: string;
    key: string;
    task?: (value: any) => any;
}

interface ExcelExportProps {
    data: any[];
    headers: Header[];
    fileName: string;
}

interface WorksheetView {
    rightToLeft: boolean;
}

interface WorkbookView {
    RTL: boolean;
}

export const excelExport = ({data, headers, fileName}: ExcelExportProps) => {
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

    // Calculate column widths based on content
    const columnWidths = headers.map((_, index) => {
        let maxWidth = headers[index].title.length;

        // Check width of each cell in the column
        formattedData.forEach(row => {
            const cellValue = Object.values(row)[index];
            const cellLength = cellValue ? String(cellValue).length : 0;
            maxWidth = Math.max(maxWidth, cellLength);
        });

        // Add some padding and return the width
        return { wch: maxWidth + 2 };
    });

    // Set column widths
    worksheet['!cols'] = columnWidths;

    // Set worksheet properties for RTL
    worksheet['!rows'] = worksheet['!rows'] || [];
    worksheet['!views'] = [
        { rightToLeft: true } as WorksheetView
    ];

    // Set default column properties
    const defaultColProperties = {
        style: {
            alignment: {
                horizontal: 'right',
                vertical: 'center',
                wrapText: true
            }
        }
    };

    // Apply RTL styling to all cells
    const range = XLSX.utils.decode_range(worksheet['!ref'] || '');
    for(let R = range.s.r; R <= range.e.r; ++R) {
        for(let C = range.s.c; C <= range.e.c; ++C) {
            const cellRef = XLSX.utils.encode_cell({c: C, r: R});
            if (!worksheet[cellRef]) continue;

            worksheet[cellRef].s = {
                ...defaultColProperties.style,
                font: { name: 'Arial' }
            };
        }
    }

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();

    // Set workbook properties
    (workbook as any).Workbook = {
        Views: [{
            RTL: true
        } as WorkbookView]
    };

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Write the workbook
    const excelBuffer = XLSX.write(workbook, {
        bookType: 'xlsx' as const,
        type: 'array' as const,
        bookSST: false
    });

    const dataBlob = new Blob([excelBuffer], {type: 'application/octet-stream'});
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
        headersSheet2.forEach((header) => {
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