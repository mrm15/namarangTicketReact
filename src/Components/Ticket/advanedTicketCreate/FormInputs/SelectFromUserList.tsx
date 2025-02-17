import React, {useEffect, useState} from 'react';
import LittleSpinner from "../../../Loader/LittleSpinner";
import Select, {components} from "react-select";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import {useQuery} from "@tanstack/react-query";
import {addRowIdtoTable, formatNumber} from "../../../../utils/utilsFunction.tsx";
import {calculateSumOfEachRow} from "../../../Hesabfa/SubmitBill/functions.tsx";
import useList from "../../../../hooks/useList.tsx";
import NamarangLogoSvg from "../../../../assets/Svg/NamarangLogoSvg.tsx";

const SelectFromUserList = ({
                                ticketData,
                                setTicketData
                            }) => {


    const [myOptions, setMyOptions] = useState([]);
    const userListDetails = useList("user/userListDetails")
    useEffect(() => {
        if (userListDetails?.length > 0) {
            setMyOptions(userListDetails)
        }
        console.log(userListDetails)
        const temp = userListDetails?.map((row: any) => {

            const label = "" + " " + (row?.name ?? "" )+ " _ " + (row?.familyName ?? "" ) + " _ " + row?.phoneNumber + " _ " + row?.country+ " _ " + row?.province+ " _ " + row?.city;
            const value = row._id;
            return {value, label };
        });
        console.log(temp)
        setMyOptions(temp)

    }, [userListDetails])

    const addToState = (row: any) => {

        if (row) {
            setTicketData({senderUserId:row?._id , senderUserData: row.name + " " + row.familyName + " " +  row.phoneNumber +  " " + (row.city ?? " ") + " "
                    + (row?.province ?? " ")+ " " +  (row?.country ?? " ")} )
        }else {
            setTicketData({senderUserId:"" , senderUserData: ""} )
        }
    }

    const CustomOption = (props) => (
        <components.Option {...props}>
            <div className={"flex  gap-2 fontSize10 w-80"}>
                <div className={" rounded border border-gray-400"}><NamarangLogoSvg width={50} height={50}/></div>
                <div className={"flex flex-col justify-around"}>
                    <div>
                        {props?.data?.label?.split("__")[0]}
                    </div>
                    <div className={"fontSize10 text-gray-700"}>
                        {props?.data?.city}

                    </div>
                    <div className={"flex  items-center"}>
                        <div className={"badge-bg-blue-text-white"}>
                            {props?.data?.province}
                        </div>
                        <div className={"badge-bg-green-text-white"}>
                            {(props?.data?.city)}
                        </div>

                    </div>
                </div>
            </div>

        </components.Option>
    );


    return (
        <div>
            {
                (!userListDetails) ?
                    <LittleSpinner/>
                    :
                    <div className="w-full">
                        <Select
                            value={ticketData.senderUserId}
                            onChange={addToState}
                            options={myOptions}
                            placeholder={'انتخاب مشتری'}
                            className="z__index2"
                            isDisabled={false}
                            isLoading={false}
                            isClearable={true}
                            isRtl={true}
                            // styles={customStyles}
                            isSearchable={true}
                            components={{Option: CustomOption}}
                            // filterOption={filterOption}

                        />
                    </div>}
        </div>
    );
};

export default SelectFromUserList;