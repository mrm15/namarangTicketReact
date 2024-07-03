import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {formikFormAddDepartment, validationSchemaAddUser} from "./addStatusFormikForm.ts";
import Loader from "../Loader";
import MyFormik from "../MyFormik";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.tsx";

const AddStatus = props => {
    const [isLoading, setIsLoading] = useState(true)

    const myLocation = useLocation()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const editMode = !!myLocation?.state?.data;
    const formUniqId = myLocation?.state?.data?.id

    const text = {
        title: editMode ? 'ویرایش وضعیت تیکت  ' : 'افزودن وضعیت تیکت جدید',
        subTitle: editMode ? `ویرایش وضعیت تیکت با شناسه ${formUniqId}_ ${myLocation.state.data?.name}` : `افزودن وضعیت تیکت جدید به سایت`
    }

    const requestUrl = editMode ? `status/update` : 'status/create'

    const [myFormikFormAddUser, setMyFormikFormAddUser] = useState([])
    const [myInitialValuesAddUser, setMyInitialValuesAddUser] = useState({})
    // ///////////////////////////////////////////

    //////////////////////////////


    // @ts-ignore
    const {auth} = useAuth();




    useEffect(() => {
        let updatedFormConfig = [...formikFormAddDepartment]


        if (editMode) {
            updatedFormConfig = updatedFormConfig.map(v => {
                const row = {...v}
                if (row.name === 'name') {
                    row['disabled'] = true
                }
                return row
            })
        }


        const temp: any = {};
        if (editMode) {
            temp.id = formUniqId
        }

        for (const row of updatedFormConfig) {


            if (editMode) {
                temp[row.name] = myLocation?.state?.data[row.name]
            } else {
                temp[row.name] = ''
            }
        }

        // void getArrayList('/user/userList').then(userList => {
        //     void getArrayList('/department/departmentList').then(departmentList => {
        //         updatedFormConfig = updatedFormConfig.map(r => {
        //             const row = {...r}
        //             if (row.name === 'managerUserId') {
        //                 row.options = userList
        //             }
        //
        //             if (row.name === 'parentDepartmentId') {
        //                 row.options = departmentList
        //             }
        //             return row
        //         })
        setMyInitialValuesAddUser(temp)
        setMyFormikFormAddUser(updatedFormConfig);
        setIsLoading(false);
        //     })
        // })

        // }, 1000);
    }, [auth?.userInfo?.roleAccessList]); // Depend on user's role list to re-evaluate form config on change


    const navigateTo = useNavigate()

    let afterSubmit = undefined

    if (editMode) {
        afterSubmit = () => {
            navigateTo(-1)
        }
    }

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

AddStatus.propTypes = {};

export default AddStatus;
