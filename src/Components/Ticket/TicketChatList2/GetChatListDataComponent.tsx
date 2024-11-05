import React, {useEffect} from 'react';
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.tsx";
import {getChatListData} from "./getChatListData.tsx";
import {useChatListContext} from "./ChatListContext.tsx";
import LittleSpinner from "../../Loader/LittleSpinner.tsx";

const GetChatListDataComponent = ({children}) => {
    const RequestUrl = 'ticket/chatList/';
    const myAxios = useAxiosPrivate(1);

    // Destructure context values for clarity
    const {data, setData} = useChatListContext();
    const {id, isLoading, reload} = data;

    useEffect(() => {
        const fetchChatData = async () => {
            try {
                const result = await getChatListData({RequestUrl, id, myAxios});

                setData({...result.chatList, isLoading: false});
            } catch (error) {
                console.error("Failed to fetch chat data:", error);
                setData(prev => ({...prev, isLoading: false}));
            }
        };

        if (id) {
            void fetchChatData();
        }
    }, [id, reload, myAxios, setData]);

    if (!id) {
        return <div>مقدار آیدی نامعتبر می باشد لطفا مجددا تیکت را باز کنید</div>;
    }

    return (
        <>
            {isLoading ? (
                <div>
                    <span>Loading... <LittleSpinner/></span>
                </div>
            ) : (
                children
            )}
        </>
    );
};

export default GetChatListDataComponent;
