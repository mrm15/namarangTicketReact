import React from 'react';
import axios from "../../../api/axios.tsx";
import {useQuery} from "@tanstack/react-query";
import ShowMenuAndSubMenus from "./ShowMenuAndSubMenus.tsx";

const PublicPriceList = () => {
    const queryFnProductList = async () => {
        const result = await axios.get("/public/productList")
        return result.data;
    }
    const {refetch, data, isError, isFetching, isLoading} = useQuery({
        queryKey: ["billDetailsData"],
        queryFn: queryFnProductList,
        staleTime: 100000,  // === 60*60*24*1000
        refetchOnMount:false,
    });
    return (
        <div>
            <h2></h2>
            <div><ShowMenuAndSubMenus data={data} /> </div>
        </div>
    );
};

export default PublicPriceList;
