import {Link, useNavigate} from "react-router-dom";
import {PAGES} from "../../Pages/Route-string.tsx";
import {randomNumberGenerator} from "../../utils/utilsFunction.tsx";
import {useQuery} from "@tanstack/react-query";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.tsx";
import {RiRefreshLine} from "react-icons/ri";
import LoadingSvg1 from "../../assets/Svg/LoadingSvg1.tsx";
import MyLineChart from "../Rechart/LineChart/MyLineChart.tsx";
import ShowSingleReport from "./ShowSingleReport.tsx";
import {getMenus} from "../SideBar/menus.tsx";
import useAuth from "../../hooks/useAuth.tsx";


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

    const {auth} = useAuth()
    const roleAccessList = auth.userInfo?.roleAccessList;
    const isDepartmentAdmin = auth.userInfo?.isDepartmentAdmin;
    const shortcuts = getMenus({roleAccessList, isDepartmentAdmin})

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
                                    {row?.name}


                                </div>
                                <p className="text-gray-700 text-base">
                                    {row?.name}
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
