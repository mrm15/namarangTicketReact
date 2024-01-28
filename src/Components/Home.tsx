import { Link} from "react-router-dom";
import {PAGES} from "../Pages/Route-string.tsx";

const Home = () => {


    const shortcuts = [
        { title:'افزودن کاربر' , description:"افزودن کاربر جدید ", icon:'blobb', link:PAGES.USER_ADD_EDIT},
        { title:'مشاهده لیست کاربران نمارنگ' , description:"لیست کاربران ", icon:'blobb', link:PAGES.USER_LIST},
        // { title:'افزودن نقش' , description:"افزودن نقش جدید به نقش های سایت  ", icon:'blobb', link:PAGES.ADD_NEW_ROLE_TO_PANEL},
        // { title:'لیست نقش ها' , description:"مشاهده لیست نقش های تعریف شده و دسترسی ها ", icon:'blobb', link:PAGES.LIST_ROLE_PANEL},
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
                                className="max-w-sm rounded overflow-hidden shadow-lg"

                    >

                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{row?.title}</div>
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
