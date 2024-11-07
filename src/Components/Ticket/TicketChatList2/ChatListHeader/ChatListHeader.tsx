import React from 'react';
import {useChatListContext} from '../ChatListContext';
import {FaArrowLeft, FaCalendarAlt, FaBuilding, FaTicketAlt} from 'react-icons/fa';
import {useNavigate} from "react-router-dom";
import {AiOutlineClose, AiOutlineCloseCircle, AiOutlineCloseSquare, AiOutlineIssuesClose} from "react-icons/ai";

const ChatListHeader: React.FC = () => {
    const {data} = useChatListContext();

    const navigateTo = useNavigate()
    return (
        <div className="flex items-center gap-2  p-4 bg-white shadow-md rtl">
            <button
                onClick={() => navigateTo(-1)}
                className="bg-gray-600 p-2 rounded flex  items-center gap-1 text-white"
                title={"برگشت"}
            >
                <AiOutlineClose size={24}/>
            </button>
            {/* Main title (centered on larger screens) */}
            <div className={"flex flex-grow justify-between "}>
                {/*<div className="flex flex-col items-center text-center">*/}
                <div className="text-lg font-semibold text-gray-900">{data?.title}</div>
                <p className="text-xs text-gray-500 flex items-center">
                    <FaBuilding className="mr-1"/>
                    <div className={"hidden lg:block"}> اولین دپارتمان :</div>
                    {data?.lastDepartment}
                </p>
                <div className={"text-gray-500 flex items-center"}>
                    <FaTicketAlt
                        className="mx-1"/>
                    <div className={"hidden lg:block"}> شماره سفارش:</div>
                    {data?.ticketNumber}
                </div>
                <div className="hidden sm:flex items-center text-xs text-gray-500">
                    <FaCalendarAlt className="mr-1"/>
                    &nbsp;
                    <div className={"hidden lg:block"}> تاریخ ثبت :</div>
                    <div className={"ltr"}>
                        {data?.createAt}
                    </div>
                </div>
                {/*</div>*/}

                {/* Creation Date with Icon */}

            </div>

        </div>
    );
};

export default ChatListHeader;
