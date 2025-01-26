import React, {useState} from 'react';
import {FaTag} from "react-icons/fa6";
import {useChatListContext} from "../../ChatListContext.tsx";

const MessageTagger = ({currentTag, tags,item}) => {

    const {setData, data} = useChatListContext();
    console.log(data)
    const [isOpen, setIsOpen] = useState(false)

        tags = [
            {id: "1", value: "فایل نهایی سفارش",},
            {id: "2", value: "اسکرین شات",},
            {id: "3", value: "فاکتور",},
            {id: "4", value: "چهارمی",},
        ]
    const openMenu = () => setIsOpen(true)
    const closeMenu = () => setIsOpen(false)

    return (
        <div className={"flex  rtl"}>
            <button onClick={() => isOpen ? closeMenu() : openMenu()} >
                <FaTag className={"text-blue-500"} size={18}/>
            </button>
            <div>
                {isOpen && <div>
                    {tags.map(row => <button
                        className={`mx-1 rounded px-2 ${(currentTag?.id === row?.id) ? " bg-blue-400 " : "  bg-white"}`}
                        key={row?.id}
                    >{row?.value}</button>)}
                </div>}
            </div>
        </div>
    );
};

export default MessageTagger;