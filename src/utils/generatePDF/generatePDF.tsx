import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import vazirFont from './vazirFont'; // فونت فارسی Base64

interface TableColumn {
    header: string;
    dataKey: string;
}

interface TableRow {
    [key: string]: any;
}

interface inputType {
    title: string;
    columns: TableColumn[];
    rows: TableRow[];
    fileName: string;
}

export const generatePDF = ({
                                title,
                                columns,
                                rows,
                                fileName = 'table.pdf',
                            }: inputType): void => {
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
    });

    // ثبت فونت فارسی
    doc.addFileToVFS('Vazir.ttf', vazirFont);
    doc.addFont('Vazir.ttf', 'Vazir', 'normal');
    doc.setFont('Vazir');
    doc.setFontSize(8); // تنظیم سایز فونت کلی

    const pageWidth = doc.internal.pageSize.width; // عرض صفحه
    const pageHeight = doc.internal.pageSize.height; // ارتفاع صفحه

    autoTable(doc, {
        head: [columns.map((col) => col.header)], // عناوین ستون‌ها
        body: rows.map((row) => columns.map((col) => row[col.dataKey] ?? ' _')), // داده‌های جدول
        startY: 20,
        margin: { top: 30 }, // فاصله از بالای صفحه
        didDrawPage: (data) => {
            // اضافه کردن عنوان به بالای هر صفحه
            doc.setFontSize(8); // فونت عنوان
            doc.text(title, pageWidth / 2, 10, { align: 'center' });
        },
        styles: {
            lineWidth: 0.1, // ضخامت خطوط سلول‌ها
            lineColor:[0,0,0,],
            font: 'Vazir', // استفاده از فونت فارسی
            fontStyle: 'normal',
            fontSize: 8, // سایز فونت بدنه جدول
            textColor: [0, 0, 0],
        },
        headStyles: {
            fillColor: [220, 220, 220],
            fontSize: 8, // سایز فونت برای هدر جدول
            halign: 'right', // راست‌چین هدر
        },
        bodyStyles: {
            fontSize: 8, // سایز فونت برای بدنه جدول
            halign: 'right', // راست‌چین داده‌ها
        },
    });

    // اضافه کردن شماره صفحات بعد از رندر کامل
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.text(
            `صفحه ${i} از ${totalPages}`,
            pageWidth - 20,
            pageHeight - 10,
            { align: 'right' }
        );
    }

    // ذخیره فایل PDF
    doc.save(fileName);
};
