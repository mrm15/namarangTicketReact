import {Route, Routes} from "react-router-dom";
import Layout from "../Components/Layout";
import PersistLogin from "../Components/PersistLogin"
import RequireAuth from "../Components/RequireAuth"
import LoginSMS from "../Components/LoginSMS.tsx";
import {PAGES} from "./Route-string.tsx"
import Unauthorized from "../Components/Unauthorized/Unauthorized.tsx";
import {ROLES} from "./ROLES.tsx";
import {lazy, Suspense} from "react"
import Loader from "../Components/Loader";
import Skeleton from "../Components/Skeleton/Skeleton.tsx";
import useAuth from "../hooks/useAuth.tsx";

const ScreenShotBill = lazy(() => import('../Components/ScreenShotBill/ScreenShotBill.tsx'))
const PackSend = lazy(() => import("../Components/PackSend/PackSend.tsx"))

const AddUser = lazy(() => import('../Components/User/AddUser.tsx'));
const Home = lazy(() => import("../Components/Home/Home.tsx"));

const ListUsersG = lazy(() => import('../Components/User/ListUsersG.tsx'));
const AddRole = lazy(() => import('../Components/Role/AddRole.tsx'));
const ListRolesG = lazy(() => import('../Components/Role/ListRolesG.tsx'));
const AddDepartment = lazy(() => import('../Components/Department/AddDepartment.tsx'));
const ListDepartmentG = lazy(() => import('../Components/Department/ListDepartmentG.tsx'));
const AddStatus = lazy(() => import('../Components/Status/AddStatus.tsx'));
const ListStatus = lazy(() => import('../Components/Status/ListStatus.tsx'));
const AddFiles = lazy(() => import('../Components/Files/AddFiles.tsx'));
const ListFiles = lazy(() => import('../Components/Files/ListFiles.tsx'));
const TicketCreate = lazy(() => import('../Components/Ticket/TicketCreate/TicketCreate.tsx'));
const TicketRead = lazy(() => import('../Components/Ticket/TicketRead/TicketRead.tsx'));
const TicketChatList = lazy(() => import('../Components/Ticket/TicketChatList/TicketChatList.tsx'));
const AddSettings = lazy(() => import('../Components/AdminSettings/AddSettings.tsx'));
const ShowBill = lazy(() => import('../Components/Hesabfa/ShowBill/ShowBill.tsx'));
const SubmitBill = lazy(() => import('../Components/Hesabfa/SubmitBill/SubmitBill.tsx'));
const ReportBill = lazy(() => import('../ReportBill/ReportBill.tsx'));
const AdminReportCP = lazy(() => import('../Components/AdminReport/AdminReportCP.tsx'));
const HesabfaTest = lazy(() => import('../Components/Test/HesabfaTest.tsx'));
const Missing = lazy(() => import('../Components/Missing'));


