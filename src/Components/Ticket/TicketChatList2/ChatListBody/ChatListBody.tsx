import React, {useEffect, useRef} from 'react';
import {useChatListContext} from '../ChatListContext';
import {FaFile} from 'react-icons/fa';
import ManPerson from "../../../../assets/Svg/ManPerson.tsx";
import "./telegram-bg-style.scss"
import {PiDetectiveFill} from "react-icons/pi";
import {RiSearchFill} from "react-icons/ri";
import BillDataButtonInChatList from "./BillDataButtonInChatList.tsx";

const ChatListBody: React.FC = () => {
    const {data} = useChatListContext();
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            setTimeout(() => {
                messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
            }, 500)
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [data.reload]);
    return (
        <div className={"telegram__bg__style"}>
            <div className={"telegram__color__bg"}>
                <div className=" flex-1 overflow-y-auto p-4 ltr">
                    {data?.data?.map((item:any, index) => {
                        const isSent = item.isTicketSender;
                        const isHidden = item.visibleToUser === false;

                        const isTicketSender = item.isTicketSender;
                        const isVisibleToUser = item.visibleToUser
                        const billNumber = item?.billNumber
                        const billStatus = item?.billStatus
                        const type = item?.type // تایپ رو گرفتم تا بدونم  این تیکت هست یا توی تیکت ریپلای که حذف کردنش آسون تر باشه
                        const id = item.id // آیدی رو گرفتم که بتونم موقع حذف بدونم چیو حذف کنم
                        const tempBillData = {
                            billNumber, billStatus, type, id,
                            ticketId: data?.ticketId, // این از توی دیتا میاد
                            ticketNumber: data.ticketNumber, // اینم از توی دیتا میاد
                        }

                        return (
                            <div key={index} className={` flex ${isSent ? 'justify-end' : 'justify-start'} mb-4`}

                            >
                                <div className={`${isSent ? 'text-right' : 'text-left'} w-10/12 lg:w-1/2`}>
                                    {/* User info and hidden message indicator */}

                                    <div className="flex items-center mb-1">
                                        {!isSent && (
                                            <div className="w-8 h-8 mr-2">
                                                <ManPerson/> {/* Placeholder for user avatar */}
                                            </div>
                                        )}
                                        <div
                                            className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">{item.user_name} • {item.department_name}</div>
                                    </div>
                                    {/* Message Bubble */}

                                    <div className={"transform transition-transform duration-300 hover:translate-x-4"}>
                                        {isHidden && <div className=" flex justify-end">
                                          <RiSearchFill size={24} color="black"/>
                                          <PiDetectiveFill size={24} color="black"/>
                                        </div>}
                                    </div>
                                    <div
                                        className={`p-3 rounded-lg shadow-md ${
                                            isSent ? 'rounded-tr-none text-black' : 'bg-gray-200 text-gray-800 rounded-tl-none'
                                        }
                                         ${isHidden ? 'border border-black ' : ''}`}
                                        style={isSent ? {backgroundColor: 'hsl(114, 93.75%, 81.73%)'} : {}}
                                    >


                                        <p>{item.description}</p>

                                        {/* File Attachments */}
                                        <div className="mt-2 space-y-2">
                                            {item.files?.map((file, idx) => {
                                                const fileSizeInKB = (file.fileSize / 1024).toFixed(2);
                                                const href = `${process.env.REACT_APP_BASE_URL}/download/${file.filePath}`;
                                                const isPhoto = file.fileType.startsWith("image");

                                                return (
                                                    <a
                                                        key={idx}
                                                        href={href}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={`flex items-center p-2 border rounded-lg ${
                                                            isPhoto ? 'flex-col' : 'flex-row'
                                                        } ${isPhoto ? '' : 'space-x-2'} bg-white shadow`}
                                                        download={true}
                                                    >
                                                        {isPhoto ? (
                                                            <img src={href} alt={file.fileName}
                                                                 className="w-32 h-32 object-cover rounded-lg"/>
                                                        ) : (
                                                            <FaFile className="text-gray-500 text-xl"/>
                                                        )}
                                                        <div className="text-xs text-gray-700 mt-1">
                                                            {file.fileName} - {fileSizeInKB} KB
                                                        </div>
                                                    </a>
                                                );
                                            })}
                                        </div>
                                        <div>
                                            {billNumber && <BillDataButtonInChatList billData={tempBillData}
                                                                                     setReload={undefined}

                                            />}

                                        </div>
                                        {/* Timestamp */}
                                        <div className="text-xs text-gray-400 mt-1 w-fit">
                                            {item.createAt}
                                        </div>
                                    </div>


                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div ref={messagesEndRef}/>
        </div>
    );
};

export default ChatListBody;
