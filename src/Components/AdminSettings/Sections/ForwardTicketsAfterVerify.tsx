import React from 'react';

const ForwardTicketsAfterVerify = ({setAdminSettingData, adminSettingData, departmentList}) => {
    return (
        <div>
            <div className='div__group__input_select'>
                <label htmlFor={'firstDestinationOfTickets'}>{'فورارد بعد از تایید فاکتور به دپارتمان؟'}</label>
                <select
                    value={adminSettingData.forwardTicketsAfterVerify}
                    onChange={event => setAdminSettingData({forwardTicketsAfterVerify: event.target.value})}
                    name="firstDestinationOfTickets" id="firstDestinationOfTickets">
                    <option value="">فوروارد نشود.</option>
                    {departmentList.map((row: {
                        value: string | number | readonly string[];
                        key: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal;
                    }, index: React.Key) => <option key={index} value={row.value}>{row?.key}</option>)}
                </select>
            </div>
        </div>
    );
};

export default ForwardTicketsAfterVerify;
