import React from 'react';
import {useAdvancedTicketContext} from "../AdvancedTicketContext.tsx";

const InputTextFill = ({myKey, placeholder = "" , title}) => {

    const {data, setData} = useAdvancedTicketContext()


    return (
        <div>
            <div className="div__group__input_select w-full mt-8">
                <label htmlFor={myKey}>{title}</label>
                <input
                    name={myKey}
                    onChange={e => setData({[myKey]: e.target.value})}
                    value={data[myKey]}
                    type="text"
                    id={myKey}
                    className="w-100 rounded border-2"
                    placeholder={placeholder}/>
            </div>
        </div>
    );
};

export default InputTextFill;