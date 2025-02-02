import React, {useState} from 'react';
import {FaTag} from "react-icons/fa6";
import {useChatListContext} from "../../ChatListContext.tsx";
import useList from "../../../../../hooks/useList.tsx";

const MessageTagger = ({currentTag, item}) => {

    const {setData, data} = useChatListContext();
    console.log(data)
    const [isOpen, setIsOpen] = useState(false)

    const tags = useList("/messageTag/tagsList")
    const openMenu = () => setIsOpen(true)
    const closeMenu = () => setIsOpen(false)

    const handleChangeTag = (row) => {

        const name = row?.key;
        const value = row?.value;
        const yes = confirm(`
        آیا از تغییر برچسب فایل به حالت 
        
        ${name}
        مطمئن هستید؟
        `);
        if (!yes) {
            return
        }

        console.log(name)


    }
    return (
        <div className={"flex  rtl"}>
            <button onClick={() => isOpen ? closeMenu() : openMenu()}>
                <FaTag className={"text-blue-500"} size={18}/>
            </button>
            <div>
                {isOpen && <div>
                    {tags.map(row => <button
                        onClick={() => handleChangeTag(row)}
                        className={`mx-1 rounded px-2 ${(currentTag?.id === row?.id) ? " bg-blue-400 " : "  bg-white"}`}
                        key={row?.id}
                    >{row?.key}</button>)}
                </div>}
            </div>
        </div>
    );
};

export default MessageTagger;