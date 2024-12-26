import React from 'react';
import DownloadPdfErsal from "./DownloadPdfErsal.tsx";
import DownloadExcelTable from "./DownloadExcelTable.tsx";

const TopTableComponentOnBillList = () => {
    return (
        <div className={"w-full flex justify-end gap-1 "}>
            <DownloadPdfErsal  />
            <DownloadExcelTable  />
        </div>
    );
};

export default TopTableComponentOnBillList;