import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const downloadComponentAsPDF = async (componentRef, fileName = 'document.pdf') => {
    const element = componentRef.current;

    try {
        // Use html2canvas to capture the entire component
        const canvas = await html2canvas(element, {
            scale: 2, // Adjust scale to capture higher resolution content
            logging: true, // Enable logging to see any issues in console
        });

        const imgData = canvas.toDataURL('image/png');

        // Determine the PDF dimensions based on captured content

        const canvasWidth = canvas.width
        const canvasHeight = canvas.height

        const pdf = new jsPDF({
            orientation: "l", //  portrait  or landscape
            unit: 'px',
            format: [canvasWidth, canvasHeight],

        });

        // Add the captured image to PDF
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);

        // Save the PDF with the specified file name
        pdf.save(fileName);
    } catch (error) {
        console.error('Error generating PDF:', error);
        // Handle errors if necessary
    }
};
