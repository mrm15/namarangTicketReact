import MyFormik from "../MyFormik";
import Loader from "../Loader";
import {useEffect, useState} from "react";
import {formikFormAddUser, initialValuesAddUser, validationSchemaAddUser} from "./addUserFormikForm.tsx";
import useAuth from "../../hooks/useAuth.tsx";
import {useLocation} from "react-router-dom";


const AddUser = () => {

    const [isLoading, setIsLoading] = useState(true)

    const myLocation = useLocation()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const editMode = !!myLocation?.state?.phoneNumber
    const requestUrl = editMode ? 'users/edit' : 'users/add'

    const [myFormikFormAddUser, setMyFormikFormAddUser] = useState([])
    // ///////////////////////////////////////////

    //////////////////////////////


    // @ts-ignore
    const {auth} = useAuth();

    useEffect(() => {
        const updatedFormConfig = formikFormAddUser.map(field => {
            // Initially set visibility to true for all fields
            let isShow = true;

            // Conditionally toggle visibility based on field name and user's role
            if (field.name === 'isActive' && !auth.userInfo.roleAccessList.includes('activeAndDeActiveUsers')) {
                isShow = false; // Hide if user lacks 'activeAndDeActiveUsers' role
            }

            if (field.name === 'role' && !auth.userInfo.roleAccessList.includes('editUsersRole')) {
                isShow = false; // Hide if user lacks 'editUsersRole' role
            }

            // Return a new field object with updated visibility
            return {...field, isShow};
        });

        // Simulate async operation, e.g., fetching form config
        setTimeout(() => {
            setMyFormikFormAddUser(updatedFormConfig);
            setIsLoading(false);
        }, 1000);
    }, [auth?.userInfo?.roleAccessList]); // Depend on user's role list to re-evaluate form config on change


    try {
        return (<div className={'flex flex-wrap'}>
            <div className="w-full text-center bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3"
                 role="alert">
                <p className="font-bold"> افزودن کاربر جدید</p>
                <p className="text-sm">افزودن کاربر جدید به سایت</p>
            </div>

            {isLoading ? <Loader type={1}/> :
                <MyFormik
                    formikForm={myFormikFormAddUser}
                    initialValues={initialValuesAddUser}
                    validationSchema={validationSchemaAddUser}
                    afterSubmit={undefined}
                    requestUrl={requestUrl}
                />
            }
        </div>);
    } catch (error) {
        return <>{error?.toString()}</>
    }
};

export default AddUser;
