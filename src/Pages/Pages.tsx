import {Route, Routes} from "react-router-dom";

import Layout from "../Components/Layout";
import PersistLogin from "../Components/PersistLogin"
import RequireAuth from "../Components/RequireAuth"
import Home from "../Components/Home"
import Missing from "../Components/Missing"
import LoginSMS from "../Components/LoginSMS.tsx";

import {PAGES} from "./Route-string.tsx"

import Unauthorized from "../Components/Unauthorized/Unauthorized.tsx";
import AddUser from "../Components/User/AddUser.tsx";
import ListUsers from "../Components/User/ListUsers.tsx";
import {ROLES} from "./ROLES.tsx";
import AddRole from "../Components/Role/AddRole.tsx";
import ListRoles from "../Components/Role/ListRoles.tsx";
import AddDepartment from "../Components/Department/AddDepartment.tsx";
import ListDepartment from "../Components/Department/ListDepartment.tsx";
import AddStatus from "../Components/Status/AddStatus.tsx";
import ListStatus from "../Components/Status/ListStatus.tsx";
import AddFiles from "../Components/Files/AddFiles.tsx";
import ListFiles from "../Components/Files/ListFiles.tsx";
import TicketCreate from "../Components/Ticket/TicketCreate/TicketCreate.tsx";
import {TicketRead} from "../Components/Ticket/TicketRead/TicketRead.tsx";
import TicketChatList from "../Components/Ticket/TicketChatList/TicketChatList.tsx";
import AddSettings from "../Components/AdminSettings/AddSettings.tsx";
import SendSmsForm from "../SMS/SendSmsForm/SendSmsForm.tsx";
import SendSms from "../SendSms/SendSms.tsx";
import ShowSmsList from "../SMS/ShowSmsList/ShowSmsList.tsx";



