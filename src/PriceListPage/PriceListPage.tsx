import React, {useEffect, useState} from 'react';
import axios from "../api/axios.tsx";
import useAxiosPrivate from "../hooks/useAxiosPrivate.tsx";
import {useQuery} from "@tanstack/react-query";
import {getBillData} from "../config/api.tsx";

const PriceListPage = () => {
    const [productList, setProductList] = useState([])
    useEffect(() => {
        const getPublicProducts = async () => {
            const result = await axios.get("/public/productList")
            console.log(result)
            setProductList(result.data)
        }
        void getPublicProducts()
    }, []);

    const queryFnProductList = async () => {
        const result = await axios.get("/public/productList")
        return result.data;
    }
    const {refetch,data,isError,isFetching,isLoading} = useQuery({
        queryKey: ["billDetailsData"],
        queryFn: queryFnProductList,
        staleTime: 100000,  // === 60*60*24*1000
    })



    return (
        <div>
            123
            <pre>
                {JSON.stringify(productList)}
            </pre>
        </div>
    );
};

export default PriceListPage;