import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.tsx";
import {validationSchemaAddUser} from "../addUserFormikForm.tsx";
import MyFormik from "../../MyFormik";
import {formikFormEditProfileInfo} from "./formikFormEditProfileInfo.tsx";
import {useQuery} from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth.tsx";
import Loader3 from "../../Loader/Loader3.tsx";

const EditProfileInfo = () => {

    const myAxios = useAxiosPrivate();
    const [myInitialValuesAddUser, setMyInitialValuesAddUser] = useState({})
    const url = "user/info"
    const sendUrl = "user/update"
    const resultOfUseQuery =
        useQuery({
            queryKey: ["noThing"],
            queryFn: async () => {
                const temp = await myAxios.get(url)
                return temp.data.data
            },
            staleTime: 86400000,  // === 60*60*24*1000
            enabled: true,
        })


    useEffect(() => {
        setMyInitialValuesAddUser(resultOfUseQuery.data)
    }, [resultOfUseQuery.data])

    try {
        return (
            <div>
                <div>
                    <div>
                        ویرایش پروفایل
                    </div>
                    {resultOfUseQuery.isLoading && <Loader3
                        text={"در حال بارگزاری..."}
                    />}
                    {resultOfUseQuery.isError &&
                        <button
                            onClick={() => resultOfUseQuery.refetch()}
                        >
                            خطا در دریافت اطلاعات - تلاش مجدد
                        </button>}

                    <div>
                        {
                            Object.keys(myInitialValuesAddUser).length > 0 &&
                            <MyFormik
                                formikForm={formikFormEditProfileInfo}
                                initialValues={myInitialValuesAddUser}
                                validationSchema={validationSchemaAddUser}
                                afterSubmit={() => {
                                    console.log("that's ok!")
                                }}
                                requestUrl={sendUrl}
                            />
                        }
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        return <div>
            {error.toString()}
        </div>
    }


};

export default EditProfileInfo;