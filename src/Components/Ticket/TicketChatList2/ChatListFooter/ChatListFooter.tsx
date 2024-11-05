import {FaTrash, FaPaperclip, FaPaperPlane} from "react-icons/fa";
import React, {useEffect, useRef, useState} from "react";
import {AxiosResponse} from "axios";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import useObjectDataHolder from "../../../../hooks/UseObjectDataHolder.tsx";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate.tsx";
import useAxiosPrivateFormData from "../../../../hooks/useAxiosPrivateFormData.tsx";
import useAuth from "../../../../hooks/useAuth.tsx";
import {ROLES} from "../../../../Pages/ROLES.tsx";
import {uploadFileUtil} from "../../../../utils/upload.tsx";
import {randomNumberGenerator} from "../../../../utils/utilsFunction.tsx";
import {PAGES} from "../../../../Pages/Route-string.tsx";
import {useChatListContext} from "../ChatListContext.tsx";
import {IoNewspaperOutline, IoSend} from "react-icons/io5";
import {HiPaperAirplane} from "react-icons/hi2";

const requestUrl = '/ticketReply/create';

interface IInitialSendData {
    description: string;
    visibleToUser: boolean;
    attachments: File[] | [] | any;
}

const ChatListFooter = () => {

    const {data, setData} = useChatListContext()
    const initialSendData: IInitialSendData = {
        description: '',
        visibleToUser: true,
        attachments: []
    }
    const navigateTo = useNavigate();
    const fileInputRef = useRef(null);
    const [sendData, setSendData] = useObjectDataHolder({...initialSendData});
    const myAxiosPrivate = useAxiosPrivate();
    const myAxiosPrivateFormData = useAxiosPrivateFormData();

    const {auth} = useAuth();
    const sendHiddenMessage = auth?.userInfo?.roleAccessList?.includes('sendHiddenMessage');
    const hasAccessToSubmitFactorInChatList = auth?.userInfo?.roleAccessList?.includes(ROLES.submitBillInChatList[0]);

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
        setSendData({attachments: Array.from(files)});
    }

    const handleRemoveFile = (index) => {
        setSendData({
            attachments: sendData.attachments.filter((_, i) => i !== index)
        });
    }

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFiles = Array.from(event.dataTransfer.files);
        if (droppedFiles.length > 3) {
            toast.error("This didn't work.")

            toast.error('فقط سه فایل در هر تیکت میتوانید ارسال کنید');
            return;
        }
        setSendData({attachments: [...droppedFiles]});
    };

    const submitHandler = async (inputNumber: 0 | 1) => {
        if (sendData.description === '') {
            toast.error('لطفا یک پیام بنویسید');
            return;
        }

        const attachments = [];
        try {
            if (sendData.attachments.length > 0) {
                const tId = toast.loading('در حال بارگزاری فایل');
                for (const myFile of sendData.attachments) {
                    try {
                        const responseOfRequest: AxiosResponse<any> | null = await uploadFileUtil(myFile, "replyTicket", myAxiosPrivateFormData);
                        if (responseOfRequest && responseOfRequest.status === 200) {
                            const fileId: string | undefined = responseOfRequest?.data?.id;
                            attachments.push(fileId || '');
                        }
                    } catch (error) {
                        console.log(error);
                        attachments.push('');
                    }
                }
                toast.dismiss(tId);
            }
        } catch (error) {
            attachments.push('');
        }

        const temp = {
            ticketNumber: data.ticketNumber,
            description: sendData.description,
            visibleToUser: sendData.visibleToUser,
            attachments
        };

        try {
            const response1 = await myAxiosPrivate.post(requestUrl, temp);
            if (response1.data && inputNumber === 0) {
                toast.success(response1.data?.message);
                setSendData({...initialSendData});
                setData({reload: randomNumberGenerator()})
            }
            if (response1.data && inputNumber === 1) {
                toast.success(response1.data?.message);
                setSendData({...initialSendData});

                navigateTo(PAGES.submit_bill, {
                    state: {
                        data: {
                            ...response1.data.data,
                            backUrl: PAGES.ticket_created_by_me,
                        }
                    }
                });
            }
        } catch (error) {
            toast.error(error.toString());
        }
    }

    const activeHiddenMessage = (event) => {
        if (sendHiddenMessage) {
            event.preventDefault();
            setSendData({visibleToUser: !sendData.visibleToUser})
            const newText = sendData.visibleToUser ?  " فعال " : "غیر فعال "
            const icon = sendData.visibleToUser ?  "🕵️‍♂️" : "👀"
            toast(` حالت پیام مخفی ${newText} شد `,
                {
                    icon: icon,
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
        }
    }

    return (
        <div>
            {sendData.attachments.length > 0 && <div className={"ltr flex items-center p-3 bg-white border-gray-200"}>
              <div className="right-4 top-1/2 transform -translate-y-1/2 flex space-x-1">
                  {sendData.attachments.map((file, index) => (
                      <div key={index}
                           className="flex items-center space-x-1 bg-blue-100 p-1 rounded border border__gray">

                          <span className="text-xs text-gray-700">{file.name}</span>
                          &nbsp;
                          <FaTrash
                              className="text-red-500 cursor-pointer"
                              onClick={() => handleRemoveFile(index)}
                          />
                      </div>
                  ))}
              </div>
            </div>}
            <div
                className={`ltr flex items-center p-3  border-t border-gray-200  ${sendData.visibleToUser ? "bg-white" : "bg-gray-800"}`}>
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
                    placeholder="پیام خود را وارد کنید"
                    value={sendData.description}
                    onChange={(e) => setSendData({...sendData, description: e.target.value})}
                    className="rtl min-h-max w-full py-2 px-4 rounded border border-gray-300 bg-gray-100 focus:outline-none focus:border-blue-500"
                />

                </div>

                <button
                    className="p-2 text-gray-500 hover:text-blue-500 focus:outline-none"
                    onClick={() => fileInputRef.current?.click()}
                    onContextMenu={activeHiddenMessage}
                >
                    <FaPaperclip size={24}/>
                </button>
                {/* Send and Extra Options */}
                <div className="flex items-end ">
                    {/* Send Button */}
                    <button
                        className="p-2 text-blue-500 hover:bg-blue-100 rounded transition"
                        onClick={() => submitHandler(0)}
                        onContextMenu={(event) => {
                            if (sendHiddenMessage) {
                                event.preventDefault();
                                setSendData({visibleToUser: !sendData.visibleToUser})
                            }
                        }}
                    >
                        <IoSend size={24}/>
                    </button>

                    {/* Send and Submit Invoice Button (if allowed) */}
                    {hasAccessToSubmitFactorInChatList && (
                        <button
                            className="p-2 text-green-500 hover:bg-green-100 rounded transition  flex"
                            onClick={() => submitHandler(1)}
                            onContextMenu={(event) => {
                                if (sendHiddenMessage) {
                                    event.preventDefault();
                                    setSendData({visibleToUser: !sendData.visibleToUser})
                                }
                            }}
                        >
                            <IoNewspaperOutline size={24}/>
                            <HiPaperAirplane size={24}/>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatListFooter;
