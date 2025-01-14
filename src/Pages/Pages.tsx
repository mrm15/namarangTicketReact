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
import AdvancedTicketCreate from "../Components/Ticket/advanedTicketCreate/AdvancedTicketCreate.tsx";
import PriceListPage from "../PriceListPage/PriceListPage.tsx";
import Tttttt from "../Components/Tttttt/Tttttt.tsx";
import PublicPages from "./PublicPages.tsx";
import LogTableList from "../Components/LogTableList/LogTableList.tsx";

const MyTicketList = lazy(() => import('../Components/MyTicketList/MyTicketList.tsx'))
const AccountingReports = lazy(() => import('../Components/AccountingReports/AccountingReports.tsx'))
const ScreenShotBill = lazy(() => import('../Components/ScreenShotBill/ScreenShotBill.tsx'))
const PackSend = lazy(() => import("../Components/PackSend/PackSend.tsx"))
const ShowMyBillListForCustomer = lazy(() => import("../Components/showMyBillListForCustomer/ShowMyBillListForCustomer.tsx"))

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
const TicketChatList2 = lazy(() => import('../Components/Ticket/TicketChatList2/TicketChatList2.tsx'));
const AddSettings = lazy(() => import('../Components/AdminSettings/AddSettings.tsx'));
const ShowBill = lazy(() => import('../Components/Hesabfa/ShowBill/ShowBill.tsx'));
const SubmitBill2 = lazy(() => import('../Components/Hesabfa/SubmitBill2/SubmitBill2.tsx'));
const ReportBill = lazy(() => import('../ReportBill/ReportBill.tsx'));
const AdminReportCP = lazy(() => import('../Components/AdminReport/AdminReportCP.tsx'));
const HesabfaTest = lazy(() => import('../Components/Test/HesabfaTest.tsx'));
const Missing = lazy(() => import('../Components/Missing'));
const Index = lazy(() => import("../Components/GetMoreActiveContacts/Index.tsx"))
const EditProfileInfo = lazy(() => import("../Components/User/EditProfileInfo/EditProfileInfo.tsx"))
const Bank = lazy(() => import("../Components/Bank/Bank.tsx"))


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
                {/* pages all people can see and no need to sidebar */}
                {/*<Route path="register" element={<RegisterSMS/>}/>*/}

                <Route path={PAGES.LOGIN} element={<LoginSMS/>} />
                <Route path={PAGES.PriceListPage} element={<PriceListPage/>} />
                <Route path="public/*" element={<PublicPages />} />



                {/* pages all people can see and need sidebar */}

                <Route element={<PersistLogin/>}>
                    <Route element={<RequireAuth allowedRoles={ROLES.ticketRepliesCreate}/>}>
                        <Route path={PAGES.ticket_chat_list} element={
                            <Suspense fallback={<Loader/>}>
                                <TicketChatList2/>
                            </Suspense>
                        }/>
                    </Route>

                    <Route path="/" element={<Layout/>}>
                        {/* TicketChatList */}

                        <Route path={`${PAGES.showBill}/:factorNumber`} element={
                            <Suspense fallback={<Loader/>}>
                                <ShowBill/>
                            </Suspense>
                        }/>
                        {/* public routes */}
                        <Route path={"/mali09384642159"} element={<AccountingReports/>}/>
                        <Route path={'/'} element={
                            <Suspense fallback={<Loader/>}>
                                <Home/>
                            </Suspense>
                        }/>
                        <Route path={'/getMoreActiveContacts'} element={
                            <Suspense fallback={<Loader/>}>
                                <Index/>
                            </Suspense>
                        }
                        />

                        <Route path={PAGES.USER_EDIT_HIS_INFO} element={
                            <Suspense fallback={<Loader/>}>
                                <EditProfileInfo/>
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
                        <Route element={<RequireAuth allowedRoles={ROLES.ticketCreateAdvanced}/>}>
                            <Route path={PAGES.ticket_Create_advanced} element={
                                <Suspense fallback={<Loader/>}>
                                    <AdvancedTicketCreate/>
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
                        {/* ticket my Ticket List */}
                        <Route element={<RequireAuth allowedRoles={ROLES.readAllOfTicketsAssignedToMe}/>}>
                            <Route path={PAGES.MyTicketList} element={
                                <Suspense fallback={<Loader/>}>
                                    <MyTicketList />
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
                        {/* ticket read outBox === i assined to others */}
                        <Route element={<RequireAuth allowedRoles={ROLES.ticket_read_assign_tickets_outbox}/>}>
                            <Route path={PAGES.ticket_read_assign_tickets_outbox} element={
                                <Suspense fallback={<Loader/>}>
                                    <TicketRead view={'readMyForwardedTickets'}/>
                                </Suspense>
                            }/>
                        </Route>
                        {/* ticket read outBox === i assined to others */}
                        <Route element={<RequireAuth allowedRoles={ROLES.ticket_read_assign_tickets_all}/>}>
                            <Route path={PAGES.ticket_read_assign_tickets_all} element={
                                <Suspense fallback={<Loader/>}>
                                    <TicketRead view={'readAllAssignments'}/>
                                </Suspense>
                            }/>
                        </Route>
                        {/* ticket read outBox === i assined to others */}
                        <Route element={<RequireAuth allowedRoles={ROLES.ticket_read_assign_tickets_inbox}/>}>
                            <Route path={PAGES.ticket_read_assign_tickets_inbox} element={
                                <Suspense fallback={<Loader/>}>
                                    <TicketRead view={'readForwardedToMeTickets'}/>
                                </Suspense>
                            }/>
                        </Route>



                        <Route element={<RequireAuth allowedRoles={ROLES.fatherAccess}/>}>
                            {/* لیست فاکتور  بده تا نام تحویل بده*/}
                            <Route path={`tttttt`} element={<Tttttt/>}/>
                            <Route path={PAGES.Logs} element={<LogTableList/>}/>

                            <Route path={PAGES.fatherAccess} element={
                                <Suspense fallback={<Loader/>}>
                                    <HesabfaTest/>
                                </Suspense>
                            }/>

                        </Route>
                        <Route element={<RequireAuth allowedRoles={ROLES.adminSettings}/>}>
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
                                    {/*<SubmitBill/>*/}
                                    <SubmitBill2/>
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
                        <Route element={<RequireAuth allowedRoles={ROLES.showMyBillListForCustomer}/>}>
                            <Route path={PAGES.showMyBillListForCustomer} element={
                                <Suspense fallback={<Loader/>}>
                                    <ShowMyBillListForCustomer/>
                                </Suspense>
                            }/>
                        </Route>

                        <Route element={<RequireAuth
                            allowedRoles={[...ROLES.showFactorListInMenu]}/>}>
                            <Route path={PAGES.showFactorListInMenu} element={
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

                        {/* Bank */}
                        <Route element={<RequireAuth allowedRoles={ROLES.myBankFirstUserId[0]}/>}>
                            <Route path={PAGES.myBank} element={
                                <Suspense fallback={<Loader/>}>
                                    <Bank/>
                                </Suspense>
                            }/>
                        </Route>
                        <Route element={<RequireAuth allowedRoles={ROLES.myBankDepartment[0]}/>}>
                            <Route path={PAGES.myBankDepartment} element={
                                <Suspense fallback={<Loader/>}>
                                    <Bank/>
                                </Suspense>
                            }/>
                        </Route>
                        <Route element={<RequireAuth allowedRoles={ROLES.allBanksFirstUserId[0]}/>}>
                            <Route path={PAGES.allBanks} element={
                                <Suspense fallback={<Loader/>}>
                                    <Bank/>
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