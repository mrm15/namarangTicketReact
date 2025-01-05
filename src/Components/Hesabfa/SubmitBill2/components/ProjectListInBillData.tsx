import React, {useEffect} from 'react';
import {IProjectList} from "../../SubmitBill/initialData.tsx";
import {useQuery} from "@tanstack/react-query";
import {getProjectList} from "../../../../config/api.tsx";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate.tsx";
import {useSubmitBillContext} from "../submitBillContext.tsx";
import LittleSpinner from "../../../Loader/LittleSpinner.tsx";

const ProjectListInBillData = () => {

    const {data, setData} = useSubmitBillContext()
    const myAxiosGetProject = useAxiosPrivate();
    const queryFnGetProject = async (url) => {
        const temp = await myAxiosGetProject.get(url)
        return temp.data;
    }
    const projectListUseQuery = useQuery({
        queryKey: ["getProjectList"],
        queryFn: () => queryFnGetProject(getProjectList),
        staleTime: 86400000,  // === 60*60*24*1000
        enabled: true,
    })


    const setInvoice = (keyValuePairForInvoice) => {
        setData({invoice: {...data.invoice, ...keyValuePairForInvoice}})
    }

    const handleInputChange = (value: string, myKey: any) => {
        setInvoice({[myKey]: value})
    }

    return (
        <div>
            <div className={'div__group__input_select'}>
                <label htmlFor="">پروژه</label>
                {projectListUseQuery.isLoading ?
                    <div className={"same__input flex"}><div>در حال بارگزاری...</div><LittleSpinner/></div> :
                    <>
                        <select
                            onChange={(e) => handleInputChange(e.target.value, 'Project')}
                            value={data.invoice.Project}
                            name="" id="">
                            <option value={''}>انتخاب کنید</option>
                            {projectListUseQuery?.data?.data.filter((row: IProjectList) => row.Active === true)
                                .map((row: IProjectList, index: React.Key) =>
                                    <option key={index}
                                            value={row.Title}>{row.Title}</option>)}
                        </select>
                    </>}
            </div>
        </div>
    );
};

export default ProjectListInBillData;