import React, {useEffect} from 'react';
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.tsx";
import {useQuery} from "@tanstack/react-query";
import {getBillData, getProductList, getProjectList} from "../../../config/api.tsx";

import {useSubmitBillContext} from "./submitBillContext.tsx";

const GetSubmitBillData = () => {


    const {data, setData} = useSubmitBillContext();



    const myAxiosGetCurrentBillData = useAxiosPrivate();
    const myAxiosGetProject = useAxiosPrivate();

    const queryFnGetProject = async (url) => {
        const temp = await myAxiosGetProject.get(url)
        return temp.data;
    }

    const queryFnGetBillData = async (url) => {
        const temp = await myAxiosGetCurrentBillData.get(url)
        return temp.data;
    }

    const projectListUseQuery = useQuery({
        queryKey: ["getProjectList"],
        queryFn: () => queryFnGetProject(getProjectList),
        staleTime: 86400000,  // === 60*60*24*1000
        enabled: true,
    })
    const billDetailsData = useQuery({
        queryKey: ["billDetailsData"],
        queryFn: () => queryFnGetBillData(getBillData + data.billNumber),
        staleTime: 100,  // === 60*60*24*1000
        enabled: Boolean(data.billNumber),
    })

    useEffect(() => {
        setData({projectList: projectListUseQuery?.data?.data})
    }, [projectListUseQuery?.data])



    return (
        <pre className={"whitespace-pre-wrap"}>
            <br/>
            {/*{JSON.stringify(productListUseQuery.data)}*/}
            {/*{JSON.stringify(billDetailsData.data)}*/}
            <br/>
            {/*{JSON.stringify(projectListUseQuery.data)}*/}
            <br/>
        </pre>
    );
};

export default GetSubmitBillData;