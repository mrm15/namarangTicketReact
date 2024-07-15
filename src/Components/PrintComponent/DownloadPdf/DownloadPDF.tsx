import React, {useRef} from 'react';
import {downloadComponentAsPDF} from './utility.tsx';
import { FaFilePdf } from "react-icons/fa";

const DownloadPDF = ({children, fileName = 'document.pdf'}) => {
    const componentRef = useRef();

    const handleDownload = async () => {
        await downloadComponentAsPDF(componentRef, fileName);
    };

    return (
        <div>
            <button
                title={"دانلود pdf"}
                onClick={handleDownload}
                // className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                className={'p-3 ltr w-full '}
            >
                <div className={'text-red-700'}>
                    <FaFilePdf />
                </div>
            </button>
            <div ref={componentRef} style={{ width: '100%', height: '100%' , minHeight:'98vh' }}>
                {children}
            </div>
        </div>
    );
};

export default DownloadPDF;
