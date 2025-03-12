import React, { useRef } from 'react';
import { LuDownload } from "react-icons/lu";
import { GrUpload } from "react-icons/gr";
import { useSubmitBillContext } from "../../submitBillContext.tsx";
import { toast } from "react-hot-toast";

const secretKey = "mySimpleKey"; // Your custom key

// --- UTF-8 Safe Base64 encode/decode helpers ---

const encodeBase64 = (str: string): string => {
    const encoder = new TextEncoder();
    const bytes = encoder.encode(str);
    let binary = '';
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return btoa(binary);
};

const decodeBase64 = (base64: string): string => {
    const binary = atob(base64);
    const bytes = new Uint8Array([...binary].map((char) => char.charCodeAt(0)));
    const decoder = new TextDecoder();
    return decoder.decode(bytes);
};

// --- Simple XOR with Base64 encode/decode ---

const simpleEncrypt = (text: string, key: string): string => {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return encodeBase64(result); // Safe for Unicode
};

const simpleDecrypt = (encryptedText: string, key: string): string => {
    const decoded = decodeBase64(encryptedText);
    let result = '';
    for (let i = 0; i < decoded.length; i++) {
        result += String.fromCharCode(decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return result;
};

const DownloadUploadItems = () => {
    const { data, setData } = useSubmitBillContext();

    // Download invoice items to an encrypted file.
    const handleDownload = () => {
        // Extract the invoice items from data.
        const { invoice: { InvoiceItems } } = data;
        // Convert the array of objects to a JSON string.
        const fileData = JSON.stringify(InvoiceItems, null, 2);
        // Encrypt the file data.
        const encryptedData = simpleEncrypt(fileData, secretKey);
        // Create a blob with MIME type text/plain.
        const blob = new Blob([encryptedData], { type: 'text/plain;charset=utf-8' });
        // Create a temporary URL for the blob.
        const url = URL.createObjectURL(blob);
        // Create an anchor element and trigger a download.
        const link = document.createElement('a');
        link.href = url;
        link.download = `${(data?.invoice?.ContactTitle) ?? "invoice"}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        toast.success('آیتم ها دانلود شدند.');
    };

    // Reference to the hidden file input element.
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Trigger file input click for upload.
    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    // Handle file selection, decrypt the content, and update context data.
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const fileContent = e.target?.result;
                    if (typeof fileContent === 'string') {
                        // Decrypt the file content.
                        const decryptedData = simpleDecrypt(fileContent, secretKey);
                        const parsedInvoiceItems = JSON.parse(decryptedData);
                        // Update the context with the uploaded invoice items.
                        if (confirm(`تمامی آیتم های قبلی حذف و آیتم های جدید جایگزین میشود. 
                          
                          آیا مطمئن هستید؟؟؟`)){
                            setData({ ...data, invoice: { ...data.invoice, InvoiceItems: parsedInvoiceItems } });
                            toast.success('آیتم‌های جدید بارگزاری شدند.');
                        }
                    }
                } catch (error) {
                    console.error(error);
                    toast.error('خطا در بارگذاری فایل');
                }
            };
            reader.readAsText(file);
        }
    };

    return (
        <>
            <div
                title="download"
                className="btn-white-border-mir"
                onClick={handleDownload}
            >
                <LuDownload size={16} />
            </div>
            <div
                title="upload"
                className="btn-white-border-mir relative"
                onClick={handleUploadClick}
            >
                <GrUpload size={16} />
            </div>
            {/* Hidden file input for upload */}
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept=".txt, text/plain, application/json"
                onChange={handleFileChange}
            />
        </>
    );
};

export default DownloadUploadItems;
