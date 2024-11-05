import React, { useState, useRef, useEffect } from 'react';
import { FaPaperclip, FaTrash, FaSmile, FaPaperPlane } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useChatListContext } from '../ChatListContext';

const ChatListFooter: React.FC = () => {
    const [message, setMessage] = useState('');
    const [attachments, setAttachments] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { data } = useChatListContext(); // assuming you have a reload context function

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            if (filesArray.length + attachments.length > 3) {
                toast.info('حداکثر سه فایل مجاز است');
                return;
            }
            setAttachments([...attachments, ...filesArray]);
        }
    };

    const handleRemoveAttachment = (index: number) => {
        const newAttachments = [...attachments];
        newAttachments.splice(index, 1);
        setAttachments(newAttachments);
    };

    const handleSendMessage = async () => {
        if (!message && attachments.length === 0) {
            toast.info('پیامی وارد کنید');
            return;
        }

        // Handle upload and send message logic here
        // This is where you'd call the upload and send function
        setMessage('');
        setAttachments([]);
    };

    return (
        <div className="flex items-center p-3 bg-white border-t border-gray-200 shadow-lg">
            {/* Attachment button */}
            <button
                className="p-2 text-gray-500 hover:text-blue-500 focus:outline-none"
                onClick={() => fileInputRef.current?.click()}
            >
                <FaPaperclip />
            </button>
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                multiple
            />

            {/* Message Input */}
            <div className="flex-1 mx-2 relative">
                <input
                    type="text"
                    placeholder="پیام خود را وارد کنید"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full py-2 px-4 rounded-full border border-gray-300 bg-gray-100 focus:outline-none focus:border-blue-500"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex space-x-1">
                    {attachments.map((file, index) => (
                        <div key={index} className="flex items-center space-x-1 bg-blue-100 p-1 rounded-full">
                            <span className="text-xs text-gray-700">{file.name}</span>
                            <FaTrash
                                className="text-red-500 cursor-pointer"
                                onClick={() => handleRemoveAttachment(index)}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Send Button */}
            <button
                className="p-2 text-blue-500 hover:bg-blue-100 rounded-full transition"
                onClick={handleSendMessage}
            >
                <FaPaperPlane />
            </button>
        </div>
    );
};

export default ChatListFooter;
