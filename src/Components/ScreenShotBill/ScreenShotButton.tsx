import React, {useContext} from 'react';
import domtoimage from 'dom-to-image';
import {saveAs} from 'file-saver';
import {useScreenshotContext} from "./ScreenShotContext";
import {useNavigate} from "react-router-dom";


const ScreenshotButton = () => {
    const {data: fullData} = useScreenshotContext();
    const navigateTo = useNavigate()

    const handleScreenshot = () => {
        const element = document.getElementById('i_want_to_take_screenshot_here'); // Replace 'i_want_to_take_screenshot_here' with the ID of the element you want to capture

        // Use dom-to-image to capture the screenshot
        domtoimage.toBlob(element).then(blob => {

            const fileName = fullData?.fileNumberText ? fullData?.fileNumberText + "_"+ (fullData?.orderNumber ?? "") + `.jpg` : 'codePlease.jpg';
            // Use FileSaver.js to save the blob as a file
            saveAs(blob, fileName);

            try {
                document.getElementById('picture_section_Div_contentEditable').innerHTML = '';
                navigateTo(-1)
            } catch (error) {
                console.log(error);
            }
        }).catch(error => {
            console.error('Error capturing screenshot:', error);
        });
    };


    return (<div className={"text-center mt-2"}>
        <button
            className={'bg-amber-500 hover:bg-amber-700 text-white py-2 px-4 rounded '}
            onClick={handleScreenshot}
        >
            اسکرین شات جهت برش
        </button>
    </div>);
};

export default ScreenshotButton;


