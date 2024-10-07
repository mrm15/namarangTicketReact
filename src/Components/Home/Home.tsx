import {Link, useNavigate} from "react-router-dom";
import {PAGES} from "../../Pages/Route-string.tsx";
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
import {randomNumberGenerator} from "../../utils/utilsFunction.tsx";
import {useQuery} from "@tanstack/react-query";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.tsx";
import {RiRefreshLine} from "react-icons/ri";
import LoadingSvg1 from "../../assets/Svg/LoadingSvg1.tsx";
import MyLineChart from "../Rechart/LineChart/MyLineChart.tsx";
import ShowSingleReport from "./ShowSingleReport.tsx";


const Home = () => {
    const getReports = "reports/dashboard";
    const myAxiosPrivate = useAxiosPrivate()
    const getReportsQueryFn = () => {
        return myAxiosPrivate.get(getReports)
    }
    const reportArrayQuery = useQuery({
        queryKey: ['getReports'],
        queryFn: getReportsQueryFn,
        staleTime: 86400000,  // === 60*60*24*1000
        enabled: true,
    })

    const shortcuts = [
        {title: 'افزودن کاربر', description: "افزودن کاربر جدید ", icon: FaUserPlus, link: PAGES.USER_ADD_EDIT},
        {title: 'مشاهده لیست کاربران نمارنگ', description: "لیست کاربران ", icon: FaUsers, link: PAGES.USER_LIST},

        {
            title: 'افزودن نقش',
            description: "افزودن نقش جدید به نقش های سایت  ",
            icon: FaUserTag,
            link: PAGES.ROLE_ADD_EDIT
        },
        {title: 'لیست نقش ها', description: "مشاهده لیست نقش ها", icon: FaClipboardList, link: PAGES.ROLE_LIST},

        {
            title: 'افزودن دپارتمان',
            description: "افزودن دپارتمان جدید به سایت  ",
            icon: FaBuilding,
            link: PAGES.DEPARTMENT_ADD_EDIT
        },
        {title: 'لیست دپارتمان ها', description: "مشاهده لیست دپارتمان ", icon: FaSitemap, link: PAGES.DEPARTMENT_LIST},

        {
            title: 'افزودن استاتوس تیکت',
            description: "افزودن استاتوس جدید به سایت  ",
            icon: FaLayerGroup,
            link: PAGES.STATUS_ADD_EDIT
        },
        {title: 'لیست استاتوس تیکت', description: "مشاهده لیست استاتوس ", icon: FaLayerGroup, link: PAGES.STATUS_LIST},
        // { title:'لیست نقش ها' , description:"مشاهده لیست نقش های تعریف شده و دسترسی ها ", icon:'blobb', link:PAGES.LIST_ROLE_PANEL},

        {
            title: 'افزودن فایل',
            description: "افزودن فایل جدید به بانک فایل ها  ",
            icon: FaFile,
            link: PAGES.FILE_ADD_EDIT
        },
        {title: 'لیست فایل ها', description: "مشاهده لیست فایل ها ", icon: FaFile, link: PAGES.FILE_LIST},


        {
            title: 'ثبت سفارش جدید',
            description: 'ایجاد سفارش جدید در نمارنگ',
            icon: FaTicketAlt,
            link: PAGES.ticket_Create
        },

        {title: 'مشاهده همه سفارشات ادمین', description: ' ', icon: FaTicketAlt, link: PAGES.ticket_Read_All},
        {title: 'صندوق ورودی', description: '', icon: FaTicketAlt, link: PAGES.ticketInbox},
        {title: 'تمام تیکت های من', description: '', icon: FaTicketAlt, link: PAGES.ticket_read_my_all_tickets},
        {title: 'تیکت های فرستاده شده', description: '', icon: FaTicketAlt, link: PAGES.ticket_own_sent},
        // {title: 'تیکت های دپارتمان', description: '', icon: FaTicketAlt, link: PAGES.ticket_read_department_tickets},
        // {title: 'تیکت های دپارتمان', description: '', icon: FaTicketAlt, link: PAGES.ticket_read_department_tickets},
        {title: 'تنظیمات مدیریتی', description: '', icon: FaTicketAlt, link: PAGES.admin_settings},

    ]

    const whichShow = ((randomNumberGenerator() * 10 - 500) > 0) ? 1 : 0
    const navigateTo = useNavigate()
    try {
        return (
            <section>
                {<div className={"flex flex-wrap w-full mt-2 min_height_45 overflow-hidden items-center justify-end"}>
                    {(reportArrayQuery.isLoading || reportArrayQuery.isFetching) ?
                        <div><LoadingSvg1/></div> :
                        <div>
                            <button onClick={() => reportArrayQuery.refetch()}><RiRefreshLine/></button>
                        </div>
                    }
                </div>}


                <div className={'flex w-full justify-between mt-8'}>
                    {/*<Link to="/editor">صفحه ی ویرایش</Link>*/}
                    {/*<Link to="/admin">صفحه ویژه ادمین</Link>*/}
                    {/*<Link to="/lounge">صفحه گپ الکی</Link>*/}
                    {/*<Link to="/linkpage">صفحه ی لینک های مفید سایت</Link>*/}
                </div>
                <div>
                    <button

                        className={"btn-white-border-mir"}
                        onClick={()=>{
                            navigateTo(PAGES.adminReport)
                        }}

                    >
                        مشاهده گزارش مدیریتی
                    </button>

                </div>

                <div className={'flex flex-wrap gap-4'}>

                    {/*{reportArrayQuery?.data?.data?.reportData?.map(rowData=><ShowSingleReport {...rowData} />)}*/}


                    {whichShow === 1 && <>
                        {shortcuts.map((row, index) => {
                            return <div
                                key={index}
                                className="max-w-sm rounded-2xl    border-2 border-dashed width__60_Percent min_height_45"
                                draggable={true}
                            >

                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2">
                                        <row.icon/>
                                        عنوان
                                    </div>
                                    <p className="text-gray-700 text-base">
                                        توضیحات
                                    </p>
                                </div>

                            </div>
                        })}
                    </>}

                    {whichShow === 0 && shortcuts.map((row, index) => {


                        return <Link
                            target={"_blank"}
                            to={row.link}
                            key={index}
                            className="max-w-sm rounded overflow-hidden shadow-lg border-4"

                        >

                            <div className="px-6 py-4">

                                <div className="font-bold text-xl mb-2">
                                    <row.icon/>
                                    {row?.title}


                                </div>
                                <p className="text-gray-700 text-base">
                                    {row?.description}
                                </p>
                            </div>

                        </Link>
                    })}
                </div>


            </section>
        )
    } catch (error) {
        return <>{error.toString()}</>
    }
}

export default Home
