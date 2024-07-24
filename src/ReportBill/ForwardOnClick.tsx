import {useNavigate} from "react-router-dom";
import {PAGES} from "../Pages/Route-string";
import React from "react";

const ForwardOnClick = ({value, NewPage, options}) => {

    const navigateTo = useNavigate();
    try {
        return <div
            className={"text-blue-600 cursor-pointer"}
            onClick={() => navigateTo(NewPage, options)}>
            {value}
        </div>
    } catch (error) {
        return <>{error.toString()}</>
    }
}
export default ForwardOnClick