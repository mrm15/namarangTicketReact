import React from 'react';
import {IProjectList} from "../../SubmitBill/initialData.tsx";

const ProjectListInBillData = () => {
    return (
        <div>
            لیست پروژه ها رو اینجا میگیرم

            {/*<div className={'div__group__input_select'}>*/}
            {/*    <label htmlFor="">پروژه</label>*/}
            {/*    <select*/}
            {/*        onChange={(e) => handleInputChange(e.target.value, 'Project')}*/}
            {/*        value={invoice.Project}*/}
            {/*        name="" id="">*/}
            {/*        <option value={''}>انتخاب کنید</option>*/}
            {/*        {initialBillData.projectList.filter((row: IProjectList) => row.Active === true)*/}
            {/*            .map((row: IProjectList, index: React.Key) =>*/}
            {/*                <option key={index}*/}
            {/*                        value={row.Title}>{row.Title}</option>)}*/}
            {/*    </select>*/}
            {/*</div>*/}

        </div>
    );
};

export default ProjectListInBillData;