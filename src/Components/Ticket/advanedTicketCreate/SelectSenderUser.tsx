import React, {useEffect, useState} from 'react';
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.tsx";
import {useQuery} from "@tanstack/react-query";

const SelectSenderUser = () => {

    const url = "user/userList"

    const [userListHolder, setUserListHolder] = useState()
    const myAxiosPrivate = useAxiosPrivate()
    const queryFn =async ()=>{
        return myAxiosPrivate.get(url)
    }


    // اینو اینجا میگیرم و توی حافظه میمونه تا بعدا موقع باز کردن فروارد مودال استفاده میشه
    const query = useQuery({
        queryKey: ['user/userList'],
        queryFn,
        staleTime: 86400000,  // === 60*60*24*1000
        enabled: true,
    })

    useEffect(() => {


        console.log(query?.data?.data?.list)
        debugger

    }, [query.data])




    return (
        <div>

        </div>
    );
};

export default SelectSenderUser;