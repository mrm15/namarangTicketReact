import useAuth from "../../../hooks/useAuth.tsx";
import useLogout from "../../../hooks/useLogout.tsx";
import {useNavigate} from "react-router-dom";
import {PAGES} from "../../../Pages/Route-string.tsx";


function HeaderMenu({setOpenMenu}) {


    const {auth} = useAuth();
    const name = auth?.userInfo?.userData?.name || "کاربر"
    const phoneNumber = auth?.userInfo?.userData?.phoneNumber || "کاربر"
    const roleName = auth?.userInfo?.userData?.roleName || ""
    const departmentName = auth?.userInfo?.userData?.departmentName || ""
    const userId = auth?.userInfo?.userData?.userId


    const logout = useLogout();
    const navigateTo = useNavigate()

    const editProfile = () => {
        if (!userId) {
            return
        }
        navigateTo(PAGES.USER_EDIT_HIS_INFO);
        setOpenMenu(false)

    }

    const signOut = async () => {

        const yes = confirm("آیا میخواهید از سایت خارج شوید؟")
        if (yes) {
            await logout();
            navigateTo(PAGES.LOGIN);
        }

    }

    return (
        <ul className={'absolute left-0 w-44 flex flex-col p-5 bg-white border border-black text-gray-950 rounded z-10'}>

            <li>
                <div> 👨🏿 {name} </div>
                <div> 📞 {phoneNumber} </div>
                <div> 🏬 {departmentName} </div>
                <div> 🎭 {roleName} </div>
            </li>
            <li
                onClick={editProfile}
                className={'cursor-pointer block  rounded px-4 hover:bg-blue-400 text-center btn-gay-mir'}>
                ویرایش پروفایل
            </li>
            <li
                onClick={signOut}
                className={'cursor-pointer block  rounded px-4 hover:bg-blue-400 text-center btn-gay-mir'}>
                خروج از سایت
            </li>
        </ul>
    );
}

export default HeaderMenu;