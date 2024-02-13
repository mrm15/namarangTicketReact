import React, {useEffect, useState} from 'react';
import useAxiosPrivate from "./useAxiosPrivate";

const useList = (requestUrl) => {

    const [list, setList] = useState([])
    const myPrivateAxios = useAxiosPrivate()
    useEffect(() => {
        myPrivateAxios(requestUrl).then((res: { data: { list: React.SetStateAction<{}>; }; }) => {
            setList(res.data.list)
        }).catch((_: any) => {
            setList([])
        })
    }, [requestUrl]);

    return list
};

export default useList;
