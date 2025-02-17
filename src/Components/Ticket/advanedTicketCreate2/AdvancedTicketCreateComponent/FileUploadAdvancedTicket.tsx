import React from 'react';
import {bytesToMegabytes, handleDragOver} from "../../../../utils/utilsFunction.tsx";
import {FaTrash} from "react-icons/fa";
import {toast} from "react-toastify";
import {useAdvancedTicketContext} from "../AdvancedTicketContext.tsx";

const FileUploadAdvancedTicket = () => {




    const {data,setData} = useAdvancedTicketContext()
    const acceptedFormats = [".cdr", ".jpg", ".jpeg", ".png", ".gif", ".tiff", ".tif", ".svg", ".pdf", ".eps"];

    const assignFileToState = (singleFile: File) => {

        // جچم فایل رو چک کنیم اگه از ماکزیمم زیاد تر بود بگم شرمنده آپلود نمیشه
        if (singleFile) {
            const fileSizeInMb = bytesToMegabytes(singleFile.size)
            // if (fileSizeInMb > data.maxFileSize) {
            //     toast.error(`حجم فایل نمیتواند بیشتر از ${data.maxFileSize} مگابایت باشد`);
            //     return
            // }
        }
        const files = [...data.files];
        files.push(singleFile)
        setData({...data, files});
    }
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        debugger
        const droppedFiles = Array.from(event.dataTransfer.files);
        if (droppedFiles.length > 1) {
            toast.info('لطفاً فقط یک فایل انتخاب کنید');
            return;
        }
        const singleFile = droppedFiles[0]
        // const files = [...ticketData.files, ...droppedFiles];
        // setTicketData({...ticketData, files});
        assignFileToState(singleFile)

    };

    const handleRemoveFile = (index: number) => {
        const files = data.files
        files.splice(index, 1)
        setData({...data, files})

    }

    return (
        <div>
            <div
                className="mt-2 p-2 bg-gray-100 bg-opacity-30 border border-gray-300 rounded-md  ">
                <div>پسوند های مجاز برای آپلود فایل:</div>
                <div className={"ltr text-center flex flex-wrap"}>
                    {acceptedFormats.map((ext, index) => (
                        <span
                            key={index}
                            className="text-gray-700 text-sm mr-2 bg-gray-400 bg-opacity-30 px-2 rounded my-1"
                        >{ext}</span>
                    ))}
                </div>

            </div>
            <div className={"flex gap-2 items-center  bg-white p-2 ltr"}>
                {data?.files?.map((file: any, index: any) => <div key={index}
                                                                  className={"py-2 rounded border-2 px-2 ltr font-mono flex items-center"}
                ><FaTrash
                    onClick={() => handleRemoveFile(index)}
                    className={'text-red-600'}/>
                    <div>{file?.name}</div>
                </div>)}
            </div>
            <div className="div__group__input_select w-full">
                <label htmlFor={`file912`}>بارگزاری فایل</label>
                <input
                    onChange={(e) => {
                        assignFileToState(e.target.files[0])
                    }}                    multiple={true}
                    id={`file912`} type="file"
                    accept={acceptedFormats.join(", ")}
                    className="w-100 rounded border-2 hidden"

                />


                <div className={'flex items-center'}>
                    <label htmlFor={`file912`}
                           className={'customFileLabel cursor-pointer w-full'}
                    >
                        <div
                            className="same__input w-full "
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}>
                            بکشید و رها کنید...
                        </div>

                    </label>


                </div>


            </div>
        </div>
    );
};

export default FileUploadAdvancedTicket;