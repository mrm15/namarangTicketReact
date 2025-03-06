import React, {useEffect, useState} from 'react';
import useList from "../../../../hooks/useList.tsx";
import Select, {components} from "react-select";
import NamarangLogoSvg from "../../../../assets/Svg/NamarangLogoSvg.tsx";
import LittleSpinner from "../../../Loader/LittleSpinner.tsx";
import {useAdvancedTicketContext} from "../AdvancedTicketContext.tsx";
import useAuth from "../../../../hooks/useAuth.tsx";

const SelectCustomerSection = () => {


    const {data, setData} = useAdvancedTicketContext()
    const { auth } = useAuth();
    const userData = auth?.userInfo?.userData
    const showedName = (userData?.name ?? " " ) + " " + (userData.familyName?? " ") ;
    const [myOptions, setMyOptions] = useState([]);
    const userListDetails = useList("user/userListDetails")
    useEffect(() => {
        if (userListDetails?.length > 0) {
            setMyOptions(userListDetails)
        }
        console.log(userListDetails)
        const temp = userListDetails?.map((row: any) => {

            const label = "" + " " + (row?.name ?? "") + " _ " + (row?.familyName ?? "") + " _ " + row?.phoneNumber + " _ " + row?.country + " _ " + row?.province + " _ " + row?.city;
            const value = row._id;
            return {value, label};
        });
        console.log(temp)
        setMyOptions(temp)

    }, [userListDetails])

    const addToState = (row: any) => {
        if (row) {
            setData({
                senderUserId: row?.value,
                senderUserData:
                // row.name + " " + row.familyName + " " +  row.phoneNumber +  " " + (row.city ?? " ") + " "
                // + (row?.province ?? " ")+ " " +  (row?.country ?? " ")
                row.label

            })
        } else {
            setData({senderUserId: "", senderUserData: ""})
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


    try {
        return (
            <div>
                {
                    (!userListDetails) ?
                        <LittleSpinner/>
                        :
                        <div className="w-full">
                            <div>
                                <b>
                                    «

                                    {showedName}&nbsp;عزیز
                                    »

                                </b>
                                لطفا یک مشتری انتخاب کنید:

                            </div>
                            <Select
                                value={myOptions?.find(option => option.value === data.senderUserId) || null}
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
    } catch (error) {
        return <>{error?.toString()}</>
    }
};

export default SelectCustomerSection;