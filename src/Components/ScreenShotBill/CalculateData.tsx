import React, {useEffect} from 'react';
import {useLocation} from "react-router-dom";
import {useScreenshotContext} from "./ScreenShotContext";
import {findNewItemArray, getTomorrowDate} from "./function";
import MyDatePicker from "../MyDatePicker";

const CalculateData = () => {
    const myLocation = useLocation();
    const {setData, data} = useScreenshotContext()


    useEffect(() => {
        const myDateOnScreenShot = localStorage.getItem("dateOnScreenShot")

        if (!myDateOnScreenShot) {
            localStorage.setItem("dateOnScreenShot", getTomorrowDate())
        }
        const billObject = myLocation?.state?.data?.bill
        data.billData = billObject
        data.tableColumnArray = findNewItemArray(billObject)
        data.fileName = billObject.ContactTitle;
        data.dateOnScreenShot = myDateOnScreenShot

        setData(data)
    }, [myLocation])

    const handleChangeDate = (dateOnScreenShot: any) => {
        localStorage.setItem("dateOnScreenShot", dateOnScreenShot)
        setData({dateOnScreenShot})
    }
    return <>

        <div className={'div__group__input_select'}>
            <label htmlFor={''}>شماره فایل</label>
            <input type="number"
                   value={data.fileNumberText}
                   onChange={e => setData({fileNumberText: e.target.value})}
            />
        </div>
        <div className={'div__group__input_select'}>
            <MyDatePicker
                value={data.dateOnScreenShot}
                onChange={handleChangeDate}
            />
        </div>
    </>;
}

export default CalculateData;
