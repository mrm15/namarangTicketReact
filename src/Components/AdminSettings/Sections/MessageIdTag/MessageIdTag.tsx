import React from 'react';
import useList from "../../../../hooks/useList";

const MessageIdTag = ({adminSettingData, setAdminSettingData, title,stateKey}) => {
    const list = useList("messageTag/tagsList")
    try {
        return (
            <div>
                <div className='div__group__input_select'>
                    <label htmlFor={'firstDestinationOfTickets'}>{title}</label>
                    <select
                        value={adminSettingData[stateKey]}
                        onChange={event => setAdminSettingData({[stateKey]: event.target.value})}
                        name="firstDestinationOfTickets" id="firstDestinationOfTickets">
                        <option value={""}>هیچ کدام</option>
                        {list.map((row: any, index: React.Key) => <option key={index}
                                                                          value={row.value}>{row?.key}</option>)}
                    </select>
                </div>
            </div>
        );
    } catch (error: any) {
        return <>{error.toString()}</>
    }
};

export default MessageIdTag;