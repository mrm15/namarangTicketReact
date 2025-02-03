import React, {useState} from 'react';
import {FaTag} from "react-icons/fa6";
import {useChatListContext} from "../../ChatListContext.tsx";
import useList from "../../../../../hooks/useList.tsx";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate.tsx";
import {toast} from "react-hot-toast";
import {nanoid} from "@reduxjs/toolkit";

const MessageTagger = ({type, id, currentTag, item}) => {

    const {setData, data} = useChatListContext();
    console.log(data)
    const [isOpen, setIsOpen] = useState(false)

    const tags = useList("/messageTag/tagsList")
    console.log(tags)
    const openMenu = () => setIsOpen(true)
    const closeMenu = () => setIsOpen(false)

    const myAxios = useAxiosPrivate()
    const handleChangeTag = async (row) => {

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

        console.log(item)
        // item.type ===  ticketId  or  ticketReply
        const url = item.type + "/newTag"
        const data = {id: item.id, tagId: row.value}

        try {
            const result = await myAxios.post(url, data);
            if (result.status === 200) {
                toast.success(result.data.message)
                setData({reload: nanoid(12)})
            } else {
                toast.error(" کد بازگشتی " + result.status)
            }
        } catch (error: any) {
            toast.error(error?.toString)
        }


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
                        className={`mx-1 rounded px-2 ${(currentTag?.value === row?.value) ? " bg-blue-400 " : "  bg-white"}`}
                        key={row?.value}
                    >{row?.key}</button>)}
                </div>}
            </div>
        </div>
    );
};

export default MessageTagger;