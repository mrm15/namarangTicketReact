import React, {useEffect} from 'react';
import {useLocation} from "react-router-dom";

const ScreenShotBill = () => {
    const myLocation = useLocation();


    useEffect(() => {
        const singleBill = myLocation?.state?.data?.bill

    }, [myLocation])

    return (
        <div>
            من قراره صفحه ی اسکرین شات باشم
        </div>
    );
};

export default ScreenShotBill;
