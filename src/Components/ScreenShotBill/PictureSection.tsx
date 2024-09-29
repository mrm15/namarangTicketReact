import React, {useRef} from 'react';
import {useScreenshotContext} from "./ScreenShotContext";
import {getCurrentDate} from "../../utils/utilsFunction";

const PictureSection = () => {

    const {setData: setFullData, data: fullData} = useScreenshotContext()

    const inputFileRef = useRef(null);
    const contentRef = useRef(null);

    const makeItEmpty = () => {

        try {
            contentRef.current.innerText = ''
        } catch (error) {
            console.log(error)
        }
    }


    const handleInputChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Here, you can handle the pasted image file
            console.log('Pasted image:', file);
        }
    };

    const handlePaste = (event) => {
        const clipboardItems = event.clipboardData.items;
        for (let i = 0; i < clipboardItems.length; i++) {
            const item = clipboardItems[i];
            if (item.kind === 'file' && item.type.includes('image')) {
                const file = item.getAsFile();
                if (file) {
                    // Here, you can handle the pasted image file
                    console.log('Pasted image:', file);
                }
                break; // Stop after handling the first image file
            }
        }
        const fileNameUnique = getCurrentDate(true) + ""
        setFullData({fileNameUnique})


    };


    return (<div className={"text-center flex justify-center"}>
        <div
            className={'flex flex-row-reverse items-end'}
        >
            <div

                className={'font_size_45 font-bold'}
                style={{
                    fontFamily: 'arial,serif', fontSize: '200px', fontWeight: 'bold',
                    color: '#fe0b0d',
                }}
            >

                {fullData.fileNumberText}

            </div>
            {/* File input */}
            {/*<input*/}
            {/*  type="file"*/}
            {/*  accept="image/*"*/}
            {/*  // style={{display: 'none'}}*/}
            {/*  ref={inputFileRef}*/}
            {/*  onChange={handleInputChange}*/}
            {/*/>*/}
            {/* Trigger file input on paste */}
            <div contentEditable onPaste={handlePaste}
                 className={'flex items-center justify-center '}
                 ref={contentRef}
                 id={'picture_section_Div_contentEditable'}
                 onClick={makeItEmpty}
                // onFocus={selectTextPlease}
                 style={{
                     minHeight: '100px', minWidth: '100px', border: '1px solid rgba(0, 0, 0, 0.1)',
                 }}
            >
                اینجا فایل را paste کنید
            </div>
        </div>
    </div>);
};

export default PictureSection;

