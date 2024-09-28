import {useNavigate} from "react-router-dom";
import {PAGES} from "../Pages/Route-string";
import React from "react";

const ForwardOnClick = ({value, NewPage, options , buttonCaption="ویرایش"}) => {

    const navigateTo = useNavigate();
    try {
        return <button
            onClick={() => navigateTo(NewPage, options)}>
            {/*{value}*/}
            {buttonCaption}
        </button>
    } catch (error) {
        return <>{error.toString()}</>
    }
}
export default ForwardOnClick