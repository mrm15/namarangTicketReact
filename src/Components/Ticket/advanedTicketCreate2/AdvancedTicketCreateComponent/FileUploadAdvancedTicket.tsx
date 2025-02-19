import React from 'react';
import {bytesToMegabytes, handleDragOver} from "../../../../utils/utilsFunction.tsx";
import {FaTrash} from "react-icons/fa";
import {toast} from "react-toastify";
import {useAdvancedTicketContext} from "../AdvancedTicketContext.tsx";

const FileUploadAdvancedTicket = ({
                                      titleOfSection = "بارگزاری فایل",
                                      acceptedFormats = [".cdr", ".jpg", ".jpeg", ".png", ".gif", ".tiff", ".tif", ".svg", ".pdf", ".eps"],
                                      myKey = "files",

                                  }) => {


    const {data, setData} = useAdvancedTicketContext()

    const assignFileToState = (newFiles: File[]) => {
        if (!newFiles || newFiles.length === 0) return;

        const existingFiles = data[myKey]
        const maxFileSize = data.maxFileSize; // Maximum file size in MB

        // Filter out files that are too large
        const validFiles = newFiles.filter(file => {
            const fileSizeInMb = bytesToMegabytes(file.size);
            // if (fileSizeInMb > maxFileSize) {
            //     toast.error(`حجم فایل "${file.name}" نمیتواند بیشتر از ${maxFileSize} مگابایت باشد`);
            //     return false;
            // }
            return true;
        });

        if (validFiles.length === 0) return;

        // Filter out duplicate files
        const uniqueFiles = validFiles.filter(newFile =>
            !existingFiles.some(existingFile =>
                existingFile.name === newFile.name && existingFile.size === newFile.size
            )
        );

        if (uniqueFiles.length === 0) {
            toast.warning("همه فایل‌های انتخاب‌شده قبلاً آپلود شده‌اند");
            return;
        }

        // Add new unique files to the state
        setData({[myKey]: [...existingFiles, ...uniqueFiles]});
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();

        const droppedFiles = Array.from(event.dataTransfer.files);
        // if (droppedFiles.length > 1) {
        //     toast.info('لطفاً فقط یک فایل انتخاب کنید');
        //     return;
        // }
        // const singleFile = droppedFiles[0]
        // const files = [...ticketData.files, ...droppedFiles];
        // setTicketData({...ticketData, files});
        assignFileToState(droppedFiles)

    };

    const handleRemoveFile = (index: number) => {
        const files = data[myKey]
        files.splice(index, 1)
        setData({[myKey]: files})

    }

    return (
        <div>
            <div className="div__group__input_select w-full">
                <label htmlFor={`file912${myKey}`}>{titleOfSection}</label>
                <input
                    id={`file912${myKey}`}
                    onChange={(e) => {
                        if (e.target.files) {
                            assignFileToState(Array.from(e.target.files));
                            e.target.value = ""; // Clear the input to allow re-selection of the same files
                        }
                    }}
                    multiple={true}
                    type="file"
                    accept={acceptedFormats.join(", ")}
                    className="w-100 rounded border-2 hidden"

                />


                <div className={' border-2 rounded flex justify-center items-center'}>
                    <label htmlFor={`file912${myKey}`}
                           className={'cursor-pointer w-full'}
                    >
                        <div
                            className="w-full flex gap-2 my-4  items-center"
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}>
                            <div className={"w-36"}>
                                <input
                                    className={"same__input w-32"}
                                    placeholder={" فایل ها رو Paste کنید."}
                                    type="text"
                                    onChange={e => {
                                        console.log("")
                                    }}
                                    value={""}
                                    onPaste={(e) => {
                                        const items = e.clipboardData?.items;
                                        const files: File[] = [];
                                        if (items) {
                                            for (const item of items) {
                                                if (item.kind === "file") {
                                                    const file = item.getAsFile();
                                                    if (file) files.push(file);
                                                }
                                            }
                                        }

                                        if (files.length > 0) {
                                            assignFileToState(files); // Ensure an array is passed
                                        }
                                    }}
                                />
                            </div>

                            <div className={"bg-gray-200 border-2 border-gray-500 w-80 px-3 py-2.5 rounded "}>
                                <div className={"opacity-50"}>کلیک کنید یا بکشید و رها کنید...</div>
                            </div>
                        </div>
                    </label>
                    <div className={"flex gap-2 items-center   p-2 ltr select-none"}>
                        {data?.[myKey]?.map((file: any, index: any) => <div
                            key={index}
                            className={"py-2 rounded border-2 px-2 ltr font-mono flex items-center w-fit whitespace-nowrap  max-w-md"}
                        >
                            <div>
                                <FaTrash
                                    onClick={() => handleRemoveFile(index)}
                                    className={'text-red-600'}/>
                            </div>
                            {file.type.startsWith("image/") ? (
                                <a target="_blank" rel="noopener noreferrer" href={URL.createObjectURL(file)}>
                                    <img src={URL.createObjectURL(file)} alt={file.name}
                                         className="w-32 h-32 object-cover rounded ml-2"/>
                                </a>
                            ) : (
                                <a href={URL.createObjectURL(file)} download={file.name}
                                   className="text-blue-500 underline">
                                    {file?.name}
                                </a>
                            )}
                        </div>)}
                    </div>
                </div>


            </div>

        </div>
    );
};

export default FileUploadAdvancedTicket;