import React from 'react';

const SendSMSAfterVerifyBill = ({setAdminSettingData, adminSettingData, departmentList}) => {
    return (
        <div className='div__group__input_select border__gray gap-4 flex flex-col px-2 py-3'>
            <div>
                پیامک تایید فاکتور به مشتری
            </div>
            <div>
                <label htmlFor='activeSendSMS'>فعال</label>
                <input
                    id='activeSendSMS'
                    type="radio"
                    checked={adminSettingData.sendSMSAfterVerifyBill === true}
                    onChange={() => setAdminSettingData({sendSMSAfterVerifyBill: true})}
                    name='sendSMSStatusAfterVerifyBill'
                />
            </div>
            <div>
                <label htmlFor='notActiveSendSMS'>غیرفعال </label>
                <input
                    id='notActiveSendSMS'
                    type="radio"
                    checked={adminSettingData.sendSMSAfterVerifyBill === false}
                    onChange={() => setAdminSettingData({sendSMSAfterVerifyBill: false})}
                    name='sendSMSStatusAfterVerifyBill'
                />
            </div>
        </div>
    );
};

export default SendSMSAfterVerifyBill;
