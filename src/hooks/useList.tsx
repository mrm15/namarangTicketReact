import React, {useEffect, useState} from 'react';
import useAxiosPrivate from './useAxiosPrivate';
import {useQuery} from "@tanstack/react-query";

const useList = (requestUrl: string) => {
    // const [list, setList] = useState<any[]>([]); // Change the type to any[] temporarily
    // const myPrivateAxios = useAxiosPrivate(0);
    //
    // useEffect(() => {
    //     // @ts-ignore
    //     myPrivateAxios(requestUrl)
    //         .then((res: { data: { list: any[] }; }) => { // Change the type to any[] temporarily
    //             setList(res.data.list);
    //         })
    //         .catch((_: any) => {
    //             setList([]);
    //         });
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [requestUrl]); // Ignore the warning about missing dependencies
    //
    // return list;
    const myPrivateAxios = useAxiosPrivate(0);
    const {data, error, isLoading} = useQuery({
        queryKey: [requestUrl], // Cache key based on URL
        queryFn: async () => {
            const res = await myPrivateAxios.get(requestUrl);
            return res.data.list; // Directly returning list
        },
        staleTime: 86400000, // Cache for 24 hours
        enabled: !!requestUrl, // Only fetch if requestUrl exists
    });
    // return {list: data ?? [], error, isLoading};
    return data;

};

export default useList;