const Pages = () => {


    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return (
        <>
            <Routes>
                {/* pages all people can see and no need to side bar */}
                {/*<Route path="register" element={<RegisterSMS/>}/>*/}
                <Route path={PAGES.LOGIN} element={<LoginSMS/>}/>
                <Route path={PAGES.SMS} element={<SendSms/>}/>



                {/* pages all people can see and need sidebar */}

                <Route element={<PersistLogin/>}>
                    <Route path="/" element={<Layout/>}>
                        {/* public routes */}


                        {/*<Route path="linkpage" element={<LinkPage/>}/>*/}
                        {/*<Route path="unauthorized" element={<Unauthorized/>}/>*/}
                        {/*<Route path="SellFactor" element={<SellFactor/>}/>*/}
                        {/*<Route path="ListProduct" element={<ListProduct/>}/>*/}

                        {/* pages loggedIn users can see and need sidebar */}

                        {/* we want to protect these routes */}

                        <Route path={'/'} element={<Home/>}/>
                        {/*<Route element={<RequireAuth allowedRoles={ROLES.addContactAccess}/>}>*/}
                        {/*    <Route path={'/'} element={<Home/>}/>*/}
                        {/*</Route>*/}


                        <Route element={<RequireAuth allowedRoles={ROLES.user}/>}>
                            <Route path={PAGES.USER_ADD_EDIT} element={<AddUser/>}/>
                            <Route path={PAGES.USER_LIST} element={<ListUsers/>}/>

                        </Route>

                        <Route element={<RequireAuth allowedRoles={ROLES.role}/>}>
                            <Route path={PAGES.ROLE_ADD_EDIT} element={<AddRole/>}/>
                            <Route path={PAGES.ROLE_LIST} element={<ListRoles/>}/>

                        </Route>

                        <Route element={<RequireAuth allowedRoles={ROLES.department}/>}>
                            <Route path={PAGES.DEPARTMENT_ADD_EDIT} element={<AddDepartment/>}/>
                            <Route path={PAGES.DEPARTMENT_LIST} element={<ListDepartment/>}/>
                        </Route>

                        <Route element={<RequireAuth allowedRoles={ROLES.status}/>}>
                            <Route path={PAGES.STATUS_ADD_EDIT} element={<AddStatus/>}/>
                            <Route path={PAGES.STATUS_LIST} element={<ListStatus/>}/>
                        </Route>

                        <Route element={<RequireAuth allowedRoles={ROLES.file}/>}>
                            <Route path={PAGES.FILE_ADD_EDIT} element={<AddFiles/>}/>
                            <Route path={PAGES.FILE_LIST} element={<ListFiles/>}/>
                        </Route>

                        {/* ticket create */}
                        <Route element={<RequireAuth allowedRoles={ROLES.ticketCreate}/>}>
                            <Route path={PAGES.ticket_Create} element={<TicketCreate/>}/>
                            {/* ticketReadOwn تیکت هایی که خودم فرستادم رو ببینم */}

                            <Route path={PAGES.ticket_own_sent} element={<TicketRead view={'readSentTickets'}  />}/>
                        </Route>


                        {/* ticket readAll for Admin */}
                        <Route element={<RequireAuth allowedRoles={ROLES.ticketReadAll}/>}>
                            <Route path={PAGES.ticket_Read_All} element={<TicketRead view={'read'} />} />
                        </Route>
                        {/* - که هم در پارتمان من هستند و هم من بهشون دسترسی دارم -   آخرین تیکت های دریافتی */}
                        <Route element={<RequireAuth allowedRoles={ROLES.ticketInput}/>}>
                            <Route path={PAGES.ticketInbox} element={<TicketRead view={'readMyInboxTickets'}  />}/>
                        </Route>

                        {/* -تمام تیکت هایی که من بهشون دسترسی دارم */}
                        <Route element={<RequireAuth allowedRoles={ROLES.ticketReadOwnReceived}/>}>
                            <Route path={PAGES.ticket_read_my_all_tickets} element={<TicketRead view={'readMyAllTickets'}  />}/>
                        </Route>
                        <Route element={<RequireAuth allowedRoles={ROLES.readDepartmentTickets}/>}>
                            <Route path={PAGES.ticket_read_department_tickets} element={<TicketRead view={'readDepartmentTickets'}  />}/>
                        </Route>





                        {/* TicketChatList */}
                        <Route element={<RequireAuth allowedRoles={ROLES.ticketRepliesCreate}/>}>
                            <Route path={PAGES.ticket_chat_list} element={<TicketChatList />}/>
                        </Route>

                        <Route element={<RequireAuth allowedRoles={ROLES.adminSettings}/>}>
                            <Route path={PAGES.admin_settings} element={<AddSettings />}/>
                        </Route>

                        <Route element={<RequireAuth allowedRoles={ROLES.smsArchive}/>}>
                            <Route path={PAGES.sms_archive} element={<ShowSmsList />}/>
                        </Route>
                        <Route element={<RequireAuth allowedRoles={ROLES.smsPending}/>}>
                            <Route path={PAGES.sms_pending} element={<AddSettings />}/>
                        </Route>
                        <Route element={<RequireAuth allowedRoles={ROLES.smsSend}/>}>
                            <Route path={PAGES.sms_send} element={<SendSmsForm />}/>
                        </Route>

                        {/*<Route element={<RequireAuth allowedRoles={[ROLES.role]}/>}>*/}
                        {/*    <Route path={PAGES.LIST_USER_PANEL} element={<ListUsers/>}/>*/}
                        {/*</Route>*/}

                        {/*<Route element={<RequireAuth allowedRoles={[ROLES.addUserAccess]}/>}>*/}
                        {/*    <Route path={PAGES.ADD_NEW_ROLE_TO_PANEL} element={<AddUser/>}/>*/}
                        {/*</Route>*/}
                        {/*<Route element={<RequireAuth allowedRoles={[ROLES.addUserAccess]}/>}>*/}
                        {/*    <Route path={PAGES.LIST_ROLE_PANEL} element={<ListUsers/>}/>*/}
                        {/*</Route>*/}


                        <Route path={'/unauthorized'} element={<Unauthorized/>}/>
                    </Route>

                    {/* catch all */}
                </Route>
                <Route path="*" element={<Missing/>}/>

                {/*<Route path="/" element={<Dashboard/>}>*/}
                {/*    <Route path="/" element={<MainDashboardPage/>}/>*/}
                {/* Namarang */}
                {/*<Route path="SellFactor" element={<SellFactor/>}/>*/}
                {/*<Route path="AddProduct" element={<AddProduct/>}/>*/}
                {/*<Route path="ListProduct" element={<ListProduct/>}/>*/}
                {/*</Route>*/}
            </Routes>
        </>
    );
};

export default Pages;