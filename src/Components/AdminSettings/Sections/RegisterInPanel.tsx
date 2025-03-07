import React, {useEffect, useState} from 'react';
import useList from "../../../hooks/useList.tsx";

function RegisterInPanel({setAdminSettingData, adminSettingData, departmentList}) {
    const [showDepartmentSection, setShowDepartmentSection] = useState(false);

    const getRoleRequestUrl = "role/roleList";
    const roleList = useList(getRoleRequestUrl) || [];

    useEffect(() => {
        try {
            if (adminSettingData?.registerInPanel === 'active') {
                setShowDepartmentSection(true);
            } else {
                setShowDepartmentSection(false);
                setAdminSettingData({registerDepartment: '', registerRole: ''});
            }
        } catch (error) {
            console.error("Error in useEffect:", error);
        }
    }, [adminSettingData?.registerInPanel]);

    const handleRegisterInPanelChange = (event) => {
        try {
            setAdminSettingData({registerInPanel: event.target.value});
        } catch (error) {
            console.error("Error in handleRegisterInPanelChange:", error);
        }
    };

    const handleRegisterDepartmentChange = (event) => {
        try {
            setAdminSettingData({registerDepartment: event.target.value});
        } catch (error) {
            console.error("Error in handleRegisterDepartmentChange:", error);
        }
    };

    const handleRegisterRoleChange = (event) => {
        try {
            setAdminSettingData({registerRole: event.target.value});
        } catch (error) {
            console.error("Error in handleRegisterRoleChange:", error);
        }
    };

    try {
        return (
            <div>
                <div className='div__group__input_select'>
                    <label htmlFor="firstDestinationOfTickets">{'ثبت نام در سایت'}</label>
                    <select
                        value={adminSettingData?.registerInPanel}
                        onChange={handleRegisterInPanelChange}
                        name="firstDestinationOfTickets"
                        id="firstDestinationOfTickets"
                    >
                        <option value="">انتخاب کنید</option>
                        <option value="active">فعال</option>
                        <option value="notActive">غیر فعال</option>
                    </select>
                </div>
                {showDepartmentSection && (
                    <>
                        <div className='div__group__input_select'>
                            <label htmlFor="firstDestinationOfTickets2">{'دپارتمان ثبت نامی ها'}</label>
                            <select
                                value={adminSettingData?.registerDepartment}
                                onChange={handleRegisterDepartmentChange}
                                name="firstDestinationOfTickets2"
                                id="firstDestinationOfTickets2"
                            >
                                <option value="">انتخاب کنید</option>
                                {departmentList.map((row, index) => (
                                    <option key={index} value={row.value}>
                                        {row.key}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='div__group__input_select'>
                            <label htmlFor="firstDestinationOfTickets3">{'نقش ثبت نامی ها'}</label>
                            <select
                                value={adminSettingData?.registerRole}
                                onChange={handleRegisterRoleChange}
                                name="firstDestinationOfTickets3"
                                id="firstDestinationOfTickets3"
                            >
                                <option value="">انتخاب کنید</option>
                                {roleList?.map((row, index) => (
                                    <option key={index} value={row.value}>
                                        {row.key}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </>
                )}
            </div>
        );
    } catch (error) {
        return <>{error?.toString()}</>
    }
}

export default RegisterInPanel;
