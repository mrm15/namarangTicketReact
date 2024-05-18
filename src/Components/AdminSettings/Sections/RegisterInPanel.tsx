import React, {useEffect, useState} from 'react';

function RegisterInPanel({setAdminSettingData, adminSettingData, departmentList}) {

    const [showDepartmentSection, setShowDepartmentSection] = useState(false)


    useEffect(() => {

        if (adminSettingData.registerInPanel === 'active') {
            setShowDepartmentSection(true)
        } else {
            setShowDepartmentSection(false)
            setAdminSettingData({registerDepartment: ''})
        }
    }, [adminSettingData.registerInPanel]);


    return (
        <div>
            <div className='div__group__input_select'>
                <label htmlFor={'firstDestinationOfTickets'}>{'ثبت نام در سایت'}</label>
                <select
                    value={adminSettingData.registerInPanel}
                    onChange={event => setAdminSettingData({registerInPanel: event.target.value})}
                    name="firstDestinationOfTickets" id="firstDestinationOfTickets">
                    <option value="">انتخاب کنید</option>
                    <option value={"active"}>فعال</option>
                    <option value={"notActive"}>غیر فعال</option>
                </select>
            </div>
            {showDepartmentSection && <>
              <div className='div__group__input_select'>
                <label htmlFor={'firstDestinationOfTickets'}>{'دپارتمان ثبت نامی ها'}</label>
                <select
                  value={adminSettingData.registerDepartment}
                  onChange={event => setAdminSettingData({registerDepartment: event.target.value})}
                  name="firstDestinationOfTickets" id="firstDestinationOfTickets">
                  <option value="">انتخاب کنید</option>
                    {departmentList.map((row, index) => <option key={index} value={row.value}>{row.key}</option>)}
                </select>
              </div>
            </>}
        </div>
    );
}

export default RegisterInPanel;