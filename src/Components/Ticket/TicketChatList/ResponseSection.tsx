import { FaTrash } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { handleDragOver, randomNumberGenerator } from "../../../utils/utilsFunction.tsx";
import useAxiosPrivateFormData from "../../../hooks/useAxiosPrivateFormData.tsx";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.tsx";
import { AxiosResponse } from "axios";
import { uploadFileUtil } from "../../../utils/upload.tsx";
import { toast } from "react-toastify";
import useObjectDataHolder from "../../../hooks/UseObjectDataHolder.tsx";
import { FiPaperclip } from "react-icons/fi";
import useAuth from "../../../hooks/useAuth.tsx";
import { ROLES } from "../../../Pages/ROLES.tsx";
import { PAGES } from "../../../Pages/Route-string.tsx";
import { useNavigate } from "react-router-dom";

const requestUrl = '/ticketReply/create';

interface IInitialSendData {
    description: string;
    visibleToUser: boolean;
    attachments: File[] | [];
}

const ResponseSection = ({ chatList, setReload, reload }) => {
    const initialSendData: IInitialSendData = {
        description: '',
        visibleToUser: true,
        attachments: []
    }
    const navigateTo = useNavigate()
    const messagesEndRef = useRef(null);
    const [isHideCheckBox, setIsHideCheckBox] = useState(false)
    const [sendData, setSendData] = useObjectDataHolder({ ...initialSendData })
    const fileInputRef = useRef(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const myAxiosPrivate = useAxiosPrivate()
    const myAxiosPrivateFormData = useAxiosPrivateFormData()

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            setTimeout(() => {
                messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
            }, 500)
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [reload]);

    useEffect(() => {
        const handlePaste = (event: ClipboardEvent) => {
            if (event.clipboardData && event.clipboardData.files.length > 0) {
                const pastedFiles = Array.from(event.clipboardData.files).filter(file => file.type.startsWith('image/'));
                if (pastedFiles.length > 0) {
                    toast.info("فایل ضمیمه شد.")
                    setSendData({ attachments: [...sendData.attachments, ...pastedFiles] });
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
    }, [sendData.attachments]);

    const submitHandler = async (inputNumber: 0 | 1) => {
        if (sendData.description === '') {
            toast.error('مقدار توضیحات نباید خالی باشد');
            return
        }


        const attachments = []
        // try Upload Files
        try {
            // بریم که فایل ها رو آپلود کنیم و   آی دی ها رو بریزیم توی آرایه
            // lets upload Files and  get IDs from backend and send Them in array
            if (sendData.attachments.length > 0) {
                const tId = toast.loading('در حال بارگزاری فایل')
                for (const myFile of sendData.attachments) {
                    try {
                        const responseOfRequest: AxiosResponse<any> | null = await uploadFileUtil(myFile, "replyTicket", myAxiosPrivateFormData);
                        debugger
                        if (responseOfRequest && responseOfRequest.status === 200) {
                            const fileId: string | undefined = responseOfRequest?.data?.id;
                            if (fileId) {
                                attachments.push(fileId);
                            } else {
                                attachments.push('');
                            }
                        } else {
                            attachments.push('');
                        }
                    } catch (error) {

                        console.log(error)
                    }
                }
                toast.dismiss(tId)
            }
        } catch (error) {
            debugger
            attachments.push('');
        }

        const temp = {
            ticketNumber: chatList.chatList.ticketNumber,
            description: sendData.description,
            visibleToUser: sendData.visibleToUser,
            attachments: attachments
        }

        try {
            const response1 = await myAxiosPrivate.post(requestUrl, temp);
            if (response1.data && inputNumber === 0) {
                toast.success(response1.data?.message)
                setSendData({...initialSendData})
                setReload({value: randomNumberGenerator()})
            }
            // اینجا میخوایم بعد از ثبت سفارش فاکتور بزنیم
            if (response1.data && inputNumber === 1) {
                toast.success(response1.data?.message)
                setSendData({...initialSendData})
                try {
                    const data111 = response1.data.data // there is contactCode Here Yes
                    navigateTo(PAGES.submit_bill, {
                        state: {
                            data: {
                                ...data111,
                                backUrl: PAGES.ticket_created_by_me,
                            }
                        }
                    });
                } catch (error) {
                    console.log(error.toString());
                    toast.info('امکان صدور فاکتور وجود ندارد');
                }
            }
        } catch (error) {
            debugger
            toast.error(error.toString());
        }
    }

    const handleDrop = (event: React.DragEvent<HTMLDivElement>, index: number) => {
        event.preventDefault();
        const droppedFiles = Array.from(event.dataTransfer.files);
        if (droppedFiles.length > 3) {
            toast.info('فقط سه فایل در هر تیکت میتوانید ارسال کنید')
            return
        }
        setSendData({attachments: [...droppedFiles]})

    };
    const handleInputFile = (e) => {
        const files = e.target.files;
        if (files.length > 3) {
            toast.info('فقط سه فایل در هر تیکت میتوانید ارسال کنید')
            return
        }
        setSendData({attachments: Array.from(files)});
    }

    const handleRemoveFile = () => {
        setSendData({attachments: []});
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Clear the value of the file input
        }

    }

    const index = 0;

    // @ts-ignore
    const {auth} = useAuth();
    const sendHiddenMessage = auth?.userInfo?.roleAccessList?.includes('sendHiddenMessage');
    const hasAccessToSubmitFactorInChatList = auth?.userInfo?.roleAccessList?.includes(ROLES.submitBillInChatList[0])
    try {
        const ContentText = sendData.attachments.length > 0 ? sendData.attachments.map((file: File) => file.name).join(', ') : ` محل قرار گیری فایل`
        return (
            <div className={'border-2 my-2'}>
            <textarea
                ref={textareaRef}
                value={sendData.description}
                onChange={(e) => setSendData({ ...sendData, description: e.target.value })}
                className={'p-2 w-full border__gray'}
                placeholder={'متن پاسخ را وارد کنید'}
            />

                <div className={'flex justify-between'}>
                    <div className={'flex justify-center btn-gay-mir'}>
                        <div className={'flex items-center'}>
                            {sendData.attachments.length > 0 && <FaTrash onClick={handleRemoveFile} className={'text-red-600 ms-2 '} />}
                        </div>
                        <div className={'flex items-center'}><FiPaperclip /></div>
                        <input
                            ref={fileInputRef}
                            multiple={true}
                            onChange={handleInputFile}

                            id={`file${index + 1}`} type="file" className="w-100 rounded border-2 hidden"
                        />
                        <div className={'flex items-center '}>
                            <label htmlFor={`file${index + 1}`} className={'customFileLabel cursor-pointer w-full'}>
                                <div
                                    id={`file${index + 1}`}
                                    className="same__input w-full"
                                    onDrop={e => handleDrop(e, index)}
                                    onDragOver={handleDragOver}
                                >
                                    <div className={'break-all px-1 '}>
                                        {ContentText}
                                    </div>
                                </div>
                            </label>
                        </div>
                    </div>
                    <div className={'flex flex-col justify-center items-end'}>
                        <div className={'flex gap-2'}>
                            <button
                                ref={messagesEndRef}
                                onClick={() => submitHandler(0)}
                                onContextMenu={(event) => {
                                    if (sendHiddenMessage) {
                                        event.preventDefault();
                                        setIsHideCheckBox(!isHideCheckBox)
                                    }
                                }}
                                className={'btn-submit-mir'}> ارسال
                            </button>
                            {hasAccessToSubmitFactorInChatList && (
                                <button
                                    ref={messagesEndRef}
                                    onClick={() => submitHandler(1)}
                                    onContextMenu={(event) => {
                                        if (sendHiddenMessage) {
                                            event.preventDefault();
                                            setIsHideCheckBox(!isHideCheckBox)
                                        }
                                    }}
                                    className={'btn-submit-mir'}> ارسال و ثبت فاکتور
                                </button>
                            )}
                        </div>
                        {isHideCheckBox && (
                            <div className={'border border-blue-200 rounded m-2 p-2'}>
                                <input checked={!sendData.visibleToUser}
                                       onChange={(e) => {
                                           const checked = e.target.checked
                                           setSendData({ visibleToUser: !checked })
                                       }}
                                       id={'hideMessageFromUser'} type={'checkbox'}
                                />
                                <label htmlFor="hideMessageFromUser" className={'fontSize10'}> ارسال پیام در حالت ویسپر</label>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        return <div>{error.toString()}</div>
    }
};

export default ResponseSection;
