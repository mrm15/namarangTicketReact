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
        refetchOnMount: false,
    });

    const newData: any[] = [];
    data?.data?.List?.forEach((row, index) => {
        // Push the original row
        newData.push(row);
        // Insert a title object every 16 rows
        if ((index + 1) % 16 === 0) {
            newData.push({
                type: "title",
                title: "متن نمونه برای عنوان",
            });
        }
    });

    return (
        <div className={"p-2"}>
            <div
                style={{
                    height: '10vh',
                    textAlign: "justify",
                }}
            >
                همکار گرامی سیستم فروش حروف همکاری ما به این صورت می باشد که قیمت متریال را با اجرت های ساخت و برش و حتی
                چسب و ... بصورت جز به جز برای شما محاسبه میکنیم تا براحتی بتوانید مقایسه ای کامل داشته باشید از ساخت
                توسط خودتان یا برون سپاری به مجموعه ی نمارنگ. مدعی هستیم بالاترین خدمات را در کمترین زمان با بهترین قیمت
                تقدیم شما همکاران عزیز میکنیم.

            </div>
            <div><ShowMenuAndSubMenus data={newData}/></div>
        </div>
    );
};

export default PublicPriceList;
