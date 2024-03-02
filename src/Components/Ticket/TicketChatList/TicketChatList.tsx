import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import {getChatListData} from "./getChatListData";
import Loader from "../../Loader";
import ChatList from "./ChatList.tsx";

const RequestUrl = 'ticket/chatList/'
const MyComponent = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [chatList, setChatList] = useState([])
    const myLocation = useLocation();
    const myAxios = useAxiosPrivate()
    //  اینجا  قراره شبیه محیط چت باشه که کاربر میاد پیامشو مینویسه
    // اول درخواست میدم که این تیکت اطلاعاتش بیاد.
    // اطلاعات تیکت به همراه همه ی ریپلای هایی که خورده و وضعیت فعلی تیکت باید بیاد
    // و این صفحه باید از روی  آیدی لوکیشن بیاد
    let id :any = undefined

    id = myLocation?.state?.id;
    useEffect(() => {

        const doTask = async () => {
            const result = await getChatListData({RequestUrl, id, myAxios})
            setChatList(result)
            setIsLoading(false)
        }
        if (id)
            void doTask()

    }, []);

    if (!id) {
        return <div className={'m-3 bg-red-300 fontSize22 rounded-t p-16 text-blue-800'}>صفحه مورد نظر یافت نشد مجددا از لیست تیکت ها اقدام به مشاهده این صفحه نمایید</div>
    }


    return (
        <div className={'chat__list'}>
            {isLoading ? <Loader/> : <ChatList chatList={chatList} />}


        </div>
    );
};

export default MyComponent;
