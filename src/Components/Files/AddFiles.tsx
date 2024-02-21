import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {AddFilesFormikForm, validationSchemaAddUser} from "./AddFilesFormikForm.ts";
import Loader from "../Loader";
import MyFormik from "../MyFormik";
import {BASE_URL} from "../../api/axios.tsx";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.tsx";

const MyComponent = props => {
    let prefixDownloadUrl = BASE_URL
    prefixDownloadUrl = 'http://localhost:3001/download/'

    const [isLoading, setIsLoading] = useState(true)
    const [mySrc, setMySrc] = useState(true)

    const myLocation = useLocation()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const editMode = !!myLocation?.state?.data;
    const formUniqId = myLocation?.state?.data?.id

    const text = {
        title: editMode ? 'ویرایش وضعیت تیکت  ' : 'افزودن وضعیت تیکت جدید',
        subTitle: editMode ? `ویرایش وضعیت تیکت با شناسه ${formUniqId}_ ${myLocation?.state?.data?.name}` : `افزودن وضعیت تیکت جدید به سایت`
    }

    const requestUrl = editMode ? `status/update` : 'status/create'

    const [myFormikFormAddUser, setMyFormikFormAddUser] = useState([])
    const [myInitialValuesAddUser, setMyInitialValuesAddUser] = useState({})
    // ///////////////////////////////////////////

    //////////////////////////////


    // @ts-ignore
    const {auth} = useAuth();

    const myAxios = useAxiosPrivate()
    useEffect(() => {
        let updatedFormConfig = [...AddFilesFormikForm]


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

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access


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
                    {editMode &&
                      <div className={'my-10'}>
                        <a
                          className={'bg-blue-400 p-2 rounded shadow shadow-black'}
                          href={prefixDownloadUrl + myInitialValuesAddUser?.filePath}
                          target={'_blank'}
                        >
                          مشاهده فایل
                        </a>
                      </div>
                    }
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
