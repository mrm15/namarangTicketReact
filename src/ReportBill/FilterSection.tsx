import React, {useContext} from 'react';
import {ReportBillContext} from "./ReportBillContext.tsx";

const FilterSection = () => {
    const t = useContext(ReportBillContext);
    const {awesomeData, setAwesomeData} = t
    return (
        <div>
            FilterSection
        </div>
    );
};

export default FilterSection;
