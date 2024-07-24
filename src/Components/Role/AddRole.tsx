import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {formikFormAddUser, validationSchemaAddUser} from "./addRoleFormikForm.ts";
import Loader from "../Loader";
import MyFormik from "../MyFormik";
import useList from "../../hooks/useList.tsx";

const AddRole = props => {
    const [isLoading, setIsLoading] = useState(true)

    const myLocation = useLocation()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const editMode = !!myLocation?.state?.data;
    const formUniqId = myLocation?.state?.data?.id

    const text = {
        title: editMode ? 'ویرایش نقش فعلی کاربران' : 'افزودن نقش جدید',
        subTitle: editMode ? `ویرایش نقش با شناسه ${formUniqId}_ ${myLocation.state.data?.name}` : `افزودن نقش جدید به سایت`
    }

    const requestUrl = editMode ? `role/update` : 'role/create'

    const [myFormikFormAddUser, setMyFormikFormAddUser] = useState([])
    const [myInitialValuesAddUser, setMyInitialValuesAddUser] = useState({})
    /////////////////////////////////////////////

    //////////////////////////////


    // @ts-ignore
    const {auth} = useAuth();

    useEffect(() => {
        let updatedFormConfig = formikFormAddUser.filter(field => {
            // Keep the field if it does not require special permissions,
            // or if the user has the required role for 'isActive' or 'role' fields.
            return !(
                (field.name === 'isActive' && !auth.userInfo.roleAccessList.includes('activeAndDeActiveUsers')) ||
                (field.name === 'role' && !auth.userInfo.roleAccessList.includes('editUsersRole')) ||
                (field.name === 'departmentId' && !auth.userInfo.roleAccessList.includes('editUsersDepartment'))
            );
        });

        if (editMode) {
            updatedFormConfig = updatedFormConfig.map(v => {
                const row = {...v}

                if (row.name === 'name') {
                    //row['disabled'] = true
                }
                return row

            })

        }


        const temp = {
            id:undefined,
            statusListCreate:[],
        };
        if (editMode) {
            temp.id = formUniqId
        }
        for (const row of updatedFormConfig) {


            if (editMode) {
                temp[row.name] = myLocation.state.data[row.name]
            } else {
                temp[row.name] = ''
            }
        }
        // اینجا چون دسترسی نقش ها توی یک آرایه هست و کلیدش رو میدونیم
        if (editMode) {

            temp.statusListCreate = []
            const myObject = {...myLocation.state.data}
            for (const k in myObject) {
                if (myObject[k] === true) {
                    temp.statusListCreate.push(k)
                }
            }
        }


        // Simulate async operation, e.g., fetching form config
        // setTimeout(() => {
        setMyInitialValuesAddUser(temp)
        setMyFormikFormAddUser(updatedFormConfig);
        setIsLoading(false);
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

AddRole.propTypes = {};

export default AddRole;
