import React, {useEffect, useState} from 'react';
import useObjectDataHolder from "../../../hooks/UseObjectDataHolder.tsx";
import {useLocation, useParams} from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.tsx";
import {getChatListData} from "./getChatListData.tsx";
import {useChatListContext} from "./ChatListContext.tsx";
import LittleSpinner from "../../Loader/LittleSpinner.tsx";

const GetChatListDataComponent = ({children}) => {
    const RequestUrl = 'ticket/chatList/'

    const {data, setData} = useChatListContext()

    const myAxios = useAxiosPrivate(1)
    //  اینجا  قراره شبیه محیط چت باشه که کاربر میاد پیامشو مینویسه
    // اول درخواست میدم که این تیکت اطلاعاتش بیاد.
    // اطلاعات تیکت به همراه همه ی ریپلای هایی که خورده و وضعیت فعلی تیکت باید بیاد
    // و این صفحه باید از روی آیدی لوکیشن بیاد
    // میخوام یه کاری کنم که اگه کاربری لینک داشت و آدرس رو زده بود هم این چت لیست رو ببینه.


    useEffect(() => {
        const doTask = async () => {
            const result = await getChatListData({RequestUrl, id: data.id, myAxios})
            setData({...result, isLoading: false})
            // دیتا رو بگیریم و نشون بدیم ولی مقدار لودینگ رو باید فالز کنیم
        }
        if (data.id) {
            void doTask()
        }
    }, [data.reload, data.id, myAxios, setData]);

    if (!data.id) {
        return <div>
            مقدار آیدی نامعتبر می باشد لطفا مجددا تیکت را باز کنید
        </div>
    }
    return (
        <div>
            {data.isLoading ?
                <div>
                    <span>Eskeleton <LittleSpinner/></span>
                </div>
                : children
            }
        </div>
    );
};

export default GetChatListDataComponent;