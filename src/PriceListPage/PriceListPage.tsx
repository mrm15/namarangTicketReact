import React, {useEffect, useState} from 'react';
import axios from "../api/axios.tsx";
import {useQuery} from "@tanstack/react-query";
import ProductListTable from "./ProductList.tsx";
import NamarangLogoSvg from "../assets/Svg/NamarangLogoSvg.tsx";
import Loader3 from "../Components/Loader/Loader3.tsx";


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
    const {refetch, data, isError, isFetching, isLoading} = useQuery({
        queryKey: ["billDetailsData"],
        queryFn: queryFnProductList,
        staleTime: 100000,  // === 60*60*24*1000
    })
    return (
        <div>

            <NamarangLogoSvg height={150} width={150}/>

            {isLoading ? <Loader3/> : <ProductListTable products={data?.data?.List}/>}
            {isError && <div
              onClick={() => window.location.reload()}
            > خطایی رخ داد </div>}
        </div>
    );
};

export default PriceListPage;