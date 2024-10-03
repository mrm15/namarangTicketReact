import React, {useState} from 'react';
import {v4 as uuidV4} from 'uuid';
import InnerDropDown from "./InnerDropDown.tsx";

const DropDown = ({data}) => {

    try {
        return (
            <div className={"select-none"}>
                {data.map((item, index) => <InnerDropDown item={item} />)}
            </div>
        );
    } catch (error) {
        return <>{error.toString()}</>
    }
}

export default DropDown;

