import React from 'react';
import useList from "../../../hooks/useList.tsx";

const CustomersRole = ({
                           adminSettingData,
                           setAdminSettingData,
                           departmentList,
                       }) => {

    const getRoleRequestUrl = "role/roleList";
    const roleList = useList(getRoleRequestUrl) || [];

    return (
        <div>
            <div className='div__group__input_select'>
                <label htmlFor={'customerRole'}>{'نقش مشتریان وقتی سازمانی ها از توی سایت کاربر جدید ثبت نام میکنند.'}</label>
                <select
                    value={adminSettingData?.customerRole}
                    onChange={event => setAdminSettingData({customerRole: event.target.value})}
                    name="customerRole" id="customerRole">
                    <option value="">انتخاب کنید</option>
                    {roleList.map((row: any, index: React.Key) => <option key={index}
                                                                                value={row.value}>{row.key}</option>)}
                </select>
            </div>
        </div>
    );
};

export default CustomersRole;