const Pages = () => {


    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore

    const {auth} = useAuth()
    const isDepartmentAdmin = auth?.userInfo?.isDepartmentAdmin;

    return (
        <>
            <Routes>
                {/* pages all people can see and no need to side bar */}
                {/*<Route path="register" element={<RegisterSMS/>}/>*/}

                <Route path={PAGES.LOGIN} element={<LoginSMS/>}/>
                <Route path={`${PAGES.showBill}/`} element={
                    <Suspense fallback={<Loader/>}>
                        <ShowBill/>
                    </Suspense>
                }/>
                <Route path={`${PAGES.showBill}/:factorNumber`} element={
                    <Suspense fallback={<Loader/>}>
                        <ShowBill/>
                    </Suspense>
                }/>


                {/* pages all people can see and need sidebar */}

                <Route element={<PersistLogin/>}>
                    <Route path="/" element={<Layout/>}>
                        {/* public routes */}

                        <Route path={'/'} element={
                            <Suspense fallback={<Loader/>}>
                                <Home/>
                            </Suspense>
                        }/>

                        <Route element={<RequireAuth allowedRoles={ROLES.user}/>}>
                            <Route path={PAGES.USER_ADD_EDIT} element={
                                <Suspense fallback={<Loader/>}>
                                    <AddUser/>
                                </Suspense>
                            }/>
                            <Route path={PAGES.USER_LIST} element={
                                <Suspense fallback={<Loader/>}>
                                    <ListUsersG/>
                                </Suspense>
                            }/>
                        </Route>

                        <Route element={<RequireAuth allowedRoles={ROLES.role}/>}>
                            <Route path={PAGES.ROLE_ADD_EDIT} element={
                                <Suspense fallback={<Loader/>}>
                                    <AddRole/>
                                </Suspense>
                            }/>
                            <Route path={PAGES.ROLE_LIST} element={
                                <Suspense fallback={<Loader/>}>
                                    <ListRolesG/>
                                </Suspense>
                            }/>
                        </Route>

                        <Route element={<RequireAuth allowedRoles={ROLES.department}/>}>
                            <Route path={PAGES.DEPARTMENT_ADD_EDIT} element={
                                <Suspense fallback={<Loader/>}>
                                    <AddDepartment/>
                                </Suspense>
                            }/>
                            <Route path={PAGES.DEPARTMENT_LIST} element={
                                <Suspense fallback={<Loader/>}>
                                    <ListDepartmentG/>
                                </Suspense>
                            }/>
                        </Route>

                        <Route element={<RequireAuth allowedRoles={ROLES.status}/>}>
                            <Route path={PAGES.STATUS_ADD_EDIT} element={
                                <Suspense fallback={<Loader/>}>
                                    <AddStatus/>
                                </Suspense>
                            }/>
                            <Route path={PAGES.STATUS_LIST} element={
                                <Suspense fallback={<Loader/>}>
                                    <ListStatus/>
                                </Suspense>
                            }/>
                        </Route>

                        <Route element={<RequireAuth allowedRoles={ROLES.file}/>}>
                            <Route path={PAGES.FILE_ADD_EDIT} element={
                                <Suspense fallback={<Loader/>}>
                                    <AddFiles/>
                                </Suspense>
                            }/>
                            <Route path={PAGES.FILE_LIST} element={
                                <Suspense fallback={<Loader/>}>
                                    <ListFiles/>
                                </Suspense>
                            }/>
                        </Route>

                        {/* ticket create */}
                        <Route element={<RequireAuth allowedRoles={ROLES.ticketCreate}/>}>
                            <Route path={PAGES.ticket_Create} element={
                                <Suspense fallback={<Loader/>}>
                                    <TicketCreate/>
                                </Suspense>
                            }/>
                            <Route path={PAGES.ticket_created_by_me} element={
                                <Suspense fallback={<Loader/>}>
                                    <TicketRead view={'readSentTickets'}/>
                                </Suspense>
                            }/>
                        </Route>

                        {/* ticket readAll for Admin */}
                        <Route element={<RequireAuth allowedRoles={ROLES.readAllTicketsInSystem}/>}>
                            <Route path={PAGES.ticket_Read_All} element={
                                <Suspense fallback={<Loader/>}>
                                    <TicketRead view={'read'}/>
                                </Suspense>
                            }/>
                        </Route>

                        {/* -تمام تیکت هایی که من بهشون دسترسی دارم */}
                        {/*<Route element={<RequireAuth allowedRoles={ROLES.ticketReadOwnReceived}/>}>*/}
                        {/*    <Route path={PAGES.ticket_read_my_all_tickets} element={*/}
                        {/*        <Suspense fallback={<Loader/>}>*/}
                        {/*            <TicketRead view={'readMyAllTickets'}/>*/}
                        {/*        </Suspense>*/}
                        {/*    }/>*/}
                        {/*</Route>*/}


                        <Route
                            // element={<RequireAuth allowedRoles={ROLES.readDepartmentTickets}/>}
                        >
                            <Route path={PAGES.ticket_read_department_tickets} element={
                                <Suspense fallback={<Loader/>}>
                                    {isDepartmentAdmin ? <TicketRead view={'readDepartmentTickets'}/> : <> فقط مدیر
                                        دپارتمان میتواند این صفحه را مشاهده کند.</>}
                                </Suspense>
                            }/>
                        </Route>


                        {/* TicketChatList */}
                        <Route element={<RequireAuth allowedRoles={ROLES.ticketRepliesCreate}/>}>
                            <Route path={PAGES.ticket_chat_list} element={
                                <Suspense fallback={<Loader/>}>
                                    <TicketChatList/>
                                </Suspense>
                            }/>
                        </Route>

                        <Route element={<RequireAuth allowedRoles={ROLES.adminSettings}/>}>
                            <Route path={'hesabfaTest'} element={
                                <Suspense fallback={<Loader/>}>
                                    <HesabfaTest/>
                                </Suspense>
                            }/>
                            <Route path={PAGES.admin_settings} element={
                                <Suspense fallback={<Loader/>}>
                                    <AddSettings/>
                                </Suspense>
                            }/>
                        </Route>

                        <Route element={<RequireAuth
                            allowedRoles={[...ROLES.submitBillInSubmitOrderForm, ...ROLES.submitBillInChatList]}/>}>
                            <Route path={PAGES.submit_bill} element={
                                <Suspense fallback={<Loader/>}>
                                    <SubmitBill/>
                                </Suspense>
                            }/>
                        </Route>

                        <Route element={<RequireAuth allowedRoles={ROLES.showReportBillList}/>}>
                            <Route path={PAGES.reportBill} element={
                                <Suspense fallback={<Loader/>}>
                                    <ReportBill/>
                                </Suspense>
                            }/>
                        </Route>

                        <Route element={<RequireAuth allowedRoles={ROLES.adminReport}/>}>
                            <Route path={PAGES.adminReport} element={
                                <Suspense fallback={<Loader/>}>
                                    <AdminReportCP/>
                                </Suspense>
                            }/>
                        </Route>

                        <Route element={<RequireAuth
                            allowedRoles={[...ROLES.basted_bandi_ersal, ...ROLES.screenShotBills]}/>}>
                            <Route path={PAGES.basted_bandi_ersal} element={
                                <Suspense fallback={<>
                                    <Skeleton classes="text width-100"/>
                                    <Skeleton classes="text width-100"/>
                                    <Skeleton classes="text width-100"/>
                                    <Skeleton classes="text width-100"/>
                                    <Skeleton classes="text width-100"/>
                                    <Skeleton classes="text width-100"/>
                                    <Skeleton classes="text width-100"/>
                                    <Skeleton classes="text width-100"/>
                                    <Skeleton classes="text width-100"/>
                                    <Skeleton classes="text width-100"/>
                                </>}>
                                    <PackSend/>
                                </Suspense>
                            }/>
                        </Route>

                        <Route element={<RequireAuth allowedRoles={ROLES.screenShotBills}/>}>
                            <Route path={PAGES.screenshot} element={
                                <Suspense fallback={<Loader/>}>
                                    <ScreenShotBill/>
                                </Suspense>
                            }/>
                        </Route>

                        <Route path={'/unauthorized'} element={<Unauthorized/>}/>
                    </Route>

                    {/* catch all */}
                </Route>
                <Route path="*" element={
                    <Suspense fallback={<Loader/>}>
                        <Missing/>
                    </Suspense>
                }/>
            </Routes>
        </>
    );
};

export default Pages;