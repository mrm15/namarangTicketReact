import EmptyHomePage from "./Homes/EmptyHomePage/EmptyHomePage.tsx";
import useAuth from "../../hooks/useAuth.tsx";
import {getMenus} from "../SideBar/menus.tsx";
import CustomerDashboard from "./Homes/CustomerDashboard/CustomerDashboard.tsx";
import OrganizationDashboard from "./Homes/OrganizationDashboard/OrganizationDashboard.tsx";
import DepartmentAdminDashboard from "./Homes/DepartmentAdminDashboard/DepartmentAdminDashboard.tsx";
import FullAdminDashboard from "./Homes/FullAdminDashboard/FullAdminDashboard.tsx";


const Home = () => {
    // اینجا با توجه به اینکه به این کاربر توی بخش دسترسی های صفحه ی اول چیو تعریف کردم میخوام بهش یه صفحه رو نشون بدم.

    const {auth} = useAuth()
    const roleAccessList = auth.userInfo?.roleAccessList;
    const isDepartmentAdmin = auth.userInfo?.isDepartmentAdmin;

    const customerDashboard = roleAccessList?.includes('customerDashboard');
    const myOrganizationDashboard = roleAccessList?.includes('organizationDashboard');
    const departmentAdminDashboard = roleAccessList?.includes('departmentAdminDashboard')
    const myFullAdminDashboard = roleAccessList?.includes('fullAdminDashboard')
    const hasDashboardAccess = customerDashboard || myOrganizationDashboard || departmentAdminDashboard || myFullAdminDashboard;

    try {
        return <>
            {customerDashboard && <CustomerDashboard/>}
            {myOrganizationDashboard && <OrganizationDashboard/>}
            {departmentAdminDashboard && <DepartmentAdminDashboard/>}
            {myFullAdminDashboard && <FullAdminDashboard/>}
            {!hasDashboardAccess && <EmptyHomePage/>}
        </>
    } catch (error) {
        return error?.toString()
    }


}

export default Home
