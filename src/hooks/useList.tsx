import React, { useEffect, useState } from 'react';
import useAxiosPrivate from './useAxiosPrivate';

const useList = (requestUrl: string) => {
    const [list, setList] = useState<any[]>([]); // Change the type to any[] temporarily
    const myPrivateAxios = useAxiosPrivate(0);

    useEffect(() => {
        // @ts-ignore
        myPrivateAxios(requestUrl)
            .then((res: { data: { list: any[] }; }) => { // Change the type to any[] temporarily
                setList(res.data.list);
            })
            .catch((_: any) => {
                setList([]);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [requestUrl]); // Ignore the warning about missing dependencies

    return list;
};

export default useList;
