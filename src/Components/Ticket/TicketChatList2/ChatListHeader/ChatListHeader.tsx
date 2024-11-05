import React from 'react';
import {useChatListContext} from '../ChatListContext';
import {FaArrowLeft, FaCalendarAlt, FaBuilding, FaTicketAlt} from 'react-icons/fa';
import {useNavigate} from "react-router-dom";

const ChatListHeader: React.FC = () => {
    const {data} = useChatListContext();

    const navigateTo = useNavigate()
    return (
        <div className="flex items-center justify-between p-4 bg-white shadow-md ltr">
            {/* Back button for mobile */}
            <button
                onClick={() => navigateTo(-1)}
                className="lg:hidden text-gray-600">
                <FaArrowLeft/>
            </button>

            {/* Main title (centered on larger screens) */}
            <div className="flex flex-col items-center text-center">
                <h1 className="text-lg font-semibold text-gray-900">{data?.title}</h1>
                <p className="text-xs text-gray-500 flex items-center">
                    <FaBuilding className="mr-1"/> دپارتمان: {data?.lastDepartment} • <FaTicketAlt
                    className="mx-1"/> شماره تیکت: {data?.ticketNumber}
                </p>
            </div>

            {/* Creation Date with Icon */}
            <div className="hidden sm:flex items-center text-xs text-gray-500">
                <FaCalendarAlt className="mr-1"/>
                {data?.createAt}
            </div>
        </div>
    );
};

export default ChatListHeader;
