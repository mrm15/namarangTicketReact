import React from 'react';
import DownloadPdfErsal from "./DownloadPdfErsal.tsx";
import DownloadExcelTable from "./DownloadExcelTable.tsx";
import ChangeBillStatusGroup
    from "../../TableG/FullTable/findTableColumns/BasteBandiErsal/ChangeBillStatus/ChangeBillStatusGroup.tsx";

const TopTableComponentOnBillList = () => {
    return (
        <div className={"w-full flex justify-end gap-1 py-1"}>
            <DownloadPdfErsal  />
            <DownloadExcelTable  />
            <ChangeBillStatusGroup  />
        </div>
    );
};

export default TopTableComponentOnBillList;