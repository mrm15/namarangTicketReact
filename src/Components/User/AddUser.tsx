import MyFormik from "../MyFormik";
import Loader from "../Loader";
import {useEffect, useState} from "react";
import {formikFormAddUser, validationSchemaAddUser} from "./addUserFormikForm.tsx";
import useAuth from "../../hooks/useAuth.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.tsx";
import useList from "../../hooks/useList.tsx";


const AddUser = () => {

    const [isLoading, setIsLoading] = useState(true)

    const myLocation = useLocation();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const editMode = !!myLocation?.state?.data;
    const formUniqId = myLocation?.state?.data?._id

    const text = {
        title: editMode ? 'ویرایش کاربر' : 'افزودن کاربر جدید',
        subTitle: editMode ? `ویرایش کاربر   ${myLocation?.state?.data?.phoneNumber}` : `افزودن کاربر جدید به سایت`
    }

    const requestUrl = editMode ? `user/update` : 'user/create'

    const [myFormikFormAddUser, setMyFormikFormAddUser] = useState([])
    const [myInitialValuesAddUser, setMyInitialValuesAddUser] = useState({})
    // ///////////////////////////////////////////

    //////////////////////////////


    // @ts-ignore
    const {auth} = useAuth();
    const myAxiosPrivate = useAxiosPrivate()
    const getRoleList1 = async () => {


        const res = await myAxiosPrivate.get("/role/roleList");
        return res?.data?.roleList || []

    }

    const getDepartmentList = useList("department/departmentList")
    const getRoleList = useList("/role/roleList")

    useEffect(() => {


        let updatedFormConfig = formikFormAddUser.filter(field => {
            // Keep the field if it does not require special permissions,
            // or if the user has the required role for 'isActive' or 'role' fields.
            return !(
                (field.name === 'isActive' && !auth.userInfo.roleAccessList.includes('userActiveAndDeActiveUsers'))
                || (field.name === 'role' && !auth.userInfo.roleAccessList.includes('userEditUsersRole'))
                ||(field.name === 'departmentId' && !auth.userInfo.roleAccessList.includes('userEditUsersDepartment'))
            );
        });

        if (editMode) {


            updatedFormConfig = updatedFormConfig.map(v => {
                const row = {...v}

                if (row.name === 'phoneNumber' || row.name === 'nationalCode') {
                    row['disabled'] = true
                }
                return row

            })

        }


        const temp = {
            id:undefined
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



        // Simulate async operation, e.g., fetching form config
        // getRoleList().then(roleList =>{
            updatedFormConfig = updatedFormConfig.map(r=>{
                const row = {...r}

                if(row.name==='role'){
                    row.options = getRoleList
                }
                if(row.name==='departmentId'){
                    row.options = getDepartmentList
                }
                return row
            })


            setMyInitialValuesAddUser(temp)
            setMyFormikFormAddUser(updatedFormConfig);
            setIsLoading(false);

        // })

        // setMyInitialValuesAddUser(temp)
        // setMyFormikFormAddUser(updatedFormConfig);
        // setIsLoading(false);

    }, [auth?.userInfo?.roleAccessList , getDepartmentList , getRoleList]); // Depend on user's role list to re-evaluate form config on change


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
                <p className="font-bold">{text?.title}</p>
                <p className="text-sm">{text?.subTitle}</p>
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

export default AddUser;
