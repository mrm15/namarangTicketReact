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
                <Route path="login" element={<LoginSMS/>}/>


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
                            {/*<Route path="add-contact" element={<AddProduct/>}/>*/}

                        </Route>

                        <Route element={<RequireAuth allowedRoles={ROLES.role}/>}>
                            <Route path={PAGES.ROLE_ADD_EDIT} element={<AddRole/>}/>
                            <Route path={PAGES.ROLE_LIST} element={<ListRoles/>}/>
                            {/*<Route path="add-contact" element={<AddProduct/>}/>*/}

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