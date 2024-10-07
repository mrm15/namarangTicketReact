import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {formikFormAddDepartment, validationSchemaAddUser} from "./addDepartmentFormikForm.ts";
import Loader from "../Loader";
import MyFormik from "../MyFormik";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.tsx";

const AddRole = props => {
    const [isLoading, setIsLoading] = useState(true)

    const myLocation = useLocation()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const editMode = !!myLocation?.state?.data;
    const formUniqId = myLocation?.state?.data?._id

    const text = {
        title: editMode ? 'ویرایش دپارتمان  ' : 'افزودن دپارتمان جدید',
        subTitle: editMode ? `ویرایش دپارتمان با شناسه ${formUniqId}_ ${myLocation.state.data?.name}` : `افزودن دپارتمان جدید به سایت`
    }

    const requestUrl = editMode ? `department/update` : 'department/create'

    const [myFormikFormAddUser, setMyFormikFormAddUser] = useState([])
    const [myInitialValuesAddUser, setMyInitialValuesAddUser] = useState({})
    // ///////////////////////////////////////////

    //////////////////////////////


    // @ts-ignore
    const {auth} = useAuth();

    const myPrivateAxios = useAxiosPrivate()
    const getArrayList = async (url) => {
        const res = await myPrivateAxios.get(url);
        return res.data.list || []
    }


    useEffect(() => {
        const initializeForm = async () => {
            let updatedFormConfig = [...formikFormAddDepartment];

            // Disable 'name' field in edit mode
            if (editMode) {
                updatedFormConfig = updatedFormConfig.map(v => {
                    if (v.name === 'name') {
                        return { ...v, disabled: true };
                    }
                    return v;
                });
            }

            const temp: any = {};
            if (editMode) {
                temp.id = formUniqId;
            }

            // Populate form initial values based on edit mode
            for (const row of updatedFormConfig) {
                temp[row.name] = editMode ? myLocation?.state?.data[row.name] : '';
            }

            try {
                const userList = await getArrayList('/user/userList');
                const departmentList = await getArrayList('/department/departmentList');

                updatedFormConfig = updatedFormConfig.map(r => {
                    if (r.name === 'managerUserId') {
                        r.options = userList.map(user => ({
                            ...user,
                            key: `${user.key} ${user.phoneNumber}`
                        }));
                    }
                    if (r.name === 'parentDepartmentId') {
                        r.options = departmentList;
                    }
                    return r;
                });

                setMyInitialValuesAddUser(temp);
                setMyFormikFormAddUser(updatedFormConfig);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        void initializeForm();
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
