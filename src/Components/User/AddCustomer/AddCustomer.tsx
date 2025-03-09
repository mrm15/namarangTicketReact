import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import {formikFormAddCustomer, validationSchemaAddCustomer} from "./addCustomerFormikForm.tsx";
import Loader from "../../Loader";
import MyFormik from "../../MyFormik";
import useAuth from "../../../hooks/useAuth.tsx";

const myInitialValues={
    phoneNumber:"",
    nationalCode:"",
    company:"",
    name:"",
    familyName:"",
    mobile:"",
    accountNumber:"",
    description:"",
    address:"",
    country:"",
    province:"",
    city:"",
    postalCode:"",
}
const AddCustomer = () => {

    const [isLoading, setIsLoading] = useState(true)

    const myLocation = useLocation();
    const editMode = !!myLocation?.state?.data;


    const text = {
        title: "افزودن مشتری جدید",
        subTitle: "افزودن مشتری جدید به سایت"
    }

    const requestUrl = 'user/createFullUser'

    ///////////////////////////////////////////

    useEffect(() => {


        // let updatedFormConfig = formikFormAddCustomer.filter(field => {
        //     // Keep the field if it does not require special permissions,
        //     // or if the user has the required role for 'isActive' or 'role' fields.
        //     return !(
        //         (field.name === 'isActive' && !auth.userInfo.roleAccessList.includes('userActiveAndDeActiveUsers'))
        //         || (field.name === 'role' && !auth.userInfo.roleAccessList.includes('userEditUsersRole'))
        //         ||(field.name === 'departmentId' && !auth.userInfo.roleAccessList.includes('userEditUsersDepartment'))
        //     );
        // });
        //
        // if (editMode) {
        //
        //
        //     updatedFormConfig = updatedFormConfig.map(v => {
        //         const row = {...v}
        //
        //         if (row.name === 'phoneNumber' || row.name === 'nationalCode') {
        //             row['disabled'] = true
        //         }
        //         return row
        //
        //     })
        //
        // }
        //
        //
        // const temp = {
        //     id:undefined
        // };
        // if (editMode) {
        //     temp.id = formUniqId
        // }
        // for (const row of updatedFormConfig) {
        //
        //     if (editMode) {
        //         temp[row.name] = myLocation.state.data[row.name]
        //     } else {
        //         temp[row.name] = ''
        //     }
        // }
        //
        //
        //
        // // Simulate async operation, e.g., fetching form config
        // // getRoleList().then(roleList =>{
        //     updatedFormConfig = updatedFormConfig.map(r=>{
        //         const row = {...r}
        //
        //         if(row.name==='role'){
        //             row.options = getRoleList
        //         }
        //         if(row.name==='departmentId'){
        //             row.options = getDepartmentList
        //         }
        //         return row
        //     })


        // setMyInitialValuesAddUser(temp)
        setTimeout(() => {
            setIsLoading(false);

        }, 1000)

        // })

        // setMyInitialValuesAddUser(temp)
        // setMyFormikFormAddUser(updatedFormConfig);
        // setIsLoading(false);

    }, []); // Depend on user's role list to re-evaluate form config on change


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
                        formikForm={formikFormAddCustomer}
                        initialValues={myInitialValues}
                        validationSchema={validationSchemaAddCustomer}
                        afterSubmit={() => {
                            console.log("123")
                        }}
                        requestUrl={requestUrl}
                    />


                </>
            }
        </div>);
    } catch (error) {
        return <>{error?.toString()}</>
    }
};

export default AddCustomer;
