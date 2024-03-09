import { Link} from "react-router-dom";
import {PAGES} from "../Pages/Route-string.tsx";
import {
    FaUserPlus,
    FaUsers,
    FaUserTag,
    FaClipboardList,
    FaBuilding,
    FaSitemap,
    FaLayerGroup,
    FaFile,
    FaTicketAlt
} from 'react-icons/fa';


const Home = () => {


    const shortcuts = [
        { title:'افزودن کاربر' , description:"افزودن کاربر جدید ", icon:FaUserPlus, link:PAGES.USER_ADD_EDIT},
        { title:'مشاهده لیست کاربران نمارنگ' , description:"لیست کاربران ", icon:FaUsers, link:PAGES.USER_LIST},

        { title:'افزودن نقش' , description:"افزودن نقش جدید به نقش های سایت  ", icon:FaUserTag, link:PAGES.ROLE_ADD_EDIT},
        { title:'لیست نقش ها' , description:"مشاهده لیست نقش ها", icon:FaClipboardList, link:PAGES.ROLE_LIST},

        { title:'افزودن دپارتمان' , description:"افزودن دپارتمان جدید به سایت  ", icon:FaBuilding, link:PAGES.DEPARTMENT_ADD_EDIT},
        { title:'لیست دپارتمان ها' , description:"مشاهده لیست دپارتمان ", icon:FaSitemap, link:PAGES.DEPARTMENT_LIST},

        { title:'افزودن استاتوس تیکت' , description:"افزودن استاتوس جدید به سایت  ", icon:FaLayerGroup, link:PAGES.STATUS_ADD_EDIT},
        { title:'لیست استاتوس تیکت' , description:"مشاهده لیست استاتوس ", icon:FaLayerGroup, link:PAGES.STATUS_LIST},
        // { title:'لیست نقش ها' , description:"مشاهده لیست نقش های تعریف شده و دسترسی ها ", icon:'blobb', link:PAGES.LIST_ROLE_PANEL},

        { title:'افزودن فایل' , description:"افزودن فایل جدید به بانک فایل ها  ", icon:FaFile  , link:PAGES.FILE_ADD_EDIT},
        { title:'لیست فایل ها' , description:"مشاهده لیست فایل ها ", icon:FaFile  , link:PAGES.FILE_LIST},


        {title:'ثبت سفارش جدید' , description: 'ایجاد سفارش جدید در نمارنگ' , icon:FaTicketAlt , link: PAGES.ticket_Create},

        {title:'مشاهده همه سفارشات ادمین' , description: ' ' , icon:FaTicketAlt , link: PAGES.ticket_Read_All},
        {title:'صندوق ورودی' , description: '' , icon:FaTicketAlt , link: PAGES.ticketInbox},
        {title:'تمام تیکت های من' , description: '' , icon:FaTicketAlt , link: PAGES.ticket_read_my_all_tickets},
        {title:'تیکت های فرستاده شده' , description: '' , icon:FaTicketAlt , link: PAGES.ticket_own_sent},

    ]


    return (
        <section>
            <div className={'flex w-full justify-between mt-8'}>

                {/*<Link to="/editor">صفحه ی ویرایش</Link>*/}
                {/*<Link to="/admin">صفحه ویژه ادمین</Link>*/}
                {/*<Link to="/lounge">صفحه گپ الکی</Link>*/}
                {/*<Link to="/linkpage">صفحه ی لینک های مفید سایت</Link>*/}
            </div>


            <div className={'flex flex-wrap'}>

                {shortcuts.map((row,index)=>{


                    return <Link
                        to={row.link}
                                 key={index}
                                className="max-w-sm rounded overflow-hidden shadow-lg border-4"

                    >

                        <div className="px-6 py-4">

                            <div className="font-bold text-xl mb-2"> <row.icon />
                                {row?.title}


                            </div>
                            <p className="text-gray-700 text-base">
                                {row?.description}
                            </p>
                        </div>

                    </Link>
                })}

                {/*<div className="max-w-sm rounded overflow-hidden shadow-lg">*/}
                {/*    <div className="px-6 py-4">*/}
                {/*        <div className="font-bold text-xl mb-2">صفحه اصلی</div>*/}
                {/*        <p className="text-gray-700 text-base">*/}
                {/*            توضیحات*/}
                {/*        </p>*/}
                {/*    </div>*/}
                {/*</div>*/}



            </div>


        </section>
    )
}

export default Home
