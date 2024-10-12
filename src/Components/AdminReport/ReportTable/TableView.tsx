import React, {Fragment} from 'react';
import {formatNumber} from "../../../utils/utilsFunction.tsx";

const TableView = ({data}) => {


    const SingleTableView = ({tableArray}) => {

        return <div className={"ul_li_table"}>
            {tableArray?.map(row =>
                <ul
                style={{
                    backgroundColor:row.bgColor,
                    color:row.textColor,
                }}
                >
                    <li>{row?.title}</li>
                    <li>{row?.value}</li>
                </ul>
            )}
        </div>
    }

    try {
        return (
            <div className={""}>
                {data.map((singletableArray, index) => <SingleTableView key={index} tableArray={singletableArray}/>)}
            </div>
        );
    } catch (error) {
        return <>{error.toString()}</>
    }
};

export default TableView;
