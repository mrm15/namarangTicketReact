import React from 'react';

const SendSMSAfterVerifyBill = ({setAdminSettingData, adminSettingData, departmentList}) => {
    return (
        <div>
            <div className='div__group__input_select border__gray gap-4 flex flex-col px-2 py-3'>
                <div>
                    پیامک
                    &nbsp;
                    <span className={'font-bold'}>صدور</span>

                    فاکتور به مشتری
                </div>
                <div>
                    <label htmlFor='activeSendSMS0'>فعال</label>
                    <input
                        id='activeSendSMS0'
                        type="radio"
                        checked={adminSettingData.sendSMSAfterSubmitBill === true}
                        onChange={() => setAdminSettingData({sendSMSAfterSubmitBill: true})}
                        name='sendSMSAfterSubmitBill'
                    />
                </div>
                <div>
                    <label htmlFor='notActiveSendSMS00'>غیرفعال </label>
                    <input
                        id='notActiveSendSMS00'
                        type="radio"
                        checked={adminSettingData.sendSMSAfterSubmitBill === false}
                        onChange={() => setAdminSettingData({sendSMSAfterSubmitBill: false})}
                        name='sendSMSAfterSubmitBill'
                    />
                </div>
            </div>
            <div className='div__group__input_select border__gray gap-4 flex flex-col px-2 py-3'>
                <div>
                    پیامک
                    &nbsp;
                    <span className={'font-bold'} >تایید</span>
                    فاکتور به مشتری
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
        </div>
    );
};

export default SendSMSAfterVerifyBill;
