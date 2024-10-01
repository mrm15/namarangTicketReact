import React, {useEffect, useMemo} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {ScreenshotProvider, useScreenshotContext} from "./ScreenShotContext.tsx";
import PictureSection from "./PictureSection.tsx";
import ScreenShotButton from "./ScreenShotButton.tsx";
import ScreenShotTable from "./ScreenShotTable.tsx";
import {findNewItemArray} from "./function.tsx";
import CalculateData from "./CalculateData.tsx";
import {PAGES} from "../../Pages/Route-string.tsx";

const ScreenShotBill = () => {

    const initialData = {
        billData: "",
        dateOnScreenShot: "",
        description: "",
        fileNumber: "",
        fileName: "",
        fileNumberText: "",
        fileNameUnique: "",
        tableColumnArray: [],

    }

    const myLocation = useLocation();
    const navigateTo = useNavigate()
    if (!myLocation.state.data) {
        navigateTo(PAGES.DASHBOARD)
    }


    return (
        <ScreenshotProvider initialData={initialData}>
            <CalculateData/>
            <div id={'i_want_to_take_screenshot_here'}
                 className={"shot__font"}
                 style={{
                     background: "white",
                     border: ` 5px solid rgba(255, 0, 0, 0.13)`,
                     width: "100%",
                 }}
            >
                <PictureSection/>
                <ScreenShotTable/>
            </div>
            <ScreenShotButton/>
        </ScreenshotProvider>
    );
};

export default ScreenShotBill;
