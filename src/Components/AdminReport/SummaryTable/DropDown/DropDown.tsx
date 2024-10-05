import React, {Fragment, useState} from 'react';
import {v4 as uuidV4} from 'uuid';
import InnerDropDown from "./InnerDropDown.tsx";

const DropDown = ({data}) => {

    console.log(data)
    try {
        return (
            <div
                // className={"select-none "}
                className={"select-none transition-all duration-1000 "}


            >
                {data.map((item, index) => <Fragment key={index}>
                    <InnerDropDown  item={item} />
                </Fragment>)}
            </div>
        );
    } catch (error) {
        return <>{error.toString()}</>
    }
}

export default DropDown;

