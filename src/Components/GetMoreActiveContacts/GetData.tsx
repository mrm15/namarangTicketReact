import React, {useEffect} from 'react';
import {useMoreActiveContactsContext} from "./Index.tsx";
import {toast} from "react-toastify";
import {getBillList} from "../../config/api.tsx";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.tsx";
import makeNewObjectBasedOnOrders from "./makeNewObjectBasedOnOrders.tsx";

const GetData = () => {

    const {data, setData} = useMoreActiveContactsContext()
    const myAxios = useAxiosPrivate()
    useEffect(() => {

        const sendRequest = async () => {
            const queryInfo = {
                SortBy: 'Date',
                SortDesc: true,
                Take: 2000,
                Skip: 0,
                filters: [
                    {
                        property: "Status",
                        Operator: '=',
                        Value: "1"
                    },
                ]
            }


            const data = {queryInfo}
            const resultOfGetFactorList = await myAxios.post(getBillList, data)
            return resultOfGetFactorList.data.data.List
        };

        sendRequest().then(dataArray => {
            const mostUserData = makeNewObjectBasedOnOrders(dataArray)
            setData({mostUserData})
        }).catch(error => {
            console.log(error)
        })
    }, []);


    return (
        <div className={"ltr"}>
        </div>
    );
};

export default GetData;