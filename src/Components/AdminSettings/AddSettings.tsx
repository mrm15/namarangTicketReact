import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {formikFormAddDepartment, validationSchemaAddUser} from "./addStatusFormikForm.ts";
import Loader from "../Loader";
import MyFormik from "../MyFormik";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.tsx";

const MyComponent = props => {
    const getAdminSettingsRequest = '/getAdminSettings';
    const submitAdminSettingsRequest = '/submitAdminSettingsRequest';
    const [isLoading, setIsLoading] = useState(true);
    const [adminSettingData,setAdminSettingData] = useState({


    })





    ////////////////////////////////////////////



    useEffect(() => {
        let updatedFormConfig = [...formikFormAddDepartment]
        setIsLoading(false);

    }, []); // Depend on user's role list to re-evaluate form config on change


    try {

        return (<div className={'flex flex-wrap'}>
            <div className="w-full text-center bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3"
                 role="alert">
                <p className="font-bold">{text.title}</p>
                <p className="text-sm">{text.subTitle}</p>
            </div>

            {isLoading ? <Loader type={1}/> :
                <>
                    <MyFormik
                        formikForm={myFormikFormAddUser}
                        initialValues={myInitialValuesAddUser}
                        validationSchema={validationSchemaAddUser}
                        afterSubmit={afterSubmit}
                        requestUrl={requestUrl}
                    />


                </>
            }
        </div>);
    } catch (error) {
        return <>{error?.toString()}</>
    }


};

MyComponent.propTypes = {};

export default MyComponent;
