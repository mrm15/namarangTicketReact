import React, {useEffect, useRef} from 'react';
import {handleDragOver} from "../../../../utils/utilsFunction.tsx";
import {FaPaperclip} from "react-icons/fa";
import {IoNewspaperOutline, IoSend} from "react-icons/io5";
import {HiPaperAirplane} from "react-icons/hi2";
import toast from "react-hot-toast";

const ShotUploadInAdvancedTicketCreate = ({setTicketData,ticketData}) => {

    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);
    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFiles = Array.from(event.dataTransfer.files);
        if (droppedFiles.length > 3) {

            toast.error('فقط سه فایل در هر تیکت میتوانید ارسال کنید');
            return;
        }
        setTicketData({screenShot: [...droppedFiles]});
    };
    const handleInputFile = (e) => {
        const files = e.target.files;
        if (files.length > 3) {
            toast.error("فقط سه فایل در هر تیکت میتوانید ارسال کنید")
            toast('ماکزیمم سه فایل انتخاب کنید.',
                {
                    icon: '👏',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
            return;
        }
        // حجم هر فایل رو هم اینحا میتونم چک کنم.


        setTicketData({screenShot: Array.from(files)});
    }

    useEffect(() => {
        const handlePaste = (event: ClipboardEvent) => {
            if (event.clipboardData && event.clipboardData.files.length > 0) {
                const pastedFiles = Array.from(event.clipboardData.files)//.filter(file => file.type.startsWith('image/'));
                if (pastedFiles.length > 0) {
                    toast("فایل ضمیمه شد.")
                    setTicketData({ screenShot: [...ticketData.screenShot, ...pastedFiles] });
                }
            }
        };

        const textarea = textareaRef.current;
        if (textarea) {
            textarea.addEventListener('paste', handlePaste);
        }

        return () => {
            if (textarea) {
                textarea.removeEventListener('paste', handlePaste);
            }
        };
    }, [ticketData.screenShot]);

    return (
        <div>
            <div
                className={`ltr flex items-center p-3  border-t border-gray-200 bg-white `}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                {/* Attachment Button */}


                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleInputFile}
                    multiple
                />


                {/* Message Input */}
                <div className="flex-1 mx-2 relative">
                <textarea
                    ref={textareaRef}
                    maxLength={900}
                    title={"ارسال Enter  , خط بعدی Ctrl+Enter "}
                    placeholder={"پیام خود را وارد کنید"}
                    // onChange={(e) => setSendData({...sendData, description: e.target.value})}
                    className="rtl min-h-max w-full py-2 px-4 rounded border border-gray-300 bg-gray-100 focus:outline-none focus:border-blue-500"
                />

                </div>


            </div>
        </div>
    );
};

export default ShotUploadInAdvancedTicketCreate;