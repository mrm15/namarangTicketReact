import React from 'react';
import {useChatListContext} from '../ChatListContext';
import {FaFile} from 'react-icons/fa';
import ManPerson from "../../../../assets/Svg/ManPerson.tsx";
import "./telegram-bg-style.scss"

const ChatListBody: React.FC = () => {
    const {data} = useChatListContext();

    return (
        <div className={"telegram__bg__style"}>
            <div className={"telegram__color__bg"}>
                <div className=" flex-1 overflow-y-auto p-4 ltr">
                    {data?.data?.map((item, index) => {
                        const isSent = item.isTicketSender;
                        const isHidden = item.visibleToUser === false;

                        return (
                            <div key={index} className={` flex ${isSent ? 'justify-end' : 'justify-start'} mb-4`}

                            >
                                <div className={`${isSent ? 'text-right' : 'text-left'} w-10/12 lg:w-1/2`}>
                                    {/* User info and hidden message indicator */}
                                    {isHidden && <div className="text-xs text-gray-400 mb-1">پیام مخفی</div>}
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
                                    <div
                                        className={`p-3 rounded-lg shadow-md ${
                                            isSent ? 'rounded-tr-none text-black' : 'bg-gray-200 text-gray-800 rounded-tl-none'
                                        } ${isHidden ? 'opacity-30' : ''}`}
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
        </div>
    );
};

export default ChatListBody;
