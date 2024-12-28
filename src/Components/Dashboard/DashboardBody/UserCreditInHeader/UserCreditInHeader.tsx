import React, {useEffect, useState} from 'react';
import {formatNumber} from "../../../../utils/utilsFunction";
import {FiChevronsDown, FiChevronsUp} from "react-icons/fi";
import {AiOutlineCheckCircle} from "react-icons/ai";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import {useQuery} from "@tanstack/react-query";
import LittleSpinner from "../../../Loader/LittleSpinner.tsx";
import useAuth from "../../../../hooks/useAuth.tsx";

const UserCreditInHeader = () => {

    const {auth} = useAuth()
    console.log(auth)
   const contactCode = auth?.userInfo?.userData?.contactCode

    const myAxios = useAxiosPrivate()
    const queryFn = async () => {


        if(!contactCode){
            return  undefined
        }
        const myResult = await myAxios.get("/hesabfa/getContactData/"+contactCode)
        return myResult.data?.data
    }

    const resultOfUseQuery =
        useQuery({
            queryKey: [],
            // url: string, myAxios: any, page: number, pageSize: number, filters: any
            queryFn,
            staleTime: 86400000,  // === 60*60*24*1000
            enabled: true,
        })

    const userData = resultOfUseQuery.data ?? undefined
    console.log(userData)
    const userBedOrBesValue = userData?.Credits - userData?.Liability
    const userBedOrBesStatus = userBedOrBesValue > 0 ?
        <div className={"flex"}>
            <span>&nbsp;بستانکار</span>
            <span><FiChevronsUp/></span>
        </div>
        : userBedOrBesValue < 0 ?
            <div className={"flex"}>
                <div>&nbsp;بدهکار</div>
                <div><FiChevronsDown/></div>
            </div> :
            <><AiOutlineCheckCircle/></>
    // const userBedOrBesColor1 = userBedOrBesValue >= 0 ? "blue" : "red"
    const userBedOrBesColor = userBedOrBesValue > 0 ? "blue" : userBedOrBesValue < 0 ? "red" : "green"
    // const Currency = userData?.Currency === "IRT" ? "ريال" : "تومان"
    const Currency =  "تومان"
    return (
        <div>
            {resultOfUseQuery.isLoading && <><LittleSpinner/></>}
            {resultOfUseQuery.isFetched && resultOfUseQuery.data &&
              <span style={{color: userBedOrBesColor, fontWeight: "bold"}}
                    className={"flex bg-gray-300 rounded px-2 py-1 select-none"}
                    title={"وضعیت حساب شما در سیستم"}
              >
                            {/*<div>تراز:</div>*/}
                            <div className={"ltr"}>&nbsp;{formatNumber(userBedOrBesValue)} &nbsp;</div>
                             <div className={"flex"}> <div>{Currency}</div> <div>{userBedOrBesStatus}</div></div>

                        </span>}
            {resultOfUseQuery.isError && <span>___</span>}
        </div>
    );
};

export default UserCreditInHeader